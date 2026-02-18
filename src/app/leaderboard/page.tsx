'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

interface Contestant {
  id: string
  name: string
  firstName?: string
  lastName?: string
  votes: number
  image?: string
  institution?: string
  campus?: string
  province?: string
  rank?: number
  trend?: 'up' | 'down' | 'same'
  previousRank?: number
}

export default function LeaderboardPage() {
  const [contestants, setContestants] = useState<Contestant[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'top30' | 'rising'>('all')
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [formattedTime, setFormattedTime] = useState<string>('')
  const [mounted, setMounted] = useState(false)

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch('/api/leaderboard')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      
      // Only use real data from the database
      setContestants(data.contestants || [])
      setLastUpdated(new Date())
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching leaderboard:', error)
      setContestants([])
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Initial fetch
    fetchLeaderboard()

    // Auto-refresh every 5 seconds for real-time updates
    const interval = setInterval(fetchLeaderboard, 5000)

    return () => clearInterval(interval)
  }, [])

  // Separate effect for client-side only rendering to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
    setFormattedTime(new Date().toLocaleTimeString())
    
    // Update time display every 5 seconds to match data refresh
    const timeInterval = setInterval(() => {
      setFormattedTime(new Date().toLocaleTimeString())
    }, 5000)
    
    return () => clearInterval(timeInterval)
  }, [])

  // Update formatted time whenever lastUpdated changes
  useEffect(() => {
    if (mounted) {
      setFormattedTime(lastUpdated.toLocaleTimeString())
    }
  }, [lastUpdated, mounted])

  // Update formatted time whenever lastUpdated changes
  useEffect(() => {
    if (mounted) {
      setFormattedTime(lastUpdated.toLocaleTimeString())
    }
  }, [lastUpdated, mounted])

  const getRankIcon = (rank: number) => {
    // Placeholder for custom icon - user can add their own
    return null
  }

  const getRankBadgeStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 text-black shadow-lg shadow-yellow-500/50'
      case 2:
        return 'bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 text-black shadow-lg shadow-gray-400/50'
      case 3:
        return 'bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 text-white shadow-lg shadow-amber-600/50'
      default:
        return 'bg-dark-bg-charcoal border-2 border-brand-yellow/30 text-brand-yellow'
    }
  }

  const getTrendIcon = (trend?: 'up' | 'down' | 'same', rankChange?: number) => {
    if (!trend || !rankChange) return null
    
    if (trend === 'up') {
      return (
        <div className="flex items-center gap-1 text-green-400 text-xs font-bold">
          <span>↑</span>
          <span>+{rankChange}</span>
        </div>
      )
    }
    if (trend === 'down') {
      return (
        <div className="flex items-center gap-1 text-red-400 text-xs font-bold">
          <span>↓</span>
          <span>-{rankChange}</span>
        </div>
      )
    }
    return <div className="text-gray-500 text-xs font-bold">—</div>
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10">
        <Navbar />
      </div>
      <div className="min-h-screen bg-black text-white pt-24 md:pt-32">
        
        {/* Hero Section */}
        <div className="border-b border-gray-200 pb-12 mb-12 relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-yellow-400" />
          
          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <Link 
              href="/dashboard"
              className="inline-flex items-center gap-2 text-black hover:text-yellow-400 transition-colors mb-6 group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              <span className="font-semibold">Back to Dashboard</span>
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <img src="/Icons/trophy.png" alt="Trophy" className="w-12 h-12 object-contain" />
                <h1 className="text-5xl md:text-6xl font-bold text-black">
                  Leaderboard
                </h1>
              </div>
              <p className="text-xl text-black">
                Real-time rankings of all contestants competing for the top spot
              </p>
            </motion.div>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
            >
              <div className="bg-white border border-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <img src="/Icons/contestant.png" alt="Contestants" className="w-5 h-5 object-contain" />
                  <span className="text-sm text-black">Total Contestants</span>
                </div>
                <p className="text-2xl font-bold text-black">{contestants.length}</p>
              </div>
              <div className="bg-white border border-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <img src="/Images/diagram.png" alt="Votes" className="w-5 h-5 object-contain" />
                  <span className="text-sm text-black">Total Votes</span>
                </div>
                <p className="text-2xl font-bold text-black">
                  {contestants.reduce((sum, c) => sum + c.votes, 0).toLocaleString()}
                </p>
              </div>
              <div className="bg-white border border-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <img src="/Icons/leader (1).png" alt="Leader" className="w-5 h-5 object-contain" />
                  <span className="text-sm text-black">Leader</span>
                </div>
                <p className="text-lg font-bold text-black truncate">{contestants[0]?.name || '—'}</p>
              </div>
              <div className="bg-white border border-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <img src="/Icons/vote.png" alt="Top Votes" className="w-5 h-5 object-contain" />
                  <span className="text-sm text-black">Top Votes</span>
                </div>
                <p className="text-2xl font-bold text-black">
                  {contestants[0]?.votes.toLocaleString() || '—'}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <main className="container mx-auto px-6 lg:px-12 pb-20">
          
          {/* Filter Tabs */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex gap-3">
              <button
                onClick={() => setFilter('all')}
                className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${
                  filter === 'all'
                    ? 'bg-brand-yellow text-black shadow-lg shadow-brand-yellow/50'
                    : 'bg-black border border-white/20 text-white hover:border-brand-yellow/50'
                }`}
              >
                All Contestants
              </button>
              <button
                onClick={() => setFilter('top30')}
                className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${
                  filter === 'top30'
                    ? 'bg-brand-yellow text-black shadow-lg shadow-brand-yellow/50'
                    : 'bg-black border border-white/20 text-white hover:border-brand-yellow/50'
                }`}
              >
                Top 30
              </button>
              <button
                onClick={() => setFilter('rising')}
                className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${
                  filter === 'rising'
                    ? 'bg-brand-yellow text-black shadow-lg shadow-brand-yellow/50'
                    : 'bg-black border border-white/20 text-white hover:border-brand-yellow/50'
                }`}
              >
                Rising Stars
              </button>
            </div>
            
            {/* Last Updated Indicator */}
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>
                {mounted ? `Last updated: ${formattedTime}` : 'Last updated: Loading...'}
              </span>
            </div>
          </div>

          {/* Leaderboard Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-yellow-400 border border-white/10 rounded-xl overflow-hidden"
          >
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-yellow" />
              </div>
            ) : contestants.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 px-6">
                <div className="w-20 h-20 rounded-full bg-brand-yellow/10 flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">No Rankings Yet</h3>
                <p className="text-gray-400 text-center mb-6 max-w-md">
                  The competition hasn't started yet. Be the first to vote when contestants are added!
                </p>
                <Link
                  href="/contestants"
                  className="px-6 py-3 bg-gradient-to-r from-brand-yellow to-yellow-600 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-brand-yellow/50 transition-all duration-200"
                >
                  View Contestants
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {contestants
                  .filter(c => {
                    if (filter === 'top30') return contestants.indexOf(c) < 30
                    if (filter === 'rising') return c.trend === 'up'
                    return true
                  })
                  .slice(0, filter === 'all' ? 30 : undefined)
                  .map((contestant, index) => {
                    const rank = contestants.indexOf(contestant) + 1
                    const rankChange = contestant.previousRank ? Math.abs(contestant.previousRank - rank) : 0

                    return (
                      <motion.div
                        key={contestant.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.4 }}
                        className={`px-6 py-5 flex items-center gap-6 hover:bg-white/5 transition-all duration-200 group ${
                          rank <= 3 ? 'bg-gradient-to-r from-brand-yellow/5 to-transparent' : ''
                        }`}
                      >
                        {/* Rank Badge */}
                        <div className="flex-shrink-0 relative">
                          <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg ${getRankBadgeStyle(rank)}`}>
                            {rank === 1 ? '🏆' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : rank}
                          </div>
                        </div>

                        {/* Avatar */}
                        <div className="flex-shrink-0">
                          {contestant.image ? (
                            <img
                              src={contestant.image}
                              alt={contestant.name}
                              className="w-12 h-12 rounded-full object-cover border-2 border-brand-yellow/50"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-yellow/30 to-yellow-600/30 flex items-center justify-center border-2 border-brand-yellow/50">
                              <span className="text-brand-yellow font-bold text-sm">
                                {contestant.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Contestant Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-lg font-bold text-white truncate">{contestant.name}</h3>
                            {rank <= 3 && (
                              <span className="px-2 py-0.5 bg-brand-yellow/20 text-brand-yellow text-xs font-bold rounded-full whitespace-nowrap">
                                TOP {rank}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-400">Contestant</p>
                        </div>

                        {/* Trend Indicator */}
                        <div className="flex-shrink-0 hidden md:block">
                          {getTrendIcon(contestant.trend, rankChange)}
                        </div>

                        {/* Votes */}
                        <div className="text-right flex-shrink-0">
                          <p className="text-2xl font-bold text-brand-yellow">
                            {contestant.votes.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500 font-semibold">votes</p>
                        </div>

                        {/* Vote Button */}
                        <Link
                          href={`/vote?contestant=${contestant.id}`}
                          className="flex-shrink-0 px-5 py-2.5 bg-gradient-to-r from-brand-yellow to-yellow-600 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-brand-yellow/50 transition-all duration-200 opacity-0 group-hover:opacity-100"
                        >
                          Vote
                        </Link>
                      </motion.div>
                    )
                  })}
              </div>
            )}
          </motion.div>

          {/* View full list link */}
          {contestants.length > 30 && (
            <div className="mt-6 text-center">
              <Link
                href="/leaderboard/full"
                className="inline-flex items-center gap-2 text-brand-yellow font-black text-sm uppercase tracking-widest hover:text-yellow-500 transition-colors"
              >
                View Full Rankings (Top {Math.min(contestants.length, 200)})
                <span>→</span>
              </Link>
            </div>
          )}
          {contestants.length > 0 && contestants.length <= 30 && (
            <p className="mt-6 text-center text-white/30 text-xs">Showing all {contestants.length} contestants. Full rankings available once recruitment opens.</p>
          )}
        </main>
      </div>
      <Footer />
    </>
  )
}
