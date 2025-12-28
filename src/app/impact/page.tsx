'use client';

import { motion, useMotionValue, animate } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';

const revealContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      // slightly slower stagger for a gentler reveal
      staggerChildren: 0.16,
      delayChildren: 0.12,
    },
  },
};

const revealItem = {
  hidden: { opacity: 0, y: 30 },
  // slower individual item transition for a smoother scroll-up
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: 'easeOut' } },
};

function NumberTicker({ value, duration = 2.5, suffix = '' }: { value: number; duration?: number; suffix?: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(motionValue, value, {
      duration,
      ease: 'easeOut',
      onUpdate: latest => {
        node.textContent = Math.floor(latest).toString();
      }
    });

    return controls.stop;
  }, [motionValue, value, duration]);

  return <span ref={nodeRef}>0{suffix}</span>;
}

export default function ImpactPage() {
  const impactAreas = [
    {
      title: 'Student Opportunity',
      description: 'Creates access to platforms, visibility, and resources for students who would otherwise be unseen.'
    },
    {
      title: 'Leadership Development',
      description: 'Builds confidence, decision making, and accountability through real challenges.'
    },
    {
      title: 'Economic Support',
      description: 'Drives bursaries, funding exposure, and skills that lead to income opportunities.'
    },
    {
      title: 'Community Awareness',
      description: 'Surfaces real student issues such as accommodation, safety, and funding gaps.'
    }
  ];

  return (
      <div className="flex min-h-screen flex-col bg-black text-white">
        <Navbar />

        <main className="flex-1">
          <SmoothScroll>
          {/* HERO */}
          <section className="relative overflow-hidden min-h-screen flex items-center bg-black">
          {/* Background Image */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Image
              src="/Images/college-students-different-ethnicities-cramming%20(6)-min.jpg"
              alt="Students collaborating"
              fill
              className="object-cover object-center"
              priority
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 z-10 px-6 py-8 lg:px-12 lg:py-12 w-full">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl text-4xl font-black leading-tight tracking-tighter lg:text-5xl text-white m-0"
            >
              REAL IMPACT.
              <br />
              REAL CHANGE.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 max-w-xl text-base lg:text-lg text-white/90 m-0"
            >
              R.E.S. is designed to move beyond entertainment. Every action on the platform contributes to measurable student and community outcomes.
            </motion.p>
          </div>
        </section>

        {/* STATS */}
        <section className="bg-white px-6 py-24 text-black lg:px-12">
          <motion.div
            variants={revealContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.18 }}
            className="mx-auto grid max-w-6xl grid-cols-1 gap-12 text-center md:grid-cols-3"
          >
            <motion.div variants={revealItem}>
              <p className="text-7xl font-black">
                <NumberTicker value={500} duration={3} />
                <span>+</span>
              </p>
              <p className="mt-4 text-sm font-black uppercase tracking-widest text-black/60">Campuses Engaged</p>
            </motion.div>

            <motion.div variants={revealItem}>
              <p className="text-7xl font-black">
                <NumberTicker value={2} duration={2.5} />
                <span>M+</span>
              </p>
              <p className="mt-4 text-sm font-black uppercase tracking-widest text-black/60">Youth Reached</p>
            </motion.div>

            <motion.div variants={revealItem}>
              <p className="text-7xl font-black">
                <NumberTicker value={100} duration={3} />
                <span>%</span>
              </p>
              <p className="mt-4 text-sm font-black uppercase tracking-widest text-black/60">Digital Participation</p>
            </motion.div>
          </motion.div>
        </section>

        {/* IMPACT AREAS */}
        <section className="px-6 py-32 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-20 text-5xl font-black tracking-tight lg:text-6xl">Where the Impact Happens</h2>

            <motion.div
              variants={revealContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.18 }}
              className="grid grid-cols-1 gap-16 md:grid-cols-2"
            >
              {impactAreas.map((area, index) => (
                <motion.div key={index} variants={revealItem} className="border border-white/10 p-10">
                  <div className="mb-4 text-5xl font-black text-white/20">{String(index + 1).padStart(2, '0')}</div>
                  <h3 className="mb-4 text-2xl font-black">{area.title}</h3>
                  <p className="text-white/70 leading-relaxed">{area.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* VISUAL PROOF */}
        <section className="relative overflow-hidden">
          <div className="relative aspect-video">
            <Image
              src="/Images/friends-learning-study-group-min.jpg"
              alt="Student impact"
              fill
              className="object-cover img-lighten"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute bottom-6 left-6 lg:bottom-10 lg:left-10">
              <p className="max-w-xl text-2xl font-black leading-tight text-white lg:text-3xl drop-shadow-lg">
                Impact is measured by lives changed, not views gained.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-32 text-center lg:px-12">
          <motion.div variants={revealContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.18 }}>
            <motion.h2 variants={revealItem} className="mb-6 text-4xl font-black lg:text-5xl">Be Part of the Impact</motion.h2>
            <motion.p variants={revealItem} className="mx-auto mb-10 max-w-2xl text-lg text-white/70">
              Whether you are a student, supporter, or partner, your participation shapes outcomes.
            </motion.p>
            <motion.div variants={revealItem}>
              <Link
                href="/auth/register"
                className="inline-flex items-center gap-3 bg-brand-yellow px-10 py-5 text-sm font-black uppercase tracking-widest text-black"
              >
                Get Involved
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        </section>
          </SmoothScroll>
        </main>

        <Footer />
      </div>
  );
}
