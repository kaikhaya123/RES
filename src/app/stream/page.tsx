'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Radio, Users, Eye, Play, Calendar, Clock, Tv2, Youtube, Facebook, Globe } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const platforms = [
  { name: 'Facebook Live', Icon: Facebook, reach: '32M', reachLabel: 'SA Facebook Users', color: 'from-blue-700 to-blue-500', border: 'border-blue-500/30', tag: 'Primary Stream' },
  { name: 'YouTube', Icon: Youtube, reach: '25.8M', reachLabel: 'SA YouTube Users', color: 'from-red-700 to-red-500', border: 'border-red-500/30', tag: 'Full Replays' },
  { name: 'TikTok Live', Icon: Globe, reach: '17.46M', reachLabel: 'SA TikTok Users', color: 'from-pink-700 to-pink-500', border: 'border-pink-500/30', tag: 'Highlights' },
  { name: 'Instagram Live', Icon: Globe, reach: '7.3M', reachLabel: 'SA Instagram Users', color: 'from-purple-700 to-orange-500', border: 'border-purple-500/30', tag: 'Behind the Scenes' },
  { name: 'X (Twitter)', Icon: Globe, reach: '4.1M', reachLabel: 'SA X Users', color: 'from-gray-700 to-gray-500', border: 'border-gray-500/30', tag: 'Live Commentary' },
];

const schedule = [
  { time: '06:00  08:00', label: 'Morning Live  House Wake-Up', live: true },
  { time: '10:00  12:00', label: 'Challenge Session', live: false },
  { time: '13:00  14:00', label: 'Lunch & House Conversations', live: true },
  { time: '16:00  18:00', label: 'Afternoon Challenge & Voting', live: true },
  { time: '20:00  22:00', label: 'Evening Recap / Eviction Nights', live: true },
  { time: '22:00  00:00', label: 'Late Night House Cam', live: false },
];

