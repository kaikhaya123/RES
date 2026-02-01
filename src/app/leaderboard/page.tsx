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
  const [filter, setFilter] = useState<'all' | 'top10' | 'rising'>('all')
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch('/api/leaderboard')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
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

    // Auto-refresh every 30 seconds for real-time updates
    const interval = setInterval(fetchLeaderboard, 30000)

    return () => clearInterval(interval)
  }, [])

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
        return 'bg-dark-bg-charcoal border-2 border-honey-tan/30 text-honey-tan'
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
      <Navbar />
      <div className="min-h-screen bg-black text-white pt-24 md:pt-32">
        
        {/* Hero Section */}
        <div className="border-b border-white/10 pb-12 mb-12 relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-honey-tan/5 to-transparent" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-honey-tan/10 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <Link 
              href="/dashboard"
              className="inline-flex items-center gap-2 text-honey-tan hover:text-honey-tan-400 transition-colors mb-6 group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              <span className="font-semibold">Back to Dashboard</span>
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <img src="/icons/trophy.png" alt="Trophy" className="w-12 h-12 object-contain" />
                <h1 className="text-5xl md:text-6xl font-bold text-white">
                  Leaderboard
                </h1>
              </div>
              <p className="text-xl text-gray-400">
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
              <div className="bg-dark-bg-matte border border-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <img src="/icons/people.png" alt="Contestants" className="w-5 h-5 object-contain" />
                  <span className="text-sm text-gray-400">Total Contestants</span>
                </div>
                <p className="text-2xl font-bold text-white">{contestants.length}</p>
              </div>
              <div className="bg-dark-bg-matte border border-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <img src="/icons/chart.png" alt="Votes" className="w-5 h-5 object-contain" />
                  <span className="text-sm text-gray-400">Total Votes</span>
                </div>
                <p className="text-2xl font-bold text-white">
                  {contestants.reduce((sum, c) => sum + c.votes, 0).toLocaleString()}
                </p>
              </div>
              <div className="bg-dark-bg-matte border border-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <img src="/icons/crown.png" alt="Leader" className="w-5 h-5 object-contain" />
                  <span className="text-sm text-gray-400">Leader</span>
                </div>
                <p className="text-lg font-bold text-white truncate">{contestants[0]?.name || '—'}</p>
              </div>
              <div className="bg-dark-bg-matte border border-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <img src="/icons/sparkles.png" alt="Top Votes" className="w-5 h-5 object-contain" />
                  <span className="text-sm text-gray-400">Top Votes</span>
                </div>
                <p className="text-2xl font-bold text-white">
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
                    ? 'bg-honey-tan text-black shadow-lg shadow-honey-tan/50'
                    : 'bg-dark-bg-matte border border-white/20 text-gray-300 hover:border-honey-tan/50'
                }`}
              >
                All Contestants
              </button>
              <button
                onClick={() => setFilter('top10')}
                className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${
                  filter === 'top10'
                    ? 'bg-honey-tan text-black shadow-lg shadow-honey-tan/50'
                    : 'bg-dark-bg-matte border border-white/20 text-gray-300 hover:border-honey-tan/50'
                }`}
              >
                Top 10
              </button>
              <button
                onClick={() => setFilter('rising')}
                className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${
                  filter === 'rising'
                    ? 'bg-honey-tan text-black shadow-lg shadow-honey-tan/50'
                    : 'bg-dark-bg-matte border border-white/20 text-gray-300 hover:border-honey-tan/50'
                }`}
              >
                Rising Stars
              </button>
            </div>
            
            {/* Last Updated Indicator */}
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            </div>
          </div>

          {/* Leaderboard Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-dark-bg-matte border border-white/10 rounded-xl overflow-hidden"
          >
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-honey-tan" />
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {contestants
                  .filter(c => {
                    if (filter === 'top10') return contestants.indexOf(c) < 10
                    if (filter === 'rising') return c.trend === 'up'
                    return true
                  })
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
                          rank <= 3 ? 'bg-gradient-to-r from-honey-tan/5 to-transparent' : ''
                        }`}
                      >
                        {/* Rank Badge */}
                        <div className="flex-shrink-0 relative">
                          <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg ${getRankBadgeStyle(rank)}`}>
                            {rank <= 3 ? getRankIcon(rank) : rank}
                          </div>
                          {rank <= 3 && (
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-honey-tan rounded-full flex items-center justify-center">
                              <img src="/icons/star.png" alt="Top Rank" className="w-4 h-4 object-contain" />
                            </div>
                          )}
                        </div>

                        {/* Avatar */}
                        <div className="flex-shrink-0">
                          {contestant.image ? (
                            <img
                              src={contestant.image}
                              alt={contestant.name}
                              className="w-12 h-12 rounded-full object-cover border-2 border-honey-tan/50"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-honey-tan/30 to-honey-tan-600/30 flex items-center justify-center border-2 border-honey-tan/50">
                              <span className="text-honey-tan font-bold text-sm">
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
                              <span className="px-2 py-0.5 bg-honey-tan/20 text-honey-tan text-xs font-bold rounded">
                                TOP {rank}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-400">Contestant #{contestant.id}</p>
                        </div>

                        {/* Trend Indicator */}
                        <div className="flex-shrink-0 hidden md:block">
                          {getTrendIcon(contestant.trend, rankChange)}
                        </div>

                        {/* Votes */}
                        <div className="text-right flex-shrink-0">
                          <p className="text-2xl font-bold text-honey-tan">
                            {contestant.votes.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500 font-semibold">votes</p>
                        </div>

                        {/* Vote Button */}
                        <Link
                          href={`/vote?contestant=${contestant.id}`}
                          className="flex-shrink-0 px-5 py-2.5 bg-gradient-to-r from-honey-tan to-honey-tan-600 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-honey-tan/50 transition-all duration-200 opacity-0 group-hover:opacity-100"
                        >
                          Vote
                        </Link>
                      </motion.div>
                    )
                  })}
              </div>
            )}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-16 bg-gradient-to-r from-honey-tan/10 via-honey-tan-600/10 to-honey-tan/10 border border-honey-tan/30 rounded-xl p-8 text-center"
          >
            <img src="/icons/trophy-large.png" alt="Trophy" className="w-16 h-16 mx-auto mb-4 object-contain" />
            <h2 className="text-3xl font-bold text-white mb-3">Support Your Favorite Contestant</h2>
            <p className="text-gray-400 mb-6 text-lg max-w-2xl mx-auto">
              Every vote counts! Help your favorite contestant climb the leaderboard and win the competition.
            </p>
            <Link
              href="/vote"
              className="inline-block px-8 py-4 bg-gradient-to-r from-honey-tan to-honey-tan-600 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-honey-tan/50 transition-all duration-200 text-lg"
            >
              Cast Your Vote Now
            </Link>
          </motion.div>

        </main>
      </div>
      <Footer />
    </>
  )
}
