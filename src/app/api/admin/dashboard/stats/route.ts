import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { supabase } from '@/lib/supabase';
import { cacheGet, cacheSet, CACHE_TTL } from '@/lib/redis';

export async function GET(req: NextRequest) {
  const admin = requireAdmin(req);
  if (admin instanceof NextResponse) return admin;

  try {
    const cacheKey = 'admin:dashboard:stats';
    
    // Try cache first
    const cached = await cacheGet(cacheKey);
    if (cached) {
      return NextResponse.json(cached);
    }

    // Get user statistics
    const { data: userStats, error: userStatsError } = await supabase
      .from('User')
      .select('userType')
      .then(({ data, error }) => {
        if (error) return { data: null, error };
        
        const stats = {
          total: data.length,
          students: data.filter(u => u.userType === 'STUDENT').length,
          public: data.filter(u => u.userType === 'PUBLIC').length,
          admins: data.filter(u => u.userType === 'ADMIN').length,
        };
        
        return { data: stats, error: null };
      });

    if (userStatsError) {
      console.error('Error fetching user stats:', userStatsError);
    }

    // Get contestant statistics
    const { data: contestantStats, error: contestantStatsError } = await supabase
      .from('Contestant')
      .select('isActive, isEliminated')
      .then(({ data, error }) => {
        if (error) return { data: null, error };
        
        const stats = {
          total: data.length,
          active: data.filter(c => c.isActive && !c.isEliminated).length,
          eliminated: data.filter(c => c.isEliminated).length,
          inactive: data.filter(c => !c.isActive).length,
        };
        
        return { data: stats, error: null };
      });

    if (contestantStatsError) {
      console.error('Error fetching contestant stats:', contestantStatsError);
    }

    // Get voting statistics
    const { data: votingStats, error: votingStatsError } = await supabase
      .from('Vote')
      .select('voteCount, isPaid, createdAt')
      .then(({ data, error }) => {
        if (error) return { data: null, error };
        
        const totalVotes = data.reduce((sum, v) => sum + v.voteCount, 0);
        const paidVotes = data.filter(v => v.isPaid).reduce((sum, v) => sum + v.voteCount, 0);
        const freeVotes = totalVotes - paidVotes;
        
        // Today's votes  
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayVotes = data
          .filter(v => new Date(v.createdAt) >= today)
          .reduce((sum, v) => sum + v.voteCount, 0);
        
        const stats = {
          total: totalVotes,
          paid: paidVotes,
          free: freeVotes,
          today: todayVotes,
        };
        
        return { data: stats, error: null };
      });

    if (votingStatsError) {
      console.error('Error fetching voting stats:', votingStatsError);
    }

    // Get quiz statistics
    const { data: quizStats, error: quizStatsError } = await supabase
      .from('Quiz')
      .select('id, isActive')
      .then(({ data, error }) => {
        if (error) return { data: null, error };
        
        const stats = {
          total: data.length,
          active: data.filter(q => q.isActive).length,
          inactive: data.filter(q => !q.isActive).length,
        };
        
        return { data: stats, error: null };
      });

    if (quizStatsError) {
      console.error('Error fetching quiz stats:', quizStatsError);
    }

    const dashboardStats = {
      users: userStats || { total: 0, students: 0, public: 0, admins: 0 },
      contestants: contestantStats || { total: 0, active: 0, eliminated: 0, inactive: 0 },
      votes: votingStats || { total: 0, paid: 0, free: 0, today: 0 },
      quizzes: quizStats || { total: 0, active: 0, inactive: 0 },
      lastUpdated: new Date().toISOString(),
    };

    // Cache for 5 minutes
    await cacheSet(cacheKey, dashboardStats, CACHE_TTL.SHORT);

    return NextResponse.json(dashboardStats);
  } catch (error) {
    console.error('Admin dashboard stats error:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard stats' }, { status: 500 });
  }
}