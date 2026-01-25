import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { cacheGet, cacheSet, CACHE_KEYS, CACHE_TTL } from '@/lib/redis';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const cacheKey = CACHE_KEYS.QUIZ('daily');
    
    // Try to get from cache
    const cached = await cacheGet(cacheKey);
    if (cached) {
      return NextResponse.json(cached);
    }

    // Get today's quiz
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const { data: quizzes, error } = await supabase
      .from('Quiz')
      .select('id, title, description, difficulty, timeLimit, scheduledFor, expiresAt')
      .eq('isActive', true)
      .gte('scheduledFor', today.toISOString())
      .lt('scheduledFor', tomorrow.toISOString())
      .limit(1);

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch quiz' }, { status: 500 });
    }

    const quiz = quizzes?.[0];

    if (!quiz) {
      return NextResponse.json(
        { error: 'No quiz available for today' },
        { status: 404 }
      );
    }

    // Check if user has already attempted this quiz
    const { data: attempt, error: attemptError } = await supabase
      .from('QuizAttempt')
      .select('id, score')
      .eq('userId', session.user.id)
      .eq('quizId', quiz.id)
      .maybeSingle();

    if (attemptError && attemptError.code !== 'PGRST116') {
      return NextResponse.json({ error: 'Failed to check attempts' }, { status: 500 });
    }

    if (attempt) {
      return NextResponse.json(
        { 
          error: 'You have already completed today\'s quiz',
          attempt,
        },
        { status: 400 }
      );
    }

    // Fetch questions
    const { data: questions, error: questionsError } = await supabase
      .from('QuizQuestion')
      .select('id, question, options, points, order')
      .eq('quizId', quiz.id)
      .order('order', { ascending: true });

    if (questionsError) {
      return NextResponse.json({ error: 'Failed to fetch quiz questions' }, { status: 500 });
    }

    const quizPayload = { ...quiz, questions: questions ?? [] };

    // Cache the result
    await cacheSet(cacheKey, quizPayload, CACHE_TTL.MEDIUM);

    return NextResponse.json(quizPayload);
  } catch (error) {
    console.error('Error fetching quiz:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quiz' },
      { status: 500 }
    );
  }
}
