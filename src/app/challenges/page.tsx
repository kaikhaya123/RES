'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function ChallengesPage() {
  const challenges = [
    {
      id: 1,
      week: 1,
      title: 'The R50 Startup Mission',
      subtitle: 'EDUCATIONAL OPPORTUNITIES',
      description: 'Complete a challenge with only R50 and prove your entrepreneurial spirit.',
      image: '/Images/man-enjoying-some-takeaway-food_imgupscaler.ai_General_8K.jpg',
      status: 'COMPLETED',
      progress: 20,
      prize: 'R5,000',
      submissions: 20,
      votes: 18901,
      daysLeft: 0
    },
    {
      id: 2,
      week: 2,
      title: 'Campus Renovation Challenge',
      subtitle: 'COMMUNITY IMPACT',
      description: 'Transform a space on your campus and document the journey.',
      image: '/Images/college-students-different-ethnicities-cramming-min.jpg',
      status: 'COMPLETED',
      progress: 20,
      prize: 'R5,000',
      submissions: 20,
      votes: 15672,
      daysLeft: 0
    },
    {
      id: 3,
      week: 3,
      title: 'Youth Innovation Pitch Battle',
      subtitle: 'DIGITAL CREATIVITY',
      description: 'Pitch your brightest idea in 60 seconds or less.',
      image: '/Images/porter-raab-Ucr4Yp-t364-unsplash.jpg',
      status: 'COMPLETED',
      progress: 20,
      prize: 'R5,000',
      submissions: 20,
      votes: 14234,
      daysLeft: 0
    },
    {
      id: 4,
      week: 4,
      title: 'TikTok Viral Social Awareness',
      subtitle: 'SOCIAL IMPACT',
      description: 'Create a viral video promoting social awareness on an issue you care about.',
      image: '/Images/sergey-zolkin-_UeY8aTI6d0-unsplash.jpg',
      status: 'COMPLETED',
      progress: 20,
      prize: 'R5,000',
      submissions: 20,
      votes: 12456,
      daysLeft: 0
    },
    {
      id: 5,
      week: 5,
      title: 'Confidence Challenge',
      subtitle: 'PERSONAL GROWTH',
      description: 'Push your boundaries: street interviews, public speaking, leadership moments.',
      image: '/Images/divaris-shirichena-GG2t77avvBY-unsplash.jpg',
      status: 'ACTIVE',
      progress: 18,
      prize: 'R5,000',
      submissions: 18,
      votes: 45670,
      daysLeft: 3
    },
    {
      id: 6,
      week: 6,
      title: 'Finale - Final Performance',
      subtitle: 'GRAND FINALE',
      description: 'Your final shot: showcase everything you\'ve learned. Any format. Go big.',
      image: '/Images/college-students-different-ethnicities-cramming%20(4).jpg',
      status: 'UPCOMING',
      progress: 0,
      prize: 'R10,000',
      submissions: 0,
      votes: 0,
      daysLeft: null
    }
  ];

  const completedCount = challenges.filter(c => c.status === 'COMPLETED').length;
  const activeChallenge = challenges.find(c => c.status === 'ACTIVE');
  const totalVotes = challenges.reduce((sum, c) => sum + c.votes, 0);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-dark-bg-soft text-white flex items-center">
        <div className="container mx-auto max-w-4xl py-24 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block px-5 py-2 border-2 border-honey-tan text-xs font-black tracking-[0.2em] text-honey-tan mb-4"
            >
              SIX WEEK SERIES
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05]"
            >
              Challenges — Coming Soon
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg text-gray-300 max-w-2xl mx-auto"
            >
              We’re preparing the weekly challenges and will announce them officially soon. Sign up to receive updates and be the first to participate.
            </motion.p>

            <div className="flex justify-center gap-4">
              <Link
                href="/subscribe"
                className="inline-flex items-center gap-2 px-8 py-4 bg-honey-tan text-black font-black uppercase tracking-wide rounded hover:bg-honey-tan-600 transition-all duration-300"
              >
                <span>Get Notified</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white font-black uppercase tracking-wide rounded hover:bg-white hover:text-black transition-all duration-300"
              >
                <span>Learn More</span>
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-warm-stone-secondary rounded-xl p-6 text-black">
                <p className="text-sm font-bold uppercase">Format</p>
                <p className="mt-2 font-black">6-week series</p>
              </div>
              <div className="bg-warm-stone-secondary rounded-xl p-6 text-black">
                <p className="text-sm font-bold uppercase">Prizes</p>
                <p className="mt-2 font-black">TBD</p>
              </div>
              <div className="bg-warm-stone-secondary rounded-xl p-6 text-black">
                <p className="text-sm font-bold uppercase">Eligibility</p>
                <p className="mt-2 font-black">Student entrants</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
