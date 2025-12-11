'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Trophy, Users, ArrowRight, Clock } from 'lucide-react';
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
      image: '/Images/college-students-different-ethnicities-cramming (4).jpg',
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
      <main className="min-h-screen bg-dark-bg-soft text-white">
        {/* HERO SECTION */}
        <section className="relative py-24 lg:py-32 overflow-hidden px-6 lg:px-12">
          <div className="absolute inset-0 opacity-[0.02]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
                backgroundSize: '60px 60px'
              }}
            />
          </div>

          <div className="container mx-auto max-w-7xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block px-5 py-2 border-2 border-brand-yellow text-xs font-black tracking-[0.2em] text-brand-yellow mb-8"
              >
                SIX WEEK SERIES
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-5xl lg:text-7xl font-black tracking-tighter mb-6 leading-[1.1]"
              >
                The Weekly Challenge Series
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-lg text-gray-300 max-w-2xl mx-auto mb-8"
              >
                6 Weeks. 6 Challenges. 20 Contestants. 1 Champion.
              </motion.p>

              {/* Progress Bar */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="max-w-md mx-auto"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold">Season Progress</span>
                  <span className="text-sm text-gray-400">{completedCount}/6 Completed</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(completedCount / 6) * 100}%` }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="h-full bg-brand-yellow"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="relative py-16 px-6 lg:px-12 container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Trophy, label: 'Challenges Completed', value: completedCount, unit: '/6' },
              { icon: Users, label: 'Contestants', value: 20, unit: 'Total' },
              { icon: Clock, label: 'Total Public Votes', value: totalVotes.toLocaleString(), unit: '' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-warm-stone-secondary rounded-xl p-8 text-black"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-brand-yellow rounded-lg flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-black" />
                  </div>
                  <p className="text-sm font-bold text-gray-600 uppercase tracking-wide">{stat.label}</p>
                </div>
                <div className="text-4xl font-black">{stat.value}</div>
                <p className="text-sm text-gray-600 mt-2">{stat.unit}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CHALLENGES GRID */}
        <section className="relative py-24 px-6 lg:px-12">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-4">All Challenges</h2>
              <p className="text-gray-300 text-lg">Explore each week's challenge, submissions, and standings.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {challenges.map((challenge, index) => (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group bg-warm-stone-secondary rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-gray-300">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full"
                    >
                      <img
                        src={challenge.image}
                        alt={challenge.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>

                    {/* Status Badge */}
                    <div className="absolute top-4 right-4 bg-black/70 text-white px-4 py-2 rounded-full text-xs font-black uppercase">
                      {challenge.status}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 text-black">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-black uppercase tracking-widest text-gray-500">
                        {challenge.subtitle}
                      </span>
                    </div>

                    <h3 className="text-xl font-black mb-3 text-black">{challenge.title}</h3>

                    <p className="text-sm text-gray-600 mb-6 line-clamp-2">{challenge.description}</p>

                    {/* Stats */}
                    <div className="space-y-3 border-t border-warm-stone-border pt-4 mb-6">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-bold">Submissions:</span>
                        <span className="font-black text-black">
                          {challenge.submissions}/20
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-bold">Public Votes:</span>
                        <span className="font-black text-black">
                          {challenge.votes.toLocaleString()}
                        </span>
                      </div>
                      {challenge.daysLeft !== null && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-bold">Days Left:</span>
                          <span className="font-black text-brand-yellow">{challenge.daysLeft}d</span>
                        </div>
                      )}
                    </div>

                    {/* CTA Button */}
                    <Link
                      href={`/challenges/${challenge.id}`}
                      className="w-full bg-brand-yellow text-black py-3 rounded font-black text-sm uppercase tracking-wide hover:bg-yellow-400 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <span>View Challenge</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ACTIVE CHALLENGE HIGHLIGHT */}
        {activeChallenge && (
          <section className="relative py-24 px-6 lg:px-12 bg-charcoal-blue-dark">
            <div className="container mx-auto max-w-7xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <div className="inline-block px-5 py-2 border-2 border-brand-yellow text-xs font-black tracking-[0.2em] text-brand-yellow mb-8">
                  HAPPENING NOW
                </div>

                <h2 className="text-4xl lg:text-5xl font-black mb-4">
                  {activeChallenge.title}
                </h2>

                <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
                  {activeChallenge.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href={`/challenges/${activeChallenge.id}`}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-brand-yellow text-black font-black uppercase tracking-wide rounded hover:bg-yellow-400 transition-all duration-300"
                  >
                    <span>View Active Challenge</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    href="/dashboard/challenges"
                    className="inline-flex items-center gap-2 px-8 py-4 border-2 border-brand-yellow text-brand-yellow font-black uppercase tracking-wide rounded hover:bg-brand-yellow hover:text-black transition-all duration-300"
                  >
                    <span>My Submission</span>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
