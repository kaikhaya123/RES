'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { Trophy, Users, ArrowRight, Zap, TrendingUp, Award } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

export default function Contestants() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const miniStats = [
    { value: '383', label: 'Campuses', icon: Users },
    { value: '7M+', label: 'Daily Users', icon: TrendingUp },
    { value: '1.7M', label: 'Students', icon: Award }
  ];

  // Placeholder contestants
  const contestants = [
    {
      id: 1,
      name: 'Contestant Profile',
      campus: 'University Name',
      bio: 'Future leader competing for excellence',
      trending: true
    },
    {
      id: 2,
      name: 'Contestant Profile',
      campus: 'University Name',
      bio: 'Innovative mind ready to shine',
      trending: false
    },
    {
      id: 3,
      name: 'Contestant Profile',
      campus: 'University Name',
      bio: 'Talented student making an impact',
      trending: false
    },
    {
      id: 4,
      name: 'Contestant Profile',
      campus: 'University Name',
      bio: 'Rising star in education',
      trending: false
    },
    {
      id: 5,
      name: 'Contestant Profile',
      campus: 'University Name',
      bio: 'Excellence personified',
      trending: false
    },
    {
      id: 6,
      name: 'Contestant Profile',
      campus: 'University Name',
      bio: 'Empowering the next generation',
      trending: false
    }
  ];

  return (
    <section ref={containerRef} className="relative py-40 lg:py-48 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Floating orbs background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 100, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -80, 0],
            y: [0, 80, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-40 left-20 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative z-10">
        {/* Animated Stats Bar */}
        <motion.div
          style={{ opacity }}
          className="mb-16"
        >
          <div className="flex flex-wrap justify-center gap-12 lg:gap-20">
            {miniStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="group relative"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className="relative">
                      <motion.div
                        animate={{
                          rotate: 360,
                          scale: [1, 1.1, 1]
                        }}
                        transition={{
                          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                      />
                      <Icon className="w-8 h-8 text-gray-800 relative z-10" strokeWidth={1.5} />
                    </div>
                    <div className="text-5xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500 uppercase tracking-[0.2em] font-semibold">
                      {stat.label}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Hero Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24 relative"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-full border border-purple-500/20 mb-8"
          >
            <Zap className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-bold text-purple-600 uppercase tracking-wider">Coming Soon</span>
          </motion.div>

          <h2 className="text-6xl lg:text-8xl font-black tracking-tight mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 bg-clip-text text-transparent">
              Meet Your
            </span>
            <br />
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative inline-block"
            >
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                Stars
              </span>
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
                className="absolute -inset-4 bg-gradient-to-r from-purple-400 to-pink-400 blur-2xl -z-10"
              />
            </motion.span>
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            Discover talented students competing nationwide. Support your favorites and watch them shine.
          </motion.p>
        </motion.div>

        {/* Modern Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {contestants.map((contestant, index) => (
            <motion.div
              key={contestant.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: [0.25, 0.4, 0.25, 1]
              }}
              className="group relative"
            >
              {/* Floating card */}
              <motion.div
                whileHover={{ 
                  y: -12,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className={`relative bg-white rounded-3xl overflow-hidden ${
                  contestant.trending 
                    ? 'ring-2 ring-purple-500 shadow-2xl shadow-purple-500/20' 
                    : 'ring-1 ring-gray-200 shadow-xl shadow-gray-200/50'
                }`}
              >
                {/* Trending indicator */}
                {contestant.trending && (
                  <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="absolute top-6 left-0 z-20 flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-r-full text-xs font-black uppercase tracking-wider"
                  >
                    <Zap className="w-3 h-3 fill-white" />
                    Trending
                  </motion.div>
                )}

                {/* Image Area */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  {/* Gradient mesh background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
                    <motion.div
                      animate={{
                        backgroundPosition: ['0% 0%', '100% 100%'],
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "linear"
                      }}
                      className="absolute inset-0 opacity-50"
                      style={{
                        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.2) 0%, transparent 50%)',
                        backgroundSize: '100% 100%'
                      }}
                    />
                  </div>

                  {/* Placeholder icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                        rotate: [0, 5, 0, -5, 0]
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Users className="w-24 h-24 text-gray-300" strokeWidth={1} />
                    </motion.div>
                  </div>

                  {/* Shimmer effect on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full"
                    whileHover={{ x: '200%' }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-black text-gray-900 mb-1 tracking-tight">
                    {contestant.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                    <p className="text-sm text-gray-500 font-semibold">
                      {contestant.campus}
                    </p>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {contestant.bio}
                  </p>

                  {/* Vote button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 p-[2px] group/btn"
                    disabled
                  >
                    <div className="relative bg-white rounded-2xl px-6 py-4 group-hover/btn:bg-transparent transition-colors duration-300">
                      <span className="relative z-10 flex items-center justify-center gap-2 text-sm font-black uppercase tracking-wider bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent group-hover/btn:text-white transition-colors duration-300">
                        <Trophy className="w-4 h-4" />
                        Vote Soon
                      </span>
                    </div>
                  </motion.button>
                </div>

                {/* Hover glow */}
                <motion.div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'radial-gradient(circle at 50% 0%, rgba(147, 51, 234, 0.15), transparent 50%)'
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Modern CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-[2rem] blur-2xl opacity-20" />
          
          <div className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 rounded-[2rem] p-12 lg:p-16 overflow-hidden">
            {/* Animated gradient overlay */}
            <motion.div
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: 'linear-gradient(45deg, transparent 30%, rgba(147, 51, 234, 0.3) 50%, transparent 70%)',
                backgroundSize: '200% 200%'
              }}
            />

            <div className="relative z-10 text-center">
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
                className="inline-block mb-8"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center rotate-45">
                  <Trophy className="w-10 h-10 text-white -rotate-45" />
                </div>
              </motion.div>

              <h3 className="text-4xl lg:text-6xl font-black text-white mb-6 tracking-tight">
                Be Part of the<br />
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Revolution
                </span>
              </h3>

              <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                Register now and be first in line when voting opens. Your support can change a student's future.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/auth/register"
                    className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black text-sm uppercase tracking-[0.15em] rounded-full overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500"
                      initial={{ x: '100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10">Register Now</span>
                    <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-3 px-10 py-5 bg-white/10 backdrop-blur-sm text-white font-black text-sm uppercase tracking-[0.15em] rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    <span>Learn More</span>
                  </Link>
                </motion.div>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-gray-400 text-sm mt-10"
              >
                🎯 Contestants launching soon • Stay tuned for announcements
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-[0.015]">
        <motion.div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '40px 40px']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative">
        {/* Mini Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap justify-center gap-8 lg:gap-16 mb-20"
        >
          {miniStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl lg:text-4xl font-black text-black mb-1">{stat.value}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          {/* Floating stars decoration */}
          <div className="relative inline-block mb-6">
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-8 -left-8"
            >
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            </motion.div>
            <motion.div
              animate={{
                rotate: [360, 0],
                scale: [1, 1.3, 1]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute -top-4 -right-10"
            >
              <Sparkles className="w-5 h-5 text-yellow-400" />
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl lg:text-8xl font-black tracking-tighter"
            >
              Your <span className="italic font-light bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 bg-clip-text text-transparent">Stars</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            Discover the talented students competing nationwide and support your favourites.
          </motion.p>
        </motion.div>

        {/* Contestant Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {contestants.map((contestant, index) => (
            <motion.div
              key={contestant.id}
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.05,
                y: -10,
                transition: { duration: 0.3 }
              }}
              className={`relative bg-white border-2 ${contestant.trending ? 'border-yellow-400 shadow-xl shadow-yellow-400/20' : 'border-gray-200'} rounded-2xl overflow-hidden group cursor-pointer`}
            >
              {/* Trending badge */}
              {contestant.trending && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.5 + index * 0.1,
                    type: "spring",
                    stiffness: 200
                  }}
                  className="absolute top-4 right-4 z-20 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1"
                >
                  <Star className="w-3 h-3 fill-black" />
                  Trending
                </motion.div>
              )}

              {/* Image placeholder */}
              <div className="relative aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                {/* Animated gradient overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-orange-400/20 to-yellow-500/20"
                  animate={{
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Placeholder icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Users className="w-20 h-20 text-gray-300" strokeWidth={1} />
                  </motion.div>
                </div>

                {/* Badge overlay */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold"
                >
                  {contestant.badge}
                </motion.div>
              </div>

              {/* Card content */}
              <div className="p-6">
                <h3 className="text-2xl font-black text-black mb-1 tracking-tight">{contestant.name}</h3>
                <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-3">{contestant.campus}</p>
                <p className="text-gray-600 leading-relaxed text-sm mb-4">{contestant.bio}</p>
                
                {/* Vote placeholder button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-black text-white font-black text-xs uppercase tracking-[0.15em] rounded-lg hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center gap-2"
                  disabled
                >
                  <Trophy className="w-4 h-4" />
                  Vote Coming Soon
                </motion.button>
              </div>

              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/10 to-transparent" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto bg-gradient-to-br from-black to-gray-900 rounded-3xl p-12 lg:p-16 relative overflow-hidden"
        >
          {/* Animated background stars */}
          <motion.div
            animate={{
              rotate: 360
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0 opacity-10"
          >
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full" />
            <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-yellow-400 rounded-full" />
            <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-yellow-400 rounded-full" />
            <div className="absolute top-1/3 right-1/2 w-1 h-1 bg-yellow-400 rounded-full" />
          </motion.div>

          <div className="relative z-10">
            <motion.div
              animate={{
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="inline-block mb-6"
            >
              <Star className="w-12 h-12 text-yellow-400 fill-yellow-400 mx-auto" />
            </motion.div>

            <h3 className="text-4xl lg:text-5xl font-black text-white mb-6 tracking-tight">
              Ready to <span className="italic font-light text-yellow-400">Join</span> the Show?
            </h3>
            
            <p className="text-lg text-white/80 mb-10 leading-relaxed">
              Register now and be the first to vote when contestants are announced. Your support can change lives.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/auth/register"
                  className="group inline-flex items-center gap-3 px-10 py-5 bg-yellow-400 text-black font-black text-sm uppercase tracking-[0.15em] rounded-full hover:bg-yellow-300 transition-all duration-300 shadow-lg shadow-yellow-400/30"
                >
                  <span>Register & Vote</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-3 px-10 py-5 border-2 border-white/30 text-white font-black text-sm uppercase tracking-[0.15em] rounded-full hover:bg-white/10 transition-all duration-300"
                >
                  <span>Learn More</span>
                  <Sparkles className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-white/50 text-sm mt-8"
            >
              Contestants will be announced soon. Stay tuned!
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
