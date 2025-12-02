"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function FeaturesSection() {
  const features = [
    { title: 'Vote for Contestants', description: 'Cast up to 100 votes per day for your favorite contestants. Free and premium voting options available.', animation: 'Election concept Lottie JSON animation.lottie' },
    { title: 'Daily Quizzes', description: 'Test your knowledge with exciting daily quizzes. Win points, climb leaderboards, and earn rewards.', animation: 'Funny brain.lottie' },
    { title: 'Nominate Students', description: 'Know someone amazing? Nominate talented students from your campus to join the competition.', animation: 'referral.lottie' },
    { title: 'Live Streaming', description: 'Watch the show live 18 hours daily on TikTok, Facebook, and YouTube. Never miss a moment!', animation: 'Live Streaming.lottie' },
    { title: 'Win Prizes', description: 'Compete for amazing prizes including cash, devices, bursaries, and exclusive merchandise.', animation: 'Champion.lottie' },
    { title: 'Earn Achievements', description: 'Unlock badges and achievements as you participate. Build your profile and show off your status!', animation: 'Winner.lottie' },
  ];

  const [selected, setSelected] = useState(0);
  const railRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const active = rail.querySelector<HTMLButtonElement>(`button[data-index="${selected}"]`);
    if (!active) return;
    const railRect = rail.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    const offset = activeRect.left - railRect.left - railRect.width / 2 + activeRect.width / 2;
    rail.scrollBy({ left: offset, behavior: 'smooth' });
  }, [selected]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setSelected((s) => (s - 1 + features.length) % features.length);
      if (e.key === 'ArrowRight') setSelected((s) => (s + 1) % features.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [features.length]);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">Why Join <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">R.E.S.?</span></h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Experience the ultimate student competition platform with exciting features designed for maximum engagement and entertainment.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">

          {/* Left: stacked list */}
          <div className="md:col-span-1 flex flex-col gap-4">
            {features.map((f, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`flex items-center gap-4 p-3 rounded-lg text-left transition-shadow ${i === selected ? 'shadow-xl ring-2 ring-purple-500' : 'shadow-sm hover:shadow-md'}`}
              >
                <div className="w-20 h-20 flex-shrink-0 rounded-md flex items-center justify-center">
                  <DotLottieReact src={encodeURI(`/lottie-files/${f.animation}`)} loop autoplay style={{ width: 80, height: 80, background: 'transparent' }} />
                </div>
                <div className="flex-1">
                  <div className={`font-semibold ${i === selected ? 'text-gray-900' : 'text-gray-700'}`}>{f.title}</div>
                  <div className="text-sm text-gray-500 mt-1 hidden md:block">{f.description}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Right: carousel preview */}
          <div className="md:col-span-2 flex items-center">
            <div className="w-full">
              <div className="flex flex-col items-center">

                <div className="w-full md:w-3/4 lg:w-2/3 h-80 md:h-[420px] flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div key={selected} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.35 }} className="w-full h-full flex items-center justify-center">
                      <div className="w-full h-full max-w-[820px] max-h-[420px]">
                        <DotLottieReact src={encodeURI(`/lottie-files/${features[selected].animation}`)} loop autoplay style={{ width: '100%', height: '100%', background: 'transparent' }} />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-6 w-full flex items-center justify-center gap-4">
                  <button aria-label="Previous" onClick={() => setSelected((s) => (s - 1 + features.length) % features.length)} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">‹</button>

                  <div ref={railRef} className="flex overflow-x-auto gap-3 py-2 px-1 no-scrollbar" role="list" style={{ scrollbarWidth: 'none' }}>
                    {features.map((f, i) => (
                      <button key={i} data-index={i} role="listitem" onClick={() => setSelected(i)} className={`flex-shrink-0 w-24 h-24 rounded-lg p-1 ${i === selected ? 'ring-2 ring-purple-500' : 'hover:shadow-md'} bg-white`}>
                        <DotLottieReact src={encodeURI(`/lottie-files/${f.animation}`)} loop autoplay style={{ width: '100%', height: '100%', background: 'transparent' }} />
                      </button>
                    ))}
                  </div>

                  <button aria-label="Next" onClick={() => setSelected((s) => (s + 1) % features.length)} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">›</button>
                </div>

                <div className="mt-6 text-center">
                  <h3 className="text-2xl font-semibold text-gray-900">{features[selected].title}</h3>
                  <p className="mt-2 text-gray-600 max-w-2xl mx-auto">{features[selected].description}</p>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
