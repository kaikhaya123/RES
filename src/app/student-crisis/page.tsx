'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowRight, TrendingUp } from 'lucide-react';

export default function StudentCrisisPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Navbar />

      <main className="flex-1">
        {/* HERO */}
        <section className="relative px-6 py-32 lg:px-12 overflow-hidden min-h-[600px] lg:min-h-[700px] bg-gradient-to-b from-red-900/20 to-black">
          <motion.div className="relative z-10 max-w-5xl">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl font-black tracking-tighter leading-tight lg:text-7xl"
            >
              The Student Crisis
              <br />
              <span className="text-brand-yellow">We're Addressing</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 max-w-3xl text-xl text-white/70"
            >
              Real challenges. Real solutions. R.E.S. is more than entertainment—it's intervention.
            </motion.p>
          </motion.div>
        </section>

        {/* HOUSING CRISIS */}
        <section className="px-6 py-28 lg:px-12 bg-white/[0.02] border-y border-white/10">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="mb-8 text-5xl font-black">The Housing Crisis</h2>
                
                <div className="space-y-6 mb-8">
                  <div className="bg-red-900/30 border border-red-500/50 p-6 rounded-lg">
                    <p className="text-3xl font-black text-red-400 mb-2">500,000+</p>
                    <p className="text-white/70">Student bed shortage in South Africa</p>
                  </div>

                  <div className="bg-red-900/30 border border-red-500/50 p-6 rounded-lg">
                    <p className="text-3xl font-black text-red-400 mb-2">R3,500 - R5,500</p>
                    <p className="text-white/70">Monthly private rental cost (unaffordable for most NSFAS students)</p>
                  </div>

                  <div className="bg-red-900/30 border border-red-500/50 p-6 rounded-lg">
                    <p className="text-xl font-black text-white mb-2">Real Impact</p>
                    <p className="text-white/70">Unsafe & overcrowded housing directly impacts academic performance and mental health</p>
                  </div>
                </div>

                <h3 className="text-2xl font-black mb-4 text-brand-yellow">R.E.S. Response</h3>
                <ul className="space-y-3">
                  {[
                    'National awareness campaign',
                    'Student Housing Innovation Challenge',
                    'Industry partnership with builders & investors',
                    'Pilot projects funding 2+ housing solutions',
                    'Post-show implementation support'
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <TrendingUp className="w-5 h-5 text-brand-yellow flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-12 rounded-lg"
              >
                <h3 className="text-2xl font-black mb-6">The Numbers</h3>
                <div className="space-y-6">
                  {[
                    { stat: '500K+', label: 'Bed shortage' },
                    { stat: '15M+', label: 'Students affected' },
                    { stat: '40%', label: 'Grade impact from poor housing' },
                    { stat: '70%', label: 'NSFAS inadequacy for housing' }
                  ].map((item, i) => (
                    <div key={i} className="border-l-4 border-brand-yellow pl-6">
                      <p className="text-3xl font-black text-brand-yellow">{item.stat}</p>
                      <p className="text-sm text-white/70 mt-1">{item.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FINANCIAL CRISIS */}
        <section className="px-6 py-28 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-12 rounded-lg order-2 lg:order-1"
              >
                <h3 className="text-2xl font-black mb-6">Financial Reality</h3>
                <div className="space-y-6">
                  {[
                    { stat: 'R16B+', label: 'Combined student debt' },
                    { stat: 'Coverage gaps', label: 'NSFAS insufficient' },
                    { stat: 'Hidden costs', label: 'Food, transport, books uncovered' },
                    { stat: '60%', label: 'Students earn while studying' }
                  ].map((item, i) => (
                    <div key={i} className="border-l-4 border-brand-yellow pl-6">
                      <p className="text-2xl font-black text-brand-yellow">{item.stat}</p>
                      <p className="text-sm text-white/70 mt-1">{item.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2"
              >
                <h2 className="mb-8 text-5xl font-black">The Finance Challenge</h2>
                
                <div className="space-y-6 mb-8">
                  <div className="bg-orange-900/30 border border-orange-500/50 p-6 rounded-lg">
                    <p className="text-xl font-black text-white mb-2">The Problem</p>
                    <p className="text-white/70">NSFAS covers tuition but leaves gaps. Students struggle with living costs, books, and transport. Many abandon studies due to financial pressure.</p>
                  </div>
                </div>

                <h3 className="text-2xl font-black mb-4 text-brand-yellow">R.E.S. Response</h3>
                <ul className="space-y-3">
                  {[
                    'Financial literacy mini-series',
                    'Expert education on bursaries & grants',
                    'Startup capital prizes for winners',
                    'Mentorship from entrepreneurs',
                    'Post-show job placement support'
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <TrendingUp className="w-5 h-5 text-brand-yellow flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* COMMUNITY IMPACT */}
        <section className="px-6 py-28 lg:px-12 bg-white/[0.02] border-y border-white/10">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-16 text-5xl font-black">Community Outreach Projects</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {[
                {
                  title: 'Adult Literacy Programs',
                  description: 'Teaching parents & guardians to read and write, breaking cycles of poverty'
                },
                {
                  title: 'Digital Skills Training',
                  description: 'Empowering unemployed youth with coding, design, and tech skills for jobs'
                },
                {
                  title: 'Agricultural Innovation',
                  description: 'Sustainable farming techniques addressing food security in rural areas'
                },
                {
                  title: 'Career Guidance',
                  description: 'Mentoring youth on career pathways and professional development'
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-8 rounded-lg hover:border-brand-yellow transition-colors"
                >
                  <h3 className="text-xl font-black mb-3 text-brand-yellow">{item.title}</h3>
                  <p className="text-white/70">{item.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-brand-yellow/20 to-brand-yellow/5 border border-brand-yellow/30 p-12 rounded-lg text-center"
            >
              <p className="text-2xl font-black text-white mb-6">First Season Impact Goals</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { metric: '20+', label: 'Communities impacted' },
                  { metric: '200+', label: 'Youth upskilled' },
                  { metric: '9M+', label: 'Viewers reached' },
                  { metric: '2+', label: 'Housing projects funded' }
                ].map((item, i) => (
                  <div key={i}>
                    <p className="text-3xl font-black text-brand-yellow">{item.metric}</p>
                    <p className="text-sm text-white/70 mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* YOUR ROLE */}
        <section className="px-6 py-28 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-16 text-5xl font-black">Your Role in the Solution</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  role: 'As a Viewer',
                  actions: [
                    'Vote for contestants you believe in',
                    'Participate in weekly challenges',
                    'Share stories & amplify awareness',
                    'Support community initiatives',
                    'Contribute to fundraising'
                  ]
                },
                {
                  role: 'As a Contestant',
                  actions: [
                    'Design solutions to real crises',
                    'Lead community projects',
                    'Develop leadership skills',
                    'Build lasting networks',
                    'Mentor others post-show'
                  ]
                },
                {
                  role: 'As a Partner/Donor',
                  actions: [
                    'Fund housing innovation projects',
                    'Provide internships & jobs',
                    'Sponsor education programs',
                    'Support startup capital',
                    'Mentor entrepreneurs'
                  ]
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 border border-white/10 p-8 rounded-lg"
                >
                  <h3 className="text-2xl font-black text-brand-yellow mb-6">{item.role}</h3>
                  <ul className="space-y-3">
                    {item.actions.map((action, j) => (
                      <li key={j} className="flex gap-3 items-start">
                        <div className="w-2 h-2 bg-brand-yellow rounded-full mt-2 flex-shrink-0" />
                        <span className="text-white/70 text-sm">{action}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-32 text-center lg:px-12">
          <h2 className="mb-6 text-4xl font-black">Be Part of the Solution</h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-white/70">
            These aren't just statistics—they're your peers, your community, your future. R.E.S. is solving real problems.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-3 bg-brand-yellow px-10 py-5 text-sm font-black uppercase tracking-widest text-black hover:bg-yellow-400 transition-all"
            >
              Register Now
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/movement"
              className="inline-flex items-center gap-3 border-2 border-brand-yellow px-10 py-5 text-sm font-black uppercase tracking-widest text-white hover:bg-brand-yellow hover:text-black transition-all"
            >
              Learn The Movement
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
