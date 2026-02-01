'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Navbar />

      <main className="flex-1">
        {/* HERO */}
        <section className="relative w-full h-screen overflow-hidden">
          <Image
            src="/Images/college-students-different-ethnicities-cramming (7).jpg"
            alt="Background"
            fill
            className="object-cover object-center absolute inset-0 brightness-50"
            priority
            quality={100}
            sizes="100vw"
            style={{ zIndex: 0 }}
          />

          {/* subtle gradient overlay to improve text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/50 pointer-events-none" />

          <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-12 lg:px-12 lg:pb-16">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter leading-tight"
        >
          About
          <br />
          <span className="text-yellow-500">Roomza's educated Secret</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 max-w-3xl text-xl text-white/70"
        >
          Roomza's Educated Secret is South Africa's first digital student reality competition built to combine leadership, education, and national participation.
        </motion.p>
          </div>
                  </section>

        {/* WHAT IT IS */}
        <section className="bg-honey-tan text-black px-6 py-28 lg:px-12">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-10 text-5xl font-black tracking-tight">What R.E.S. Is</h2>
            <div className="space-y-6 text-lg leading-relaxed">
              <p>
          R.E.S. is a national student-focused reality platform where twenty students from universities, TVET colleges, and private institutions compete in structured challenges.
              </p>
              <p>
          The public participates through verified voting, quizzes, and live interactions that directly influence outcomes.
              </p>
              <p>
          The show blends competition with real-world learning, leadership development, and community impact.
              </p>
            </div>
          </div>
        </section>

        {/* WHY IT EXISTS */}
        <section className="px-6 py-32 lg:px-12">
          <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-5xl font-black mb-8">Why It Exists</h2>
              <div className="space-y-6 text-lg text-white/70">
                <p>
                  Many students have talent, ideas, and leadership potential but lack visibility and opportunity.
                </p>
                <p>
                  R.E.S. exists to give students a national stage, connect them with real support, and highlight the realities of student life in South Africa.
                </p>
                <p>
                  It turns participation into exposure, growth, and long-term opportunity.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] overflow-hidden"
            >
              <Image
                src="/Images/college-students-different-ethnicities-cramming (2)-min.jpg"
                alt="Students collaborating"
                fill
                className="object-cover img-lighten"
              />
            </motion.div>
          </div>
        </section>

        {/* VALUES */}
        <section className="bg-honey-tan text-black px-6 py-32 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-20 text-5xl font-black">What We Stand For</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
        { title: 'Opportunity', image: '/Images/opportunity.png' },
        { title: 'Leadership', image: '/Images/leadership-development.png' },
        { title: 'Inclusion', image: '/Images/cohesion.png' },
        { title: 'Education', image: '/Images/learning.png' },
        { title: 'Community', image: '/Images/crowd-of-users.png' },
        { title: 'Integrity', image: '/Images/trustworthiness.png' }
      ].map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative border-2 border-black p-10 group"
        >
          <div className="absolute top-6 right-6 text-black/10 text-5xl font-black">
            {String(index + 1).padStart(2, '0')}
          </div>

          <div className="mb-6 relative w-12 h-12">
            <Image
        src={item.image}
        alt={item.title}
        fill
        className="object-contain"
            />
          </div>

          <p className="text-2xl font-black">{item.title}</p>
        </motion.div>
      ))}
            </div>
          </div>
        </section>

        {/* VISION */}
        <section className="px-6 py-32 lg:px-12">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-5xl font-black mb-10">Our Vision</h2>
            <p className="text-2xl font-black leading-tight">
              To build a national student movement that transforms competition into opportunity and participation into progress.
            </p>
            <p className="mt-6 text-lg text-white/70">
              R.E.S. aims to become the leading digital platform where students grow, communities engage, and future leaders emerge.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-32 text-center lg:px-12">
          <h2 className="mb-6 text-4xl font-black">Be Part of the Story</h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-white/70">
            Whether you are a student or a supporter, your participation shapes what comes next.
          </p>
          <Link
            href="/auth/register"
            className="inline-flex items-center gap-3 bg-honey-tan px-10 py-5 text-sm font-black uppercase tracking-widest text-black"
          >
            Join R.E.S.
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
