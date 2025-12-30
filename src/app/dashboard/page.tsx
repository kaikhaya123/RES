'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Bell,
  Vote,
  BookOpen,
  Tv,
  Trophy,
  Settings,
  LogOut,
  User,
  ArrowRight
} from 'lucide-react';

/**
 * Simple animated counter using requestAnimationFrame.
 * Works reliably across environments.
 */
function AnimatedNumber({ value, duration = 800 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  const startRef = useRef<number | null>(null);
  const fromRef = useRef(display);
  useEffect(() => {
    fromRef.current = display;
    startRef.current = null;
    const start = performance.now();
    const diff = value - fromRef.current;
    let raf = 0;

    function step(now: number) {
      if (!startRef.current) startRef.current = now;
      const elapsed = now - startRef.current;
      const t = Math.min(1, elapsed / duration);
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // simple ease in/out
      const current = Math.round(fromRef.current + diff * eased);
      setDisplay(current);
      if (t < 1) raf = requestAnimationFrame(step);
    }

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  return <span>{display.toLocaleString()}</span>;
}

/**
 * Mock data, replace with real API data.
 */
const initialStats = {
  votesCast: 124_560,
  quizzesCompleted: 3_214,
  leaderboardPosition: 12,
  remainingVotes: 42,
  liveViewers: 2784
};

const mockLeaderboard = [
  { name: 'K. Zuma', votes: 2840 },
  { name: 'A. Smith', votes: 2650 },
  { name: 'J. Mokoena', votes: 2420 },
  { name: 'L. Nkosi', votes: 2175 },
  { name: 'T. Patel', votes: 1982 }
];

export default function DashboardPage() {
  const [stats, setStats] = useState(initialStats);
  const [leaderboard, setLeaderboard] = useState(mockLeaderboard);

  // simulate small live updates
  useEffect(() => {
    const id = setInterval(() => {
      setStats((s) => ({
        ...s,
        votesCast: s.votesCast + Math.floor(Math.random() * 10),
        liveViewers: Math.max(1200, Math.round(s.liveViewers + (Math.random() - 0.5) * 200))
      }));
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HERO */}
      <header className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900 to-black" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/6 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12"
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                  Welcome back, <span className="text-amber-300">Champion</span>
                </h1>
                <p className="mt-3 text-white/80 max-w-2xl">
                  Dashboard overview. Quick actions. Live metrics. Stay in control of your journey.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/stream" className="inline-flex items-center gap-2 px-5 py-3 bg-amber-400 text-black font-bold rounded-lg shadow-md">
                    <Tv size={16} />
                    Watch Live
                  </Link>
                  <Link href="/vote" className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 text-white font-semibold rounded-lg border border-white/10">
                    <Vote size={16} />
                    Vote Now
                  </Link>
                </div>
              </div>

              <div className="w-full lg:w-80 flex-shrink-0">
                <div className="bg-white/5 rounded-xl p-4 border border-white/8">
                  <div className="relative w-full h-40 rounded-lg overflow-hidden">
                    <Image src="/images/hero-profile.jpg" alt="hero" fill sizes="100vw" className="object-cover img-lighten" />
                  </div>
                  <div className="mt-3 text-white/90 font-semibold">Your live snapshot</div>
                  <div className="text-sm text-white/70">Quick overview of activity and rewards</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* STATS STRIP */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 -mt-10 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
            <p className="text-sm text-slate-500 font-semibold">VOTES CAST</p>
            <div className="mt-3 text-3xl font-extrabold text-slate-900">
              <AnimatedNumber value={stats.votesCast} duration={900} />
            </div>
            <p className="text-xs text-slate-400 mt-2">Total votes recorded</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
            <p className="text-sm text-slate-500 font-semibold">QUIZZES COMPLETED</p>
            <div className="mt-3 text-3xl font-extrabold text-slate-900">
              <AnimatedNumber value={stats.quizzesCompleted} duration={900} />
            </div>
            <p className="text-xs text-slate-400 mt-2">Daily engagement</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
            <p className="text-sm text-slate-500 font-semibold">LIVE VIEWERS</p>
            <div className="mt-3 text-3xl font-extrabold text-slate-900">
              <AnimatedNumber value={stats.liveViewers} duration={700} />
            </div>
            <p className="text-xs text-slate-400 mt-2">Watching right now</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
            <p className="text-sm text-slate-500 font-semibold">VOTES LEFT</p>
            <div className="mt-3 text-3xl font-extrabold text-amber-600">
              <AnimatedNumber value={stats.remainingVotes} duration={600} />
            </div>
            <p className="text-xs text-slate-400 mt-2">Your remaining daily votes</p>
          </div>
        </motion.div>
      </section>

      {/* FEATURED CARD */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 mt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-warm-stone-secondary rounded-2xl p-6 md:p-8 border border-warm-stone-border shadow-md flex flex-col md:flex-row items-center gap-6"
        >
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 font-black">
                <span>Q</span>
              </div>
              <div>
                <div className="text-sm font-bold text-slate-700">Daily Quiz</div>
                <div className="text-lg font-extrabold text-slate-900">Win bonus votes and prizes today</div>
              </div>
            </div>
            <p className="text-sm text-slate-500 mt-3 max-w-xl">
              New challenge live now. Complete before midnight to get extra points and badge.
            </p>
          </div>

          <div className="w-full md:w-56">
            <Link href="/quiz" className="inline-flex items-center justify-center w-full px-4 py-3 bg-amber-600 text-white font-bold rounded-lg shadow">
              Take Quiz
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ACTIONS GRID */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div whileHover={{ y: -6 }} className="bg-warm-stone-secondary rounded-2xl p-6 border border-warm-stone-border shadow-sm">
            <Link href="/vote" className="block">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-amber-50">
                  <Vote size={22} className="text-amber-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Vote</h4>
                  <p className="text-sm text-slate-500 mt-1">Support your favourite contestant.</p>
                </div>
              </div>
              <div className="mt-4 text-sm text-amber-600 font-semibold">Cast Votes →</div>
            </Link>
          </motion.div>

          <motion.div whileHover={{ y: -6 }} className="bg-warm-stone-secondary rounded-2xl p-6 border border-warm-stone-border shadow-sm">
            <Link href="/quiz" className="block">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-indigo-50">
                  <BookOpen size={22} className="text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Daily Quiz</h4>
                  <p className="text-sm text-slate-500 mt-1">Earn points and badges.</p>
                </div>
              </div>
              <div className="mt-4 text-sm text-indigo-600 font-semibold">Take Quiz →</div>
            </Link>
          </motion.div>

          <motion.div whileHover={{ y: -6 }} className="bg-warm-stone-secondary rounded-2xl p-6 border border-warm-stone-border shadow-sm">
            <Link href="/stream" className="block">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-red-50">
                  <Tv size={22} className="text-red-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Live Stream</h4>
                  <p className="text-sm text-slate-500 mt-1">Watch shows and vote live.</p>
                </div>
              </div>
              <div className="mt-4 text-sm text-red-600 font-semibold">Join Stream →</div>
            </Link>
          </motion.div>

          <motion.div whileHover={{ y: -6 }} className="bg-warm-stone-secondary rounded-2xl p-6 border border-warm-stone-border shadow-sm">
            <Link href="/leaderboard" className="block">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-emerald-50">
                  <Trophy size={22} className="text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Leaderboard</h4>
                  <p className="text-sm text-slate-500 mt-1">See top voters and rankings.</p>
                </div>
              </div>
              <div className="mt-4 text-sm text-emerald-600 font-semibold">View Ranks →</div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* LEADERBOARD + PROFILE */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 mt-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-warm-stone-secondary rounded-2xl p-6 border border-warm-stone-border shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Trophy className="text-amber-600" />
              <h3 className="text-xl font-bold">Top Voters</h3>
            </div>

            <div className="space-y-3">
              {leaderboard.map((u, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  className="flex items-center justify-between p-3 rounded-lg border border-warm-stone-border"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-rose-500 flex items-center justify-center font-bold text-white">
                      {i + 1}
                    </div>
                    <div>
                      <div className="font-semibold">{u.name}</div>
                      <div className="text-xs text-slate-500">Top fan</div>
                    </div>
                  </div>
                  <div className="font-extrabold text-slate-900">{u.votes.toLocaleString()}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <aside className="bg-warm-stone-secondary rounded-2xl p-6 border border-warm-stone-border shadow-sm">
            <div className="mb-4">
              <p className="text-xs text-slate-500 uppercase">Your Profile</p>
              <div className="mt-3 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-amber-500 flex items-center justify-center text-white font-bold">KZ</div>
                <div>
                  <div className="font-bold">Khayalami Z.</div>
                  <div className="text-xs text-slate-500">khayalami@example.com</div>
                </div>
              </div>
            </div>

            <nav className="space-y-2">
              <Link href="/dashboard/profile" className="flex items-center justify-between p-3 rounded-lg border border-warm-stone-border hover:bg-warm-stone-base">
                <div className="flex items-center gap-3">
                  <User />
                  <span className="font-medium">My Profile</span>
                </div>
                <ArrowRight />
              </Link>

              <Link href="/dashboard/settings" className="flex items-center justify-between p-3 rounded-lg border border-warm-stone-border hover:bg-warm-stone-base\">
                <div className="flex items-center gap-3">
                  <Settings />
                  <span className="font-medium">Settings</span>
                </div>
                <ArrowRight />
              </Link>

              <button className="w-full mt-3 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-red-300 text-red-600">
                <LogOut />
                Logout
              </button>
            </nav>
          </aside>
        </div>
      </section>

      {/* FOOTER CTA */}
      <footer className="bg-warm-stone-base border-t border-warm-stone-border\">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
            <h3 className="text-2xl font-bold">Ready to level up?</h3>
            <p className="text-slate-500 mt-2 max-w-2xl mx-auto">Join the live stream. Cast votes. Help shape the future of student talent.</p>

            <div className="mt-6 flex items-center justify-center gap-4">
              <Link href="/stream" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-lg font-bold">Watch Live</Link>
              <Link href="/auth/register" className="inline-flex items-center gap-2 px-6 py-3 border border-warm-stone-border rounded-lg\">Register</Link>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
