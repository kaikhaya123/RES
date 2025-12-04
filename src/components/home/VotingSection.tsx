'use client';

import { motion, useMotionValue, animate, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { Trophy, Vote, TrendingUp, ArrowRight, Crown, Heart, Users, Zap, Star, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

function VoteCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(motionValue, value, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        node.textContent = Math.floor(latest).toLocaleString();
      }
    });

    return controls.stop;
  }, [motionValue, value, duration]);

  return <span ref={nodeRef}>0</span>;
}

export default function VotingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax transforms
  const yHero = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const yStats = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const yContestants = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const yLeaderboard = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  // Placeholder contestants
  const contestants = [
    {
      id: 1,
      name: 'Contestant Name',
      campus: 'University Name',
      bio: 'Future leader & innovator',
      votes: 245678,
      rank: 1,
      badge: 'Top Voted'
    },
    {
      id: 2,
      name: 'Contestant Name',
      campus: 'University Name',
      bio: 'Excellence in education',
      votes: 198432,
      rank: 2,
      badge: 'Rising Star'
    },
    {
      id: 3,
      name: 'Contestant Name',
      campus: 'University Name',
      bio: 'Inspiring change maker',
      votes: 176890,
      rank: 3,
      badge: 'Fan Favorite'
    },
    {
      id: 4,
      name: 'Contestant Name',
      campus: 'University Name',
      bio: 'Talented performer',
      votes: 154321,
      rank: 4,
      badge: 'Crowd Choice'
    },
    {
      id: 5,
      name: 'Contestant Name',
      campus: 'University Name',
      bio: 'Creative visionary',
      votes: 132456,
      rank: 5,
      badge: null
    },
    {
      id: 6,
      name: 'Contestant Name',
      campus: 'University Name',
      bio: 'Future entrepreneur',
      votes: 119876,
      rank: 6,
      badge: null
    }
  ];

  return (
    <section ref={sectionRef} className="py-32 lg:py-40 bg-black relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <motion.div 
          animate={{ 
            backgroundPosition: ['0px 0px', '60px 60px'],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0" 
          style={{ 
            backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} 
        />
      </div>

      {/* Floating decorative elements */}
      <motion.div
        style={{ y: yStats }}
        className="absolute top-20 left-10 w-4 h-4 border-2 border-white/10 rotate-45"
      />
      <motion.div
        style={{ y: yHero }}
        className="absolute top-40 right-20 w-6 h-6 border-2 border-white/10 rotate-45"
      />
      <motion.div
        style={{ y: yLeaderboard }}
        className="absolute bottom-40 left-20 w-3 h-3 border-2 border-white/10 rotate-45"
      />

      <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative">
        {/* Hero Header with Parallax */}
        <motion.div style={{ y: yHero, opacity, scale }} className="text-center mb-32">
          {/* Decorative Lines */}
          <div className="flex items-center justify-center gap-6 mb-10">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="h-[1px] w-20 lg:w-32 bg-white origin-right"
            />
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 150 }}
              className="w-2 h-2 bg-white rotate-45"
            />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="h-[1px] w-20 lg:w-32 bg-white origin-left"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="inline-flex items-center gap-2 px-6 py-2 border-2 border-white mb-8"
          >
            <Sparkles className="w-3 h-3" />
            <span className="text-xs uppercase tracking-[0.3em] font-black">100 Free Votes Daily</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl lg:text-8xl font-black mb-6 tracking-tighter text-white section-title"
          >
            Power Your <span className="font-light">Favorite</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed"
          >
            Every vote shapes the future. Support the contestants who inspire you most.
          </motion.p>
        </motion.div>

        {/* Stats Row with Parallax */}
        <motion.div 
          style={{ y: yStats }}
          className="grid grid-cols-1 md:grid-cols-3 gap-1 mb-32"
        >
          {[
            { icon: Heart, value: '196M+', label: 'Total Votes' },
            { icon: Users, value: '7.2M+', label: 'Daily Voters' },
            { icon: Trophy, value: '10', label: 'Top Contestants' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-white p-10 text-center relative group hover:bg-white/95 transition-all duration-300"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <stat.icon className="w-8 h-8 mx-auto mb-4" strokeWidth={1.5} />
              </motion.div>
              <div className="text-5xl font-black mb-2 tracking-tight">{stat.value}</div>
              <div className="text-xs uppercase tracking-[0.25em] font-bold text-gray-600">{stat.label}</div>
              
              {/* Corner accent */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-4 border-l-4 border-black" />
            </motion.div>
          ))}
        </motion.div>

        {/* Main Grid: Contestants (Staggered) + Leaderboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-32">
          {/* Left: Contestants Grid with Parallax - 8 columns */}
          <motion.div 
            style={{ y: yContestants }}
            className="lg:col-span-8"
          >
            <div className="flex items-center gap-3 mb-10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-2 h-2 bg-white rotate-45"
              />
              <h3 className="text-3xl font-black tracking-tight text-white">Featured Contestants</h3>
            </div>

            {/* Staggered Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contestants.map((contestant, index) => (
                <motion.div
                  key={contestant.id}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  style={{ 
                    marginTop: index % 2 === 1 ? '3rem' : '0'
                  }}
                  className="group"
                >
                  <div className="bg-white relative overflow-hidden">
                    {/* Badge */}
                    {contestant.badge && (
                      <div className="absolute top-4 right-4 z-10 px-3 py-1.5 bg-black text-white text-xs font-black uppercase tracking-wider">
                        {contestant.badge}
                      </div>
                    )}

                    {/* Image with Parallax */}
                    <div className="relative aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                      <motion.div 
                        className="absolute inset-0"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6 }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Users className="w-20 h-20 text-gray-300" strokeWidth={1} />
                        </div>
                      </motion.div>

                      {/* Rank Badge */}
                      {contestant.rank <= 3 && (
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                          className="absolute top-4 left-4 w-12 h-12 bg-black text-white flex items-center justify-center"
                        >
                          <Crown className="w-6 h-6" />
                        </motion.div>
                      )}

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-xl font-black mb-1 tracking-tight">{contestant.name}</h4>
                          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                            {contestant.campus}
                          </p>
                        </div>
                        <motion.div
                          animate={{ rotate: [0, 15, -15, 0] }}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        >
                          <Star className="w-5 h-5 text-gray-300" />
                        </motion.div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-4">{contestant.bio}</p>

                      {/* Votes */}
                      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                          <Heart className="w-4 h-4" />
                          <span className="text-sm font-bold">
                            <VoteCounter value={contestant.votes} /> votes
                          </span>
                        </div>
                        <div className="text-xs font-black text-gray-400">#{contestant.rank}</div>
                      </div>

                      {/* Vote Button */}
                      <button
                        disabled
                        className="w-full py-3 bg-black text-white font-black text-xs uppercase tracking-[0.15em] hover:bg-gray-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        <Vote className="w-4 h-4" />
                        Coming Soon
                      </button>
                    </div>

                    {/* Corner Accent */}
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-black" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Leaderboard with Parallax - 4 columns */}
          <motion.div
            style={{ y: yLeaderboard }}
            className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start"
          >
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-2 h-2 bg-black rotate-45"
                />
                <h3 className="text-2xl font-black tracking-tight">Live Rankings</h3>
              </div>

              {/* Top 3 Podium */}
              <div className="mb-8">
                {contestants.slice(0, 3).map((contestant, index) => (
                  <motion.div
                    key={contestant.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="mb-3 last:mb-0"
                  >
                    <div className="flex items-center gap-3 p-4 bg-black text-white relative overflow-hidden group hover:bg-gray-900 transition-colors">
                      {/* Rank with Crown */}
                      <div className="w-10 h-10 bg-white text-black flex items-center justify-center font-black relative z-10">
                        <Crown className="w-5 h-5" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0 relative z-10">
                        <div className="font-black text-sm truncate mb-0.5">{contestant.name}</div>
                        <div className="text-xs text-white/60">
                          <VoteCounter value={contestant.votes} duration={1.5} /> votes
                        </div>
                      </div>

                      {/* Trending */}
                      <motion.div
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <TrendingUp className="w-4 h-4 relative z-10" />
                      </motion.div>

                      {/* Accent line */}
                      <div className="absolute bottom-0 right-0 w-12 h-1 bg-white" />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Rest of Leaderboard */}
              <div className="space-y-2 mb-8">
                {contestants.slice(3, 6).map((contestant, index) => (
                  <motion.div
                    key={contestant.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.08 }}
                    className="flex items-center gap-3 p-3 border border-gray-200 hover:border-black transition-all duration-300 group"
                  >
                    {/* Rank */}
                    <div className="w-8 h-8 flex items-center justify-center font-black text-sm bg-gray-100 group-hover:bg-black group-hover:text-white transition-colors">
                      {index + 4}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-xs truncate">{contestant.name}</div>
                      <div className="text-xs text-gray-500">
                        <VoteCounter value={contestant.votes} duration={1.5} /> votes
                      </div>
                    </div>

                    <Zap className="w-3 h-3 text-gray-400 group-hover:text-black transition-colors" />
                  </motion.div>
                ))}
              </div>

              {/* View All */}
              <Link
                href="#"
                className="block text-center py-3 border-2 border-black font-black text-xs uppercase tracking-[0.15em] hover:bg-black hover:text-white transition-all duration-300"
              >
                View Full Rankings
              </Link>

              {/* Decorative corner */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-black" />
            </motion.div>
          </motion.div>
        </div>

        {/* CTA Section with Parallax */}
        <motion.div
          style={{ y: yHero, opacity }}
          className="text-center"
        >
          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex items-center justify-center gap-6 mb-16"
          >
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-2 h-2 bg-white rotate-45 flex-shrink-0"
            />
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl lg:text-6xl font-black mb-6 tracking-tight text-white"
          >
            Make Your <span className="font-light">Voice</span> Count
          </motion.h3>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Join millions of voters shaping the future. Register now to cast your votes when the competition begins.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/auth/register"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-black text-sm uppercase tracking-[0.15em] hover:bg-gray-100 transition-all duration-300"
            >
              <span>Register Now</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </Link>
            
            <Link
              href="/about"
              className="group inline-flex items-center gap-3 px-10 py-5 border-2 border-white text-white font-black text-sm uppercase tracking-[0.15em] hover:bg-white hover:text-black transition-all duration-300"
            >
              <span>Learn More</span>
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-white/40 text-sm mt-10"
          >
            Voting launches soon • Stay connected for announcements
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
