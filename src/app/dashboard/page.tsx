'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Trophy, Users, Activity, TrendingUp, ArrowRight, MoreVertical, Zap, Target, Award, BarChart3, PieChart as PieChartIcon } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip as RechartsTooltip } from 'recharts'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import RoleGuard from '@/components/auth/RoleGuard'

interface Stats {
  votesCast: number
  totalContestants: number
  totalUsers: number
  leaderboard: { id: string; name: string; votes: number }[]
}

// Mock data for charts
const votesTrendData = [
  { month: 'Jan', votes: 4000, participants: 240 },
  { month: 'Feb', votes: 3000, participants: 221 },
  { month: 'Mar', votes: 2000, participants: 229 },
  { month: 'Apr', votes: 2780, participants: 200 },
  { month: 'May', votes: 1890, participants: 229 },
  { month: 'Jun', votes: 2390, participants: 200 },
]

const weeklyActivityData = [
  { day: 'Mon', users: 240, votes: 45 },
  { day: 'Tue', users: 130, votes: 32 },
  { day: 'Wed', votes: 980, users: 67 },
  { day: 'Thu', votes: 390, users: 54 },
  { day: 'Fri', votes: 480, users: 78 },
  { day: 'Sat', votes: 380, users: 56 },
  { day: 'Sun', votes: 430, users: 65 },
]

const categoryDistributionData = [
  { name: 'Innovation', value: 35, fill: '#FBBF24' },
  { name: 'Leadership', value: 28, fill: '#F59E0B' },
  { name: 'Impact', value: 22, fill: '#D97706' },
  { name: 'Community', value: 15, fill: '#B45309' },
]

const quarterlyRevenueData = [
  { quarter: 'Q1', revenue: 12000, participants: 480 },
  { quarter: 'Q2', revenue: 19000, participants: 760 },
  { quarter: 'Q3', revenue: 15500, participants: 620 },
  { quarter: 'Q4', revenue: 22500, participants: 900 },
]

