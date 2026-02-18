'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

interface Contestant {
  id: string
  name: string
  votes: number
  image?: string
  institution?: string
  province?: string
  trend?: 'up' | 'down' | 'same'
  previousRank?: number
}

const PAGE_SIZE = 50

export default function FullLeaderboardPage() {
  const [contestants, setContestants] = useState<Contestant[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetch('/api/leaderboard')
      .then(r => r.json())
      .then(data => {
        setContestants((data.contestants || []).slice(0, 200))
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [])

  const getRankBadge = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-black shadow-yellow-500/50'
    if (rank === 2) return 'bg-gradient-to-br from-gray-300 to-gray-500 text-black shadow-gray-400/50'
    if (rank === 3) return 'bg-gradient-to-br from-amber-600 to-amber-800 text-white shadow-amber-600/50'
    return 'bg-white/10 border border-white/20 text-white/70'
  }

  const paged = contestants.slice(0, page * PAGE_SIZE)

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10">
        <Navbar />
      </div>
      <div className="min-h-screen bg-black text-white pt-24 md:pt-32">

        {/* Header */}
        <div className="bg-brand-yellow px-6 lg:px-12 py-12">
          <div className="max-w-5xl mx-auto">
            <Link href="/leaderboard" className="inline-flex items-center gap-2 text-black/60 hover:text-black mb-4 font-semibold text-sm">
              ← Back to Leaderboard
            </Link>
            <h1 className="text-4xl md:text-5xl font-black text-black">Full Rankings</h1>
            <p className="text-black/70 mt-2">Top {Math.min(contestants.length, 200)} contestants — live during recruitment &amp; show period</p>
          </div>
        </div>

        {/* Table */}
        <main className="max-w-5xl mx-auto px-6 lg:px-12 py-12">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-yellow" />
            </div>
          ) : contestants.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">🏆</p>
              <h3 className="text-2xl font-bold mb-2">No Rankings Yet</h3>
              <p className="text-white/50 mb-6">Rankings will appear once recruitment opens.</p>
              <Link href="/auth/register" className="inline-flex items-center gap-2 bg-brand-yellow text-black px-8 py-3 font-black text-sm uppercase tracking-wider rounded-lg">
                Register to Vote
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                {paged.map((c, idx) => {
                  const rank = idx + 1
                  return (
                    <motion.div key={c.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: Math.min(idx, 20) * 0.02 }}
                      className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.06] rounded-xl px-5 py-4 hover:bg-white/[0.06] transition-all"
                    >
                      <div className={"w-10 h-10 rounded-full flex items-center justify-center font-black text-sm shadow-lg " + getRankBadge(rank)}>
                        {rank === 1 ? '🏆' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : rank}
                      </div>
                      {c.image ? (
                        <img src={c.image} alt={c.name} className="w-10 h-10 rounded-full object-cover border-2 border-brand-yellow/30 shrink-0" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-brand-yellow/20 border border-brand-yellow/30 flex items-center justify-center shrink-0">
                          <span className="text-brand-yellow font-black text-xs">{c.name.split(' ').map((n: string) => n[0]).join('')}</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-black text-white truncate">{c.name}</p>
                        {c.institution && <p className="text-white/40 text-xs truncate">{c.institution}</p>}
                      </div>
                      {c.province && <span className="text-white/30 text-xs hidden md:block shrink-0">{c.province}</span>}
                      <div className="text-right shrink-0">
                        <p className="font-black text-brand-yellow text-lg">{c.votes.toLocaleString()}</p>
                        <p className="text-white/30 text-xs">votes</p>
                      </div>
                      <Link href={"/vote?contestant=" + c.id}
                        className="shrink-0 px-4 py-2 bg-brand-yellow text-black font-black text-xs uppercase rounded-lg hover:bg-yellow-500 transition-all">
                        Vote
                      </Link>
                    </motion.div>
                  )
                })}
              </div>

              {/* Load more */}
              {paged.length < contestants.length && (
                <div className="mt-8 text-center">
                  <button onClick={() => setPage(p => p + 1)}
                    className="px-8 py-3 border border-brand-yellow text-brand-yellow font-black text-sm uppercase rounded-lg hover:bg-brand-yellow hover:text-black transition-all">
                    Load More ({contestants.length - paged.length} remaining)
                  </button>
                </div>
              )}
              {paged.length >= contestants.length && contestants.length > 0 && (
                <p className="mt-8 text-center text-white/30 text-sm">Showing all {contestants.length} ranked contestants</p>
              )}
            </>
          )}
        </main>
      </div>
      <Footer />
    </>
  )
}
