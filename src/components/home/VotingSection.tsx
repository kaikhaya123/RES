'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import FlipCards from './FlipCards';

export default function VotingSection() {
  const contestants = [
    {
      id: 1,
      image: '/Images/medium-shot-man-with-afro-hairstyle.jpg',
      name: 'Contestant 1',
      votes: 0,
      rank: 1
    },
    {
      id: 2,
      image: '/Images/medium-shot-smiley-man-work-min.jpg',
      name: 'Contestant 2',
      votes: 0,
      rank: 2
    },
    {
      id: 3,
      image: '/Images/young-beautiful-lady-with-dark-curly-hair-khaki-shirt-holding-laptop-with-notepad-cup-coffee-go-hands-dreamily-looking-camera-isolated-min.jpg',
      name: 'Contestant 3',
      votes: 0,
      rank: 3
    },
    {
      id: 4,
      image: '/Images/portrait-young-beautiful-woman-min.jpg',
      name: 'Contestant 4',
      votes: 0,
      rank: 4
    }
  ];

  return (
    <section className="relative bg-black text-white py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT */}
            <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h2 className="text-4xl lg:text-5xl font-black leading-tight">
            Vote for Your
            <span className="block text-brand-yellow">Favorite Contestant</span>
          </h2>

          <p className="text-lg text-white/70 max-w-lg">
            Your daily vote shapes the leaderboard. Support talent. Support growth.
          </p>

          <Link
            href="/auth/register"
            className="inline-flex items-center gap-3 bg-brand-yellow text-black px-8 py-4 font-black uppercase tracking-wider text-sm"
          >
            Start Voting
            <ArrowRight className="w-4 h-4" />
          </Link>

          <p className="text-sm text-white/40">
            One vote per day. Resets daily.
          </p>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="flex flex-col items-center justify-center"
        >
          <p className="mb-6 text-center text-white/60 max-w-md">
            Drag cards up or down to explore contestants.
          </p>

          <div className="w-full max-w-[460px] flex items-center justify-center">
            <FlipCards cards={contestants} />
</div>

          <Link
            href="/contestants"
className="mt-6 text-sm text-white/40 hover:text-white transition"
          >
            View all contestants
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
