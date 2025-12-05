'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { Trophy, Users, ArrowRight, Calendar, Sparkles, Award } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

export default function Contestants() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const yHero = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const yParticles = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const stats = [
    { icon: Users, value: '40', label: 'Contestants', sublabel: 'National Showcase' },
    { icon: Calendar, value: 'TBA', label: 'Competition Start', sublabel: 'Registration Coming Soon' },
    { icon: Trophy, value: 'R50K+', label: 'Prize Pool', sublabel: 'Scholarships & Rewards' }
  ];

  const galleryImages = [
    { src: '/Images/sergey-zolkin-_UeY8aTI6d0-unsplash.jpg', caption: 'Student Energy', span: 'row-span-2' },
    { src: '/Images/download (9) (1).jpg', caption: 'Campus Life', span: 'row-span-1' },
    { src: '/Images/pexels-cottonbro-5081915.jpg', caption: 'Competition Spirit', span: 'row-span-1' }
  ];

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-black text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative">
        {/* Two-Column Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          
          {/* Left: Hero Image */}
          <motion.div
            style={{ y: yHero }}
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative group"
          >
            <div className="relative aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden">
              {/* Image Container */}
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900">
                <Image 
                  src="/Images/Silhouettes_2.jpg"
                  alt="Featured Students"
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Pixel Grid Reveal Overlay */}
              <motion.div
                initial={{ opacity: 1 }}
                whileInView={{ opacity: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(
                      0deg,
                      #000 0px,
                      #000 20px,
                      transparent 20px,
                      transparent 40px
                    ),
                    repeating-linear-gradient(
                      90deg,
                      #000 0px,
                      #000 20px,
                      transparent 20px,
                      transparent 40px
                    )
                  `,
                  backgroundSize: '40px 40px'
                }}
              >
                {/* Animated Pixel Blocks */}
                <div className="absolute inset-0 grid grid-cols-8 grid-rows-12">
                  {[...Array(96)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 1, scale: 1 }}
                      whileInView={{ opacity: 0, scale: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.3 + (i * 0.01),
                        ease: "easeOut"
                      }}
                      className="bg-black"
                    />
                  ))}
                </div>
              </motion.div>

              {/* White Glow on Hover */}
              <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/30 rounded-2xl transition-all duration-500" />

              {/* Static Labels */}
              <div className="absolute top-4 right-4 md:top-6 md:right-6 px-3 py-1.5 md:px-4 md:py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg">
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider">Coming Soon</span>
              </div>

              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 px-3 py-1.5 md:px-4 md:py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg">
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider">40 Contestants</span>
              </div>

              <div className="absolute top-1/2 left-4 md:left-6 px-3 py-1.5 md:px-4 md:py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg">
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider">National Showcase</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Headline */}
            <h2 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.95]"
              style={{
                background: 'url(/Images/Glass_hands.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
                textShadow: 'none',
                willChange: 'transform'
              } as React.CSSProperties}
            >
              Meet the Contestants
            </h2>

            {/* Subtext */}
            <p className="text-base md:text-lg text-white/70 leading-relaxed">
              South Africa's brightest students will appear here soon — competing for scholarships, recognition, and opportunities that change lives.
            </p>

            {/* Stats Blocks (Stacked) */}
            <div className="space-y-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/10 rounded-lg flex-shrink-0">
                    <stat.icon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xl md:text-2xl font-black">{stat.value}</div>
                    <div className="text-xs md:text-sm text-white/60">{stat.label}</div>
                  </div>
                  <div className="text-xs text-white/40 hidden sm:block flex-shrink-0">{stat.sublabel}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h3 className="text-2xl md:text-3xl font-black mb-4 tracking-tight">
            Be Part of the Journey
          </h3>
          
          <p className="text-sm md:text-base text-white/60 mb-8 md:mb-10">
            Register now to get early access when contestants are announced and voting opens.
          </p>
          
          {/* Primary CTA */}
          <Link
            href="/auth/register"
            className="group inline-flex items-center gap-2 md:gap-3 px-6 md:px-10 py-4 md:py-5 bg-white text-black font-black text-xs md:text-sm uppercase tracking-[0.15em] rounded-full hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-500 mb-6"
          >
            <span className="whitespace-nowrap">Register to Get Early Access</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </Link>

          {/* Secondary Link */}
          <div>
            <Link
              href="/about"
              className="text-sm text-white/50 hover:text-white transition-colors underline"
            >
              Learn about the competition
            </Link>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white/30 text-xs mt-12"
          >
            Competition details and contestant announcements coming soon
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
