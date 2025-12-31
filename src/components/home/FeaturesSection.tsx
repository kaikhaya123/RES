'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

type Service = {
  id: number;
  title: string;
  description: string;
  image: string;
};

const services: Service[] = [
  {
    id: 1,
    title: 'Vote & Influence',
    description: 'Real-time voting that directly shapes outcomes.',
    image: '/Images/VOTE%20(1).jpg',
  },
  {
    id: 2,
    title: 'Watch Live',
    description: 'Experience every moment as it happens.',
    image: '/Images/medium-shot-woman-holding-remote.jpg',
  },
  {
    id: 3,
    title: 'Daily Challenges',
    description: 'Compete, score points, and climb the leaderboard.',
    image: '/Images/teenager-spending-time-together-outdoors.jpg',
  },
  {
    id: 4,
    title: 'Refer Leaders',
    description: 'Nominate exceptional students for recognition.',
    image: '/Images/KSENIIA%20FAST.png',
  },
  {
    id: 5,
    title: 'Test Knowledge',
    description: 'Answer quizzes. Win advantages.',
    image: '/Images/college-students-different-ethnicities-cramming (2)-min.jpg',
  },
  {
    id: 6,
    title: 'Earn Rewards',
    description: 'Bursaries, exposure, and opportunities.',
    image: '/Images/portrait-young-woman-with-curly-hair-min.jpg',
  },
];

export default function ServiceHoverReveal() {
  const [active, setActive] = useState<Service | null>(services[0]);

  return (
    <section className="w-full py-16 px-6 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Your Impact Starts Here
          </h2>
          <p className="text-gray-700 max-w-2xl">
            Hover to explore how participation turns into progress.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* LEFT LIST */}
          <div className="space-y-2">
            {services.map(service => (
              <button
                key={service.id}
                onMouseEnter={() => setActive(service)}
                onFocus={() => setActive(service)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  active?.id === service.id
                    ? 'border-black bg-black/5'
                    : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <h3 className="font-bold text-lg">{service.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {service.description}
                </p>
              </button>
            ))}
          </div>

          {/* RIGHT PREVIEW */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl min-h-[420px]">
            <AnimatePresence mode="wait">
              {active && (
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="absolute inset-0"
                >
                  <Image
                    src={active.image}
                    alt={active.title}
                    fill
                    className="object-cover"
                    priority
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h4 className="text-3xl font-black mb-2">
                      {active.title}
                    </h4>
                    <p className="text-white/90 max-w-md">
                      {active.description}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Accent frame */}
            <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-white/40 rounded-tr-xl pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
