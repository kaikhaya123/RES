import { NextRequest, NextResponse } from 'next/server';
import { cacheGet, cacheSet, CACHE_KEYS, CACHE_TTL } from '@/lib/redis';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '100'); // Default to top 100
    const round = parseInt(searchParams.get('round') || '1'); // Current voting round
    
    const cacheKey = `${CACHE_KEYS.LEADERBOARD(round)}:${limit}`;
    
    // Try to get from cache (short TTL for leaderboard)
    const cached = await cacheGet(cacheKey);
    if (cached) {
      return NextResponse.json(cached);
    }

    // Fetch all active contestants
    const { data: contestants, error: contestantsError } = await supabase
      .from('Contestant')
      .select('id, firstName, lastName, bio, institution, campus, province, photoUrl')
      .eq('isActive', true)
      .eq('isEliminated', false);

    if (contestantsError) {
      console.error('Error fetching contestants:', contestantsError);
      return NextResponse.json(
        { error: 'Failed to fetch contestants' },
        { status: 500 }
      );
    }

    if (!contestants || contestants.length === 0) {
      return NextResponse.json({
        contestants: [],
        totalContestants: 0,
        totalVotes: 0,
      });
    }

    // Fetch vote totals per contestant using aggregation
    const contestantIds = contestants.map((c) => c.id);
    
    const { data: votes, error: votesError } = await supabase
      .from('Vote')
      .select('contestantId, voteCount')
      .in('contestantId', contestantIds);

    if (votesError) {
      console.error('Error fetching votes:', votesError);
      return NextResponse.json(
        { error: 'Failed to fetch votes' },
        { status: 500 }
      );
    }

    // Aggregate votes by contestant
    const voteTotals: Record<string, number> = {};
    (votes || []).forEach((vote) => {
      voteTotals[vote.contestantId] = (voteTotals[vote.contestantId] || 0) + (vote.voteCount || 0);
    });

    // Create leaderboard with vote counts
    const leaderboard = contestants.map((contestant) => ({
      id: contestant.id,
      name: `${contestant.firstName} ${contestant.lastName}`,
      firstName: contestant.firstName,
      lastName: contestant.lastName,
      votes: voteTotals[contestant.id] || 0,
      institution: contestant.institution,
      campus: contestant.campus,
      province: contestant.province,
      image: contestant.photoUrl,
      bio: contestant.bio,
    }));

    // Sort by votes descending
    leaderboard.sort((a, b) => b.votes - a.votes);

    // Add rank and trend information
    const rankedLeaderboard = leaderboard.slice(0, limit).map((contestant, index) => ({
      ...contestant,
      rank: index + 1,
      // You could add previousRank by comparing with a cached previous state
      trend: 'same' as const, // Can be enhanced with historical data
    }));

    const totalVotes = Object.values(voteTotals).reduce((sum, votes) => sum + votes, 0);

    const response = {
      contestants: rankedLeaderboard,
      totalContestants: contestants.length,
      totalVotes,
      lastUpdated: new Date().toISOString(),
    };

    // Cache with short TTL (30 seconds) for real-time feel
    await cacheSet(cacheKey, response, 30);

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in leaderboard API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard' },
      { status: 500 }
    );
  }
}
