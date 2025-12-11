'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Play, Users, Radio, ArrowRight, Calendar } from 'lucide-react';
import Image from 'next/image';
// Update the import path to the correct relative location, for example:
import { Iphone } from '../../registry/magicui/iphone';
// Or, if the file does not exist, create 'src/registry/magicui/iphone.tsx' and export the Iphone component from there.
// LiveCounter removed while backend is not connected; numeric placeholders used instead.

export default function LiveStream() {
  const platforms = [
    { name: 'TikTok', image: '/Images/tiktok.png', viewers: 3200000 },
    { name: 'Facebook', image: '/Images/facebook.png',  viewers: 1200000 },
    { name: 'YouTube', image: '/Images/youtube.png', viewers: 2800000 }
  ];
  return (
    <section className="relative py-32 lg:py-40 bg-dark-bg-soft text-white overflow-hidden">
      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
          style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
          }}
        />
      
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative z-10">
        {/* Header with Decorative Elements */}
        <div className="text-center mb-20">
          {/* Live Badge */}
                <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring" }}
            className="inline-flex items-center gap-3 px-6 py-3 border-2 border-white rounded-full mb-8"
          >
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-white rounded-full"
            />
            <Radio className="w-4 h-4" />
            <span className="text-sm font-black uppercase tracking-[0.3em]">Live 18 Hours Daily</span>
            </motion.div>

          {/* Decorative Top Line with Diamond */}
          <div className="flex items-center justify-center gap-8 mb-8">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-[2px] w-32 bg-white origin-right"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-2 h-2 bg-white rotate-45"
            />
              <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-[2px] w-32 bg-white origin-left"
            />
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl lg:text-7xl font-black tracking-tighter mb-6 text-white section-title"
          >
            Watch Live & Engage
          </motion.h2>

          <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Join millions of viewers in real-time as we stream 18 hours daily across TikTok, Facebook, and YouTube. Vote for your favorites, join daily quizzes, and be part of South Africa's biggest student reality show.
          </motion.p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Left: iPhone Placeholder Only */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex items-center justify-center"
          >
            <div className="w-[320px] sm:w-[360px] lg:w-[480px]">
              <Iphone 
                videoSrc="/Videos/PinDown.io_@zarooza_1764838825.mp4" 
                islandSafe={{ base: 36, sm: 44, lg: 56 }}
              />
            </div>
          </motion.div>

          {/* Right: Content & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Mission Statement */}
            <div>
              <h3 className="text-3xl font-black tracking-tighter mb-4 text-white">
                Stream Everywhere, Engage Instantly
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Experience the show live on your favorite platform. Whether you're on TikTok scrolling through campus life, 
                watching YouTube with friends, or following on Facebook — we're streaming 18 hours daily to bring you 
                non-stop entertainment, voting opportunities, and interactive quizzes with real prizes.
              </p>
            </div>
            {/* Platform Badges */}
            <div>
              <div className="text-sm font-black uppercase tracking-[0.3em] mb-4 text-white">
                Watch On
              </div>
              <div className="grid grid-cols-3 gap-3">
                {platforms.map((platform, index) => (
                  <motion.div
key={platform.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="relative border-2 border-white p-4 text-center group hover:bg-white hover:text-black transition-colors cursor-pointer"
                  >
                    {/* Corner Decoration */}
                      {/* corner decorations removed */}
                    
                    {/* Platform Icon/Image */}
                    <div className="relative w-12 h-12 mx-auto mb-2">
                    <Image
                      src={platform.image}
                      alt={`${platform.name} icon`}
                      fill
                      className="object-contain"
                    />
</div>
                    
                    <div className="text-xs font-black uppercase tracking-wider">{platform.name}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Schedule Section */}
        <motion.div
initial={{ opacity: 0, y: 40 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
          transition={{ duration: 0.8 }}
className="border-2 border-white p-12 mb-20"
>
          <div className="flex items-center justify-center gap-3 mb-8">
            <Calendar className="w-6 h-6" />
            <h3 className="text-2xl font-black uppercase tracking-[0.3em]">Live Schedule</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Daily Show', time: '', desc: '' },
              { title: 'Elimination Round', time: '', desc: '' },
              { title: 'Grand Finale', time: '', desc: '' }
            ].map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
>
                <div className="text-xl font-black mb-2">{event.title}</div>
                <div className="text-gray-400 mb-2">{event.time}</div>
                <div className="text-sm text-gray-500">{event.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
initial={{ opacity: 0, y: 40 }}
whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
transition={{ duration: 0.8 }}
className="text-center"
>
          <div className="inline-block border-2 border-black p-12 max-w-3xl">
            <h3 className="text-3xl lg:text-4xl font-black tracking-tighter mb-4">
Stream, Vote, Win — All at Once
</h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Every show is a shared national event connecting students and fans across South Africa. 
              Don't just watch — participate, influence outcomes, and win prizes while supporting your favorites.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
href="/stream"
className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white font-black text-sm uppercase tracking-wider hover:bg-warm-stone-base hover:text-black border-2 border-black transition-colors"
>
                <Play className="w-5 h-5" />
                  <span>Watch Live Now</span>
              </Link>
</motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
href="/auth/register"
className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white font-black text-sm uppercase tracking-wider border-2 border-black hover:bg-white hover:text-black transition-colors"
                >
                  <span>Join & Compete</span>
<ArrowRight className="w-5 h-5" />
              </Link>
</motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
