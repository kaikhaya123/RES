'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Trophy, Users, Activity, TrendingUp, ArrowRight } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import RoleGuard from '@/components/auth/RoleGuard'

interface Stats {
  votesCast: number
  totalContestants: number
  totalUsers: number
  leaderboard: { id: string; name: string; votes: number }[]
}

function DashboardContent() {
  const [data, setData] = useState<Stats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('/api/dashboard/stats')
      .then(res => res.json())
      .then(setData)
      .catch(() => {})
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white pt-24 md:pt-32">
        
        {/* Header Section */}
        <div className="border-b border-white/10 pb-12 mb-12">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-3 text-white">
                Your Dashboard
              </h1>
              <p className="text-lg text-gray-300">
                Track your activity, votes, and platform performance in real-time
              </p>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <main className="container mx-auto px-6 lg:px-12 pb-20">

          {/* Stats Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { 
                icon: TrendingUp, 
                label: 'Total Votes', 
                value: data?.votesCast?.toLocaleString() || '—',
                color: 'from-brand-yellow to-yellow-600'
              },
              { 
                icon: Trophy, 
                label: 'Top Rank', 
                value: data?.leaderboard?.[0]?.name || '—',
                color: 'from-yellow-400 to-yellow-500'
              },
              { 
                icon: Users, 
                label: 'Total Users', 
                value: data?.totalUsers?.toLocaleString() || '—',
                color: 'from-yellow-300 to-yellow-600'
              },
              { 
                icon: Trophy, 
                label: 'Contestants', 
                value: data?.totalContestants?.toLocaleString() || '—',
                color: 'from-yellow-300 to-yellow-500'
              },
            ].map((stat, i) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-yellow/20 to-yellow-600/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-dark-bg-matte border border-white/10 rounded-xl p-6 hover:border-brand-yellow/30 transition-colors duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} text-black`}>
                        <Icon size={20} className="font-bold" />
                      </div>
                      <span className="text-xs font-semibold text-gray-500 uppercase">Active</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                    <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                  </div>
                </motion.div>
              )
            })}
          </section>

          {/* Main Grid - Leaderboard & Activity */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">

            {/* Leaderboard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="lg:col-span-2 border border-white/10 rounded-xl bg-dark-bg-matte overflow-hidden hover:border-brand-yellow/30 transition-colors duration-300"
            >
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Trophy size={20} className="text-brand-yellow" />
                    Leaderboard
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">Top performing contestants</p>
                </div>
              </div>

              <div className="divide-y divide-white/5">
                {data?.leaderboard?.length ? (
                  data.leaderboard.map((user, i) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
                      className="px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors duration-200 group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-yellow to-yellow-600 text-black flex items-center justify-center font-bold text-sm">
                          {i + 1}
                        </div>
                        <div>
                          <p className="font-medium text-white">{user.name}</p>
                          <p className="text-xs text-gray-500">Contestant</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-brand-yellow text-lg">{user.votes.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">votes</p>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="px-6 py-12 text-center text-gray-500">
                    <Activity size={40} className="mx-auto mb-3 opacity-50" />
                    <p>No leaderboard data available</p>
                  </div>
                )}
              </div>

              <Link 
                href="/leaderboard"
                className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-white/5 text-brand-yellow hover:bg-white/10 transition-colors duration-200 border-t border-white/10 font-medium"
              >
                View Full Leaderboard
                <ArrowRight size={16} />
              </Link>
            </motion.div>

            {/* Quick Stats & Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="space-y-6"
            >
              {/* Activity Summary */}
              <div className="border border-white/10 rounded-xl bg-dark-bg-matte p-6 hover:border-honey-tan/30 transition-colors duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <Activity size={20} className="text-brand-yellow" />
                  <h3 className="text-lg font-bold text-white">Activity</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-honey-tan mt-1.5 flex-shrink-0" />
                    <p className="text-gray-300">Platform active with <span className="text-brand-yellow font-semibold">{data?.totalUsers?.toLocaleString() || '0'}</span> users</p>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-brand-yellow mt-1.5 flex-shrink-0" />
                    <p className="text-gray-300"><span className="text-brand-yellow font-semibold">{data?.totalContestants?.toLocaleString() || '0'}</span> contestants competing</p>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-brand-yellow mt-1.5 flex-shrink-0" />
                    <p className="text-gray-300"><span className="text-brand-yellow font-semibold">{data?.votesCast?.toLocaleString() || '0'}</span> votes cast</p>
                  </li>
                </ul>
              </div>

              {/* Quick Actions */}
              <div className="border border-white/10 rounded-xl bg-dark-bg-matte p-6 hover:border-honey-tan/30 transition-colors duration-300">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <TrendingUp size={20} className="text-honey-tan" />
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Link
                    href="/vote"
                    className="flex items-center justify-between px-4 py-3 rounded-lg border border-brand-yellow/30 bg-brand-yellow/10 hover:bg-brand-yellow/20 transition-colors duration-200 group"
                  >
                    <span className="font-medium text-white">Vote Now</span>
                    <ArrowRight size={16} className="text-brand-yellow group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/leaderboard"
                    className="flex items-center justify-between px-4 py-3 rounded-lg border border-white/20 hover:border-brand-yellow/30 hover:bg-white/5 transition-colors duration-200 group"
                  >
                    <span className="font-medium text-white">View Leaderboard</span>
                    <ArrowRight size={16} className="text-gray-400 group-hover:text-brand-yellow group-hover:translate-x-1 transition-all" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Featured Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="border border-white/10 rounded-xl bg-dark-bg-matte p-8 hover:border-brand-yellow/30 transition-colors duration-300"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white mb-3">Stay Updated</h2>
                <p className="text-gray-400 mb-6 text-lg">
                  Follow the latest challenges, vote on your favorite contestants, and be part of the movement. Check out the live updates and leaderboard to see who's leading.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/challenges"
                    className="px-6 py-3 bg-gradient-to-r from-brand-yellow to-yellow-600 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-brand-yellow/50 transition-all duration-200"
                  >
                    View Challenges
                  </Link>
                  <Link
                    href="/vote"
                    className="px-6 py-3 border font-bold rounded-lg hover:bg-brand-yellow/10 transition-colors duration-200"
                  >
                    Start Voting
                  </Link>
                </div>
              </div>
              <div className="flex-1 relative h-64 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow/20 to-transparent" />
                <Image
                  src="/Images/5452980.jpg"
                  alt="Dashboard illustration"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.section>

        </main>
      </div>
      <Footer />
    </>
  )
}

export default function DashboardPage() {
  return (
    <RoleGuard 
      requiredRoles={['STUDENT', 'PUBLIC']}
      redirectTo="/auth/login"
      fallback={
        <>
          <Navbar />
          <div className="min-h-screen flex items-center justify-center pt-24">
            <div className="text-center px-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
              <p className="text-gray-600 mb-6">You must be logged in to access the dashboard</p>
              <Link href="/auth/login" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
                Go to Login
              </Link>
            </div>
          </div>
          <Footer />
        </>
      }
    >
      <DashboardContent />
    </RoleGuard>
  )
}
