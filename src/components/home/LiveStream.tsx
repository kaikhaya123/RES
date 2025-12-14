'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Play, Radio, ArrowRight, Calendar, Users } from 'lucide-react';
import Image from 'next/image';
import { Iphone } from '../../registry/magicui/iphone';

export default function LiveStream() {
  const platforms = [
    { name: 'TikTok', image: '/Images/tiktok.png', viewers: '3.2M+' },
    { name: 'Facebook', image: '/Images/facebook.png', viewers: '1.2M+' },
    { name: 'YouTube', image: '/Images/youtube.png', viewers: '2.8M+' }
  ];

  return (
    <section className="relative py-28 lg:py-36 bg-dark-bg-soft text-white overflow-hidden">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: '90px 90px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="inline-flex items-center gap-3 px-6 py-3 border border-white/70 rounded-full mb-8"
          >
            <motion.div
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-white rounded-full"
            />
            <Radio className="w-4 h-4" />
            <span className="text-xs font-black uppercase tracking-[0.35em]">
              Live Daily
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-5xl lg:text-7xl font-black tracking-tight mb-6"
          >
            Watch Live. Vote Live.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-lg text-gray-400 max-w-3xl mx-auto"
          >
            Stream the competition in real time. Engage with contestants.
            Influence outcomes. Join South Africa’s biggest student experience.
          </motion.p>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center"
          >
            <div className="w-[320px] sm:w-[380px] lg:w-[480px]">
              <Iphone
                videoSrc="/Videos/PinDown.io_@zarooza_1764838825.mp4"
                islandSafe={{ base: 36, sm: 44, lg: 56 }}
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div>
              <h3 className="text-3xl font-black mb-4">
                Stream Everywhere
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Watch across TikTok, YouTube, and Facebook. Vote in real time.
                Join quizzes. Support your favorite contestant as the show unfolds live.
              </p>
            </div>

            {/* Platforms */}
            <div>
              <div className="text-xs font-black uppercase tracking-[0.35em] mb-4">
                Available On
              </div>
              <div className="grid grid-cols-3 gap-4">
                {platforms.map((p, i) => (
                  <motion.div
                    key={p.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="border border-white/70 p-5 text-center hover:bg-white hover:text-black transition-colors"
                  >
                    <div className="relative w-12 h-12 mx-auto mb-3">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="text-xs font-black uppercase tracking-wider">
                      {p.name}
                    </div>
                    <div className="text-xs opacity-70 mt-1">
                      {p.viewers} viewers
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="border border-white/70 p-10 mb-24"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <Calendar className="w-5 h-5" />
            <h3 className="text-xl font-black uppercase tracking-[0.35em]">
              Weekly Flow
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {['Daily Live Shows', 'Weekly Eliminations', 'Finale Event'].map(
              (item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="text-lg font-black mb-2">{item}</div>
                  <div className="text-sm text-gray-400">
                    Broadcast nationwide
                  </div>
                </motion.div>
              )
            )}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <div className="inline-block bg-white text-black p-12 max-w-3xl">
            <h3 className="text-3xl lg:text-4xl font-black mb-4">
              Stream. Vote. Influence.
            </h3>
            <p className="text-gray-700 mb-8">
              Every vote matters. Every stream counts.
              Be part of a national student movement.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/stream"
                className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white font-black uppercase text-sm hover:bg-gray-900"
              >
                <Play className="w-5 h-5" />
                Watch Live
              </Link>

              <Link
                href="/auth/register"
                className="inline-flex items-center gap-3 px-8 py-4 border-2 border-black font-black uppercase text-sm hover:bg-black hover:text-white"
              >
                Join the Show
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