export default function StreamPage() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-black text-white">

        {/* HERO */}
        <section className="relative px-6 lg:px-12 pt-32 pb-20 overflow-hidden bg-gradient-to-b from-brand-yellow/10 to-black">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="flex items-center gap-2 bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                Live When Show Airs
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight mb-6 uppercase">
              Watch Live.
              <br />
              <span className="text-brand-yellow">Vote Live.</span>
            </h1>
            <p className="text-lg lg:text-xl text-white/60 max-w-3xl leading-relaxed mb-10">
              R.E.S. streams 18 hours a day across 5 major platforms. No DStv subscription. No paywalls. Just pure South African storytelling, live  anywhere, anytime.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { Icon: Eye, label: 'Combined Reach', value: '54M+' },
                { Icon: Clock, label: 'Daily Live Hours', value: '18 hrs/day' },
                { Icon: Radio, label: 'Active Platforms', value: '5 Platforms' },
                { Icon: Tv2, label: 'DStv Reach (declining)', value: '7.4M' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3">
                  <stat.Icon className="w-5 h-5 text-brand-yellow shrink-0" />
                  <div>
                    <p className="text-[10px] text-white/40 uppercase tracking-wider">{stat.label}</p>
                    <p className="font-black text-white text-sm">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* LIVE PLAYER PLACEHOLDER */}
        <section className="px-6 lg:px-12 py-12 max-w-6xl mx-auto">
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
                <span className="text-sm font-black uppercase tracking-widest text-white/70">Live Stream</span>
              </div>
              <div className="flex gap-2">
                {['Facebook', 'YouTube', 'TikTok'].map((p) => (
                  <button key={p} className="text-xs text-white/40 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1 rounded-full transition-all font-semibold">
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div className="aspect-video flex flex-col items-center justify-center bg-gradient-to-br from-brand-yellow/5 to-black gap-4">
              <div className="w-20 h-20 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center">
                <Play className="w-8 h-8 text-brand-yellow ml-1" />
              </div>
              <div className="text-center">
                <p className="font-black text-white text-lg mb-1">Stream Goes Live When Show Airs</p>
                <p className="text-white/40 text-sm max-w-sm">Multi-platform live streams will be embedded here once the show launches. Register now for launch date notifications.</p>
              </div>
              <Link href="/auth/register" className="inline-flex items-center gap-2 bg-brand-yellow text-black px-8 py-3 text-xs font-black uppercase tracking-widest rounded-lg hover:bg-yellow-500 transition-all mt-2">
                Get Notified at Launch <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* WHY ONLINE BEATS TV */}
        <section className="px-6 lg:px-12 py-16 border-y border-white/10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
          >
            <div>
              <p className="text-brand-yellow text-xs font-black tracking-[0.2em] uppercase mb-4">Why Online Beats TV</p>
              <h2 className="text-4xl font-black mb-6 leading-tight">
                54 Million Online.<br />
                <span className="text-white/40">7.4 Million TV & Declining.</span>
              </h2>
              <p className="text-white/65 leading-relaxed text-base mb-6">
                Traditional TV viewership in South Africa has been shrinking year on year. Online platforms are where the real audience lives  especially young South Africans aged 18-35.
              </p>
              <p className="text-white/65 leading-relaxed text-base">
                R.E.S. was designed to be a born-online show. No gatekeepers. No subscriptions. No missed episodes. Just live, raw, authentic storytelling available to anyone with a phone.
              </p>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Facebook + Instagram (Meta Reach)', value: '39.3M', pct: 73 },
                { label: 'YouTube', value: '25.8M', pct: 48 },
                { label: 'TikTok', value: '17.46M', pct: 32 },
                { label: 'X (Twitter)', value: '4.1M', pct: 8 },
                { label: 'DStv (and declining)', value: '7.4M', pct: 14 },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/60 font-semibold">{item.label}</span>
                    <span className="text-brand-yellow font-black">{item.value}</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: item.pct + '%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className={item.label.includes('DStv') ? 'h-full bg-white/20 rounded-full' : 'h-full bg-brand-yellow rounded-full'}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* PLATFORMS */}
        <section className="px-6 lg:px-12 py-20 max-w-7xl mx-auto">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-white/40 mb-8">Streaming Platforms</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {platforms.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={'border ' + p.border + ' rounded-2xl overflow-hidden bg-white/[0.015]'}
              >
                <div className={'h-1 bg-gradient-to-r ' + p.color} />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1 block">{p.tag}</span>
                      <h3 className="font-black text-white text-lg">{p.name}</h3>
                    </div>
                    <p.Icon className="w-6 h-6 text-white/30 shrink-0" />
                  </div>
                  <p className="text-3xl font-black text-white mb-1">{p.reach}</p>
                  <p className="text-white/40 text-xs">{p.reachLabel}</p>
                </div>
              </motion.div>
            ))}
            {/* Total card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="border border-brand-yellow/30 rounded-2xl overflow-hidden bg-brand-yellow/5 sm:col-span-2 lg:col-span-2"
            >
              <div className="h-1 bg-brand-yellow" />
              <div className="p-6 flex items-center justify-between gap-6">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-yellow/60 mb-1 block">Combined Total Reach</span>
                  <p className="text-5xl font-black text-brand-yellow">54M+</p>
                  <p className="text-white/50 text-sm mt-1">South African online users across all platforms combined</p>
                </div>
                <Users className="w-16 h-16 text-brand-yellow/20 shrink-0" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* DAILY SCHEDULE */}
        <section className="px-6 lg:px-12 py-20 border-t border-white/10">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-white/40 mb-2">Daily Broadcast Schedule</p>
            <h2 className="text-3xl font-black mb-10">18 Hours. Every Day.</h2>
            <div className="space-y-3">
              {schedule.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.06] rounded-xl px-5 py-4"
                >
                  <div className="flex items-center gap-2 shrink-0">
                    <Clock className="w-4 h-4 text-brand-yellow/60" />
                    <span className="text-white/70 font-black text-sm tabular-nums w-36">{item.time}</span>
                  </div>
                  <span className="text-white/80 text-sm flex-1">{item.label}</span>
                  {item.live && (
                    <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-red-400 bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded-full shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      Live
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
            <p className="text-white/30 text-xs mt-4">* Schedule subject to change. Eviction nights may extend broadcast hours.</p>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 lg:px-12 py-24 text-center border-t border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-brand-yellow text-xs font-black tracking-[0.2em] uppercase mb-4">Don't miss a moment</p>
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              Register for
              <br />
              <span className="text-brand-yellow">Launch Alerts.</span>
            </h2>
            <p className="text-white/55 max-w-xl mx-auto mb-10 text-lg">
              Be the first to know when the stream goes live. Get your 100 free daily votes and support your favourite contestant from Day 1.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/auth/register" className="inline-flex items-center justify-center gap-2 bg-brand-yellow text-black px-10 py-4 text-sm font-black uppercase tracking-widest rounded-lg hover:bg-yellow-500 transition-all">
                Register Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/vote" className="inline-flex items-center justify-center gap-2 border-2 border-brand-yellow text-white px-10 py-4 text-sm font-black uppercase tracking-widest rounded-lg hover:bg-brand-yellow hover:text-black transition-all">
                Learn About Voting <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </section>
      </div>

      <Footer />
    </>
  );
}
