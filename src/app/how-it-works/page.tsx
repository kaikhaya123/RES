'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Navbar />

      <main className="flex-1">
        {/* HERO */}
        <section className="relative px-6 lg:px-12 pt-32 md:pt-40 pb-24 md:pb-32 overflow-hidden bg-gradient-to-b from-brand-yellow/10 to-black">
          <motion.div className="relative z-10 max-w-5xl">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight mb-8"
            >
              How R.E.S.
              <br />
              <span className="text-brand-yellow">Works</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg lg:text-xl text-white/70 max-w-3xl leading-relaxed"
            >
              A transparent system designed for fair competition, meaningful engagement, and real impact.
            </motion.p>
          </motion.div>
        </section>

        {/* RECRUITMENT PROCESS */}
        <section className="px-6 lg:px-12 py-24 md:py-32 bg-white/[0.02] border-y border-white/10">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 md:mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4">3-Phase Recruitment</h2>
              <p className="text-lg text-white/60">How we select the 24 exceptional contestants</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
              {[
                {
                  phase: '01',
                  title: 'Application & Nomination',
                  points: [
                    'Individuals apply directly',
                    'Nominations from community leaders accepted',
                    'Open to all tertiary students nationally',
                    'Must accept nomination to proceed'
                  ]
                },
                {
                  phase: '02',
                  title: 'Video + Votes',
                  points: [
                    '2-minute introduction video',
                    'Minimum 1,000 supporting votes required',
                    'Votes from registered verified accounts',
                    ' Demonstrates community backing'
                  ]
                },
                {
                  phase: '03',
                  title: 'Final Selection',
                  points: [
                    'Top 100 candidates publicized',
                    'Public voting for final 20',
                    '10 male + 10 female finalists',
                    'Integrity ensured through verification'
                  ]
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-8 md:p-10 rounded-xl hover:border-brand-yellow/50 transition-all duration-300"
                >
                  <p className="text-brand-yellow text-4xl font-black mb-5">{item.phase}</p>
                  <h3 className="text-2xl md:text-3xl font-black mb-8 leading-tight">{item.title}</h3>
                  <ul className="space-y-4">
                    {item.points.map((point, i) => (
                      <li key={i} className="flex gap-4 items-start">
                        <CheckCircle className="w-6 h-6 text-brand-yellow flex-shrink-0 mt-0.5" />
                        <span className="text-white/80 leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* VOTING SYSTEM */}
        <section className="px-6 lg:px-12 py-24 md:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 md:mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4">Daily Voting & Engagement</h2>
              <p className="text-lg text-white/60">How the community shapes the competition</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl font-black mb-10 text-brand-yellow">How Voting Works</h3>
                <div className="space-y-8">
                  {[
                    { label: 'Daily Allowance', value: '100 votes per user per day' },
                    { label: 'Voting Categories', value: 'Favourite contestant, daily challenges, behavioural points' },
                    { label: 'Verification', value: 'Basic registration prevents spam & ensures integrity' },
                    { label: 'Impact', value: 'Votes directly influence evictions, immunity, and awards' }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="border-l-4 border-brand-yellow pl-6 pb-8"
                    >
                      <p className="text-xs text-white/60 uppercase tracking-widest font-black mb-2">{item.label}</p>
                      <p className="text-lg lg:text-xl text-white leading-relaxed">{item.value}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl font-black mb-10 text-brand-yellow">Engagement Beyond Voting</h3>
                <div className="space-y-8">
                  {[
                    { activity: 'Weekly Competitions', reward: 'Promotional merchandise & prizes' },
                    { activity: 'Monthly Challenges', reward: 'Vouchers & exclusive rewards' },
                    { activity: 'Ultimate Competitions', reward: 'Cars, bursaries, house renovations' },
                    { activity: 'Provincial Pools', reward: 'Regional balance & fair opportunities' }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="border-l-4 border-white/20 pl-6 pb-8 hover:border-brand-yellow transition-colors duration-300"
                    >
                      <p className="text-lg lg:text-xl font-black text-white mb-2">{item.activity}</p>
                      <p className="text-white/70 leading-relaxed">{item.reward}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* HOUSE OPERATIONS */}
        <section className="px-6 lg:px-12 py-24 md:py-32 bg-white/[0.02] border-y border-white/10">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 md:mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4">Life in the House</h2>
              <p className="text-lg text-white/60">24/7 experience, structured yet organic</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl md:text-3xl font-black mb-10">Daily Structure</h3>
                <ul className="space-y-5">
                  {[
                    'Group morning exercise (healthy lifestyle)',
                    'Daily challenges & games (character building)',
                    'Communal meals & bonding activities',
                    'Live interaction with viewers',
                    'Voting on daily performances',
                    'Evening reflection & discussion'
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <div className="w-2.5 h-2.5 bg-brand-yellow rounded-full mt-2 flex-shrink-0" />
                      <span className="text-white/80 text-lg leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-2xl md:text-3xl font-black mb-10">House Facilities</h3>
                <ul className="space-y-5">
                  {[
                    'Bedrooms (2-4 contestants each)',
                    'Kitchen & dining area',
                    'Relaxation lounge',
                    'Gym & fitness equipment',
                    'Garden space',
                    'Shared bathrooms',
                    'Isolation room for mentoring',
                    'Emotions room (mental health support)'
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <div className="w-2.5 h-2.5 bg-brand-yellow rounded-full mt-2 flex-shrink-0" />
                      <span className="text-white/80 text-lg leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* EVICTION MODEL */}
        <section className="px-6 lg:px-12 py-24 md:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 md:mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4">Eviction Isn't Elimination</h2>
              <p className="text-lg text-white/60">Every exit is a learning opportunity</p>
            </div>
            
            <div className="bg-gradient-to-br from-brand-yellow/20 to-brand-yellow/5 border border-brand-yellow/30 p-8 md:p-12 rounded-xl mb-16">
              <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                When contestants are evicted, they don't go home—they transition to the Leadership House. This is a critical innovation: eviction becomes an opportunity for intensive leadership development.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  stage: 'Week 1-2',
                  evicted: '0',
                  description: 'Building foundation & bonds'
                },
                {
                  stage: 'Week 3',
                  evicted: '2',
                  description: 'Leadership challenges begin'
                },
                {
                  stage: 'Week 4',
                  evicted: '3',
                  description: 'Innovation & creativity tested'
                },
                {
                  stage: 'Week 5',
                  evicted: '4',
                  description: 'Pitch immunity available'
                },
                {
                  stage: 'Week 6 Day 4',
                  evicted: '5',
                  description: 'Semi-finals to finals'
                },
                {
                  stage: 'Grand Finale',
                  evicted: '6 Finalists',
                  description: 'Ultimate victory event'
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white/5 border border-white/10 p-8 rounded-xl text-center hover:border-brand-yellow/50 transition-all duration-300"
                >
                  <p className="text-xs text-white/60 mb-3 uppercase tracking-widest font-black">{item.stage}</p>
                  <p className="text-4xl font-black text-brand-yellow mb-4">{item.evicted}</p>
                  <p className="text-white/70 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 lg:px-12 py-24 md:py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">Ready to Understand the Full Picture?</h2>
            <p className="mx-auto mb-12 max-w-2xl text-lg text-white/70 leading-relaxed">
              Now that you know how it works, register or learn about the real student crises we're addressing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center gap-3 bg-brand-yellow px-10 md:px-12 py-5 text-base font-black uppercase tracking-widest text-black hover:bg-yellow-300 transition-all duration-300 rounded-lg"
              >
                Register Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/student-crisis"
                className="inline-flex items-center justify-center gap-3 border-2 border-brand-yellow px-10 md:px-12 py-5 text-base font-black uppercase tracking-widest text-white hover:bg-brand-yellow hover:text-black transition-all duration-300 rounded-lg"
              >
                Student Crisis Hub
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