const mini_stats_data = [
  { label: 'W1', value: 240 },
  { label: 'W2', value: 385 },
  { label: 'W3', value: 290 },
  { label: 'W4', value: 450 },
]

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white pt-24 md:pt-32">
        
        {/* Hero Card with Background Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mb-12 border border-brand-yellow/20 bg-gradient-to-r from-brand-yellow/10 to-yellow-600/10 rounded-2xl overflow-hidden mx-6 lg:mx-12"
        >
          <div
            className="relative h-72 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(/Images/5452980.jpg)` }}
          >
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />

            {/* Content */}
            <div className="relative z-10 p-8 md:p-12 flex items-center h-full">
              <div className="max-w-2xl">
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-4xl md:text-5xl font-bold text-white mb-4"
                >
                  Welcome to Your Dashboard
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-brand-yellow/90 text-lg mb-8 leading-relaxed max-w-lg"
                >
                  Track your activity, votes, and platform performance in real-time. Stay connected with the movement and see your impact.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link
                    href="/vote"
                    className="px-6 py-3 bg-gradient-to-r from-brand-yellow to-yellow-600 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-brand-yellow/50 transition-all duration-200"
                  >
                    Start Voting
                  </Link>
                  <Link
                    href="/leaderboard"
                    className="px-6 py-3 border border-brand-yellow/50 text-white font-medium rounded-lg hover:bg-brand-yellow/10 transition-colors duration-200"
                  >
                    View Leaderboard
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <main className="container mx-auto px-6 lg:px-12 pb-20">

          {/* Stats Grid */}
          <motion.section 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {[
              { 
                icon: TrendingUp, 
                label: 'Total Votes', 
                value: data?.votesCast?.toLocaleString() || '0',
                color: 'from-brand-yellow to-yellow-600',
                description: 'Votes cast this month',
                trend: '+12%',
                miniData: mini_stats_data
              },
              { 
                icon: Trophy, 
                label: 'Top Contestant', 
                value: data?.leaderboard?.[0]?.name || 'Pending',
                color: 'from-yellow-400 to-yellow-500',
                description: 'Currently leading',
                trend: '+5%',
                miniData: mini_stats_data
              },
              { 
                icon: Users, 
                label: 'Active Users', 
                value: data?.totalUsers?.toLocaleString() || '0',
                color: 'from-yellow-300 to-yellow-600',
                description: 'On platform',
                trend: '+23%',
                miniData: mini_stats_data
              },
              { 
                icon: Target, 
                label: 'Contestants', 
                value: data?.totalContestants?.toLocaleString() || '0',
                color: 'from-yellow-400 to-brand-yellow',
                description: 'Competing now',
                trend: '+8%',
                miniData: mini_stats_data
              },
            ].map((stat, i) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="group"
                >
                  <div className="relative h-full">
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-yellow/20 to-yellow-600/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Card */}
                    <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-brand-yellow/30 transition-all duration-300 h-full flex flex-col">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} text-black`}>
                          <Icon size={24} className="font-bold" />
                        </div>
                        <span className="text-xs font-semibold text-green-400 px-2 py-1 bg-green-400/10 rounded">
                          {stat.trend}
                        </span>
                      </div>

                      {/* Mini Chart */}
                      <div className="flex-1 mb-4">
                        <div className="h-16 mb-2">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stat.miniData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                              <XAxis dataKey="label" axisLine={false} tickLine={false} tick={false} />
                              <Bar dataKey="value" fill="#FBBF24" radius={[2, 2, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          {stat.miniData.map((item, idx) => (
                            <span key={idx} className="text-center flex-1">{item.label}</span>
                          ))}
                        </div>
                      </div>

                      {/* Content */}
                      <div>
                        <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                        <p className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</p>
                        <p className="text-xs text-gray-500">{stat.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.section>

          {/* Main Grid - Leaderboard & Activity */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">

            {/* Leaderboard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="lg:col-span-2 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm overflow-hidden hover:border-brand-yellow/30 transition-all duration-300 flex flex-col"
            >
              {/* Header Section - Title + Context + Filter */}
              <div className="px-6 py-5 border-b border-white/10 bg-white/5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <Trophy size={24} className="text-brand-yellow" />
                      Leaderboard
                    </h2>
                    <p className="text-sm text-gray-400 mt-2">Top performers this week • Updated in real-time</p>
                  </div>
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors group" title="More options">
                    <MoreVertical size={18} className="text-gray-400 group-hover:text-brand-yellow transition-colors" />
                  </button>
                </div>

                {/* Filter/Toggle - Time Range */}
                <div className="flex gap-2">
                  {['This Week', 'This Month', 'All Time'].map((timeframe) => (
                    <button
                      key={timeframe}
                      className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
                        timeframe === 'This Week'
                          ? 'bg-brand-yellow/20 text-brand-yellow border border-brand-yellow/40'
                          : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      {timeframe}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ranking List */}
              <div className="flex-1 overflow-y-auto">
                {data?.leaderboard?.length ? (
                  <div className="divide-y divide-white/5">
                    {/* Top 3 with Emphasis */}
                    {data.leaderboard.slice(0, 3).map((user, i) => {
                      const medalIcons = ['🥇', '🥈', '🥉']
                      return (
                        <motion.div
                          key={user.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
                          className={`px-6 py-5 flex items-center justify-between transition-all duration-200 ${
                            i === 0
                              ? 'bg-gradient-to-r from-brand-yellow/15 to-yellow-600/5 border-l-4 border-brand-yellow hover:bg-gradient-to-r hover:from-brand-yellow/20 hover:to-yellow-600/10'
                              : 'hover:bg-white/5'
                          }`}
                        >
                          {/* Rank & User Info */}
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            {/* Rank Number */}
                            <div
                              className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-transform ${
                                i === 0
                                  ? 'bg-gradient-to-br from-brand-yellow to-yellow-600 text-black'
                                  : i === 1
                                  ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-black'
                                  : 'bg-gradient-to-br from-amber-700 to-amber-800 text-white'
                              }`}
                            >
                              {medalIcons[i]}
                            </div>

                            {/* User Info */}
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-white truncate">{user.name}</p>
                              <p className="text-xs text-gray-500 mt-0.5">Contestant</p>
                            </div>
                          </div>

                          {/* Metric & Trend */}
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className={`font-bold text-lg transition-colors ${
                                i === 0 ? 'text-brand-yellow' : 'text-white'
                              }`}>
                                {user.votes.toLocaleString()}
                              </p>
                              <p className="text-xs text-gray-500">votes</p>
                            </div>
                            {/* Trend Badge */}
                            <div className="px-2.5 py-1.5 rounded-lg bg-green-500/20 border border-green-500/40 flex items-center gap-1">
                              <span className="text-green-400 text-sm font-medium">+12%</span>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}

                    {/* Remaining Ranks 4-10 */}
                    {data.leaderboard.slice(3, 10).map((user, i) => (
                      <motion.div
                        key={user.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + i * 0.05, duration: 0.4 }}
                        className="px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors duration-200"
                      >
                        {/* Rank & User Info */}
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          {/* Rank Number */}
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-sm text-gray-400">
                            {i + 4}
                          </div>

                          {/* User Info */}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-white truncate">{user.name}</p>
                            <p className="text-xs text-gray-500">Contestant</p>
                          </div>
                        </div>

                        {/* Metric */}
                        <div className="text-right">
                          <p className="font-semibold text-white">{user.votes.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">votes</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  /* Empty State */
                  <div className="px-6 py-16 text-center flex flex-col items-center justify-center min-h-64">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                      <Trophy size={32} className="text-gray-500" />
                    </div>
                    <p className="text-gray-400 font-medium mb-2">No rankings yet</p>
                    <p className="text-sm text-gray-500 mb-6">Be the first to participate and claim the top spot</p>
                    <Link
                      href="/vote"
                      className="px-4 py-2 bg-brand-yellow/20 text-brand-yellow border border-brand-yellow/40 rounded-lg hover:bg-brand-yellow/30 transition-colors text-sm font-medium"
                    >
                      Start Voting
                    </Link>
                  </div>
                )}
              </div>

              {/* Current User Position Indicator (if not in top 10) */}
              {data?.leaderboard && data.leaderboard.length > 10 && (
                <div className="border-t border-white/10 bg-white/5 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-yellow/20 flex items-center justify-center font-bold text-sm text-brand-yellow border border-brand-yellow/40">
                        #42
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">Your Position</p>
                        <p className="text-xs text-gray-500">You have 523 votes</p>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 text-sm rounded-lg bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/40 hover:bg-brand-yellow/20 transition-colors font-medium">
                      Climb Up
                    </button>
                  </div>
                </div>
              )}

              {/* Footer Link - View Full */}
              <Link 
                href="/leaderboard"
                className="px-6 py-4 bg-white/5 text-brand-yellow hover:bg-white/10 transition-colors border-t border-white/10 font-medium flex items-center justify-center gap-2 hover:translate-y-0 transform hover:-translate-y-0.5 transition-transform"
              >
                View Full Leaderboard
                <ArrowRight size={16} />
              </Link>
            </motion.div>

            {/* Quick Stats & Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="space-y-6"
            >
              {/* Activity Summary */}
              <div className="border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm p-6 hover:border-brand-yellow/30 transition-all duration-300">
                <div className="flex items-center gap-2 mb-5">
                  <div className="p-2 rounded-lg bg-brand-yellow/20">
                    <Zap size={18} className="text-brand-yellow" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Activity Summary</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-brand-yellow mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-gray-300">Platform active</p>
                      <p className="text-xs text-gray-500"><span className="text-brand-yellow font-semibold">{data?.totalUsers?.toLocaleString() || '0'}</span> users</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-brand-yellow mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-gray-300">Competing now</p>
                      <p className="text-xs text-gray-500"><span className="text-brand-yellow font-semibold">{data?.totalContestants?.toLocaleString() || '0'}</span> contestants</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-brand-yellow mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-gray-300">Votes cast</p>
                      <p className="text-xs text-gray-500"><span className="text-brand-yellow font-semibold">{data?.votesCast?.toLocaleString() || '0'}</span> this month</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Quick Actions */}
              <div className="border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm p-6 hover:border-brand-yellow/30 transition-all duration-300">
                <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                  <Award size={20} className="text-brand-yellow" />
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Link
                    href="/vote"
                    className="flex items-center justify-between px-4 py-3 rounded-lg border border-brand-yellow/30 bg-brand-yellow/10 hover:bg-brand-yellow/20 transition-all duration-200 group"
                  >
                    <span className="font-medium text-white">Vote Now</span>
                    <ArrowRight size={16} className="text-brand-yellow group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/challenges"
                    className="flex items-center justify-between px-4 py-3 rounded-lg border border-white/20 hover:border-brand-yellow/30 hover:bg-white/5 transition-all duration-200 group"
                  >
                    <span className="font-medium text-white">View Challenges</span>
                    <ArrowRight size={16} className="text-gray-400 group-hover:text-brand-yellow group-hover:translate-x-1 transition-all" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Charts Showcase Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
          >
            {/* Area Chart - Votes Trend */}
            <div className="border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm p-6 hover:border-brand-yellow/30 transition-all duration-300">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <BarChart3 size={20} className="text-brand-yellow" />
                  Votes Trend
                </h3>
                <p className="text-sm text-gray-500 mt-1">Monthly comparison</p>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={votesTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVotes" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FBBF24" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#FBBF24" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(251,191,36,0.2)', borderRadius: '8px' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="votes"
                    stroke="#FBBF24"
                    strokeWidth={2}
                    fill="url(#colorVotes)"
                  />
                  <Legend />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Line Chart - Weekly Activity */}
            <div className="border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm p-6 hover:border-brand-yellow/30 transition-all duration-300">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <TrendingUp size={20} className="text-brand-yellow" />
                  Weekly Activity
                </h3>
                <p className="text-sm text-gray-500 mt-1">User engagement trends</p>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyActivityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="day" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(251,191,36,0.2)', borderRadius: '8px' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#FBBF24"
                    strokeWidth={3}
                    dot={{ fill: '#FBBF24', r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="votes"
                    stroke="#F59E0B"
                    strokeWidth={3}
                    dot={{ fill: '#F59E0B', r: 4 }}
                  />
                  <Legend />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart - Category Distribution */}
            <div className="border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm p-6 hover:border-brand-yellow/30 transition-all duration-300">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <PieChartIcon size={20} className="text-brand-yellow" />
                  Category Distribution
                </h3>
                <p className="text-sm text-gray-500 mt-1">Contest categories breakdown</p>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.name} ${entry.value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(251,191,36,0.2)', borderRadius: '8px' }}
                    labelStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart - Quarterly Performance */}
            <div className="border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm p-6 hover:border-brand-yellow/30 transition-all duration-300">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Award size={20} className="text-brand-yellow" />
                  Quarterly Performance
                </h3>
                <p className="text-sm text-gray-500 mt-1">Revenue & participation</p>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={quarterlyRevenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="quarter" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(251,191,36,0.2)', borderRadius: '8px' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="revenue" fill="#FBBF24" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="participants" fill="#F59E0B" radius={[8, 8, 0, 0]} />
                  <Legend />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.section>

          {/* Featured Section - Call to Action */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="border border-brand-yellow/20 rounded-2xl bg-gradient-to-r from-brand-yellow/10 to-yellow-600/10 p-8 md:p-12 hover:border-brand-yellow/40 transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Stay Updated</h2>
                <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                  Follow the latest challenges, vote on your favorite contestants, and be part of the movement. Check out live updates and see who's leading the pack.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/challenges"
                    className="px-6 py-3 bg-gradient-to-r from-brand-yellow to-yellow-600 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-brand-yellow/50 transition-all duration-200 text-center"
                  >
                    View All Challenges
                  </Link>
                  <Link
                    href="/movement"
                    className="px-6 py-3 border border-brand-yellow/50 text-white font-medium rounded-lg hover:bg-brand-yellow/10 transition-colors duration-200 text-center"
                  >
                    Learn Our Movement
                  </Link>
                </div>
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
