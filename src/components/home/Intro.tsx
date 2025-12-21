'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { FiArrowDown } from 'react-icons/fi';

export default function IntroSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative min-h-[100vh] md:min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-black overflow-hidden">

      {/* LEFT VISUAL */}
      <div className="relative h-[45vh] md:h-[55vh] lg:h-screen overflow-hidden">
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover scale-[1.15]"
        >
          <source src="/Videos/14595546-hd_1920_1080_60fps.mp4" type="video/mp4" />
        </video>

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />
        <div className="absolute inset-0 bg-black/40" />

        {/* Subtle edge glow */}
        <div className="absolute inset-y-0 right-0 w-px bg-brand-yellow/30 hidden lg:block" />

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-white/60"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        >
          <span className="text-[10px] font-bold tracking-[0.35em] uppercase">
            Scroll
          </span>
          <FiArrowDown className="w-5 h-5" />
        </motion.div>
      </div>

      {/* RIGHT CONTENT */}
      <div className="relative z-10 flex items-center px-6 py-16 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="max-w-2xl space-y-8"
        >

          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-brand-yellow" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-yellow">
              National Student Reality Show
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl lg:text-5xl font-black text-white leading-[1.05] tracking-tight">
            The Future of
            <br />
            Student Competition
            <br />
            Starts Here
          </h1>

          {/* Core statement */}
          <p className="text-sm lg:text-base text-white/75 leading-relaxed max-w-md">
            Twenty students. One national stage.  
            Real challenges, real growth, real opportunity.
          </p>

          {/* Proof blocks */}
          <div className="space-y-6 pt-6 border-l border-white/10 pl-6">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wide">
                For Students
              </h3>
              <p className="text-sm text-white/65 mt-1 max-w-sm">
                Compete, build visibility, unlock opportunities, and grow beyond campus.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wide">
                For South Africa
              </h3>
              <p className="text-sm text-white/65 mt-1 max-w-sm">
                A movement that celebrates youth, talent, innovation, and unity.
              </p>
            </div>
          </div>

          {/* CTA */}
          <motion.a
            href="#participate"
            whileHover={{ x: 6 }}
            className="inline-flex items-center gap-3 text-sm font-bold tracking-wide text-white group pt-4"
          >
            Discover Your Role
            <span className="w-8 h-px bg-brand-yellow transition-all group-hover:w-12" />
          </motion.a>

        </motion.div>
      </div>
    </section>
  );
}
