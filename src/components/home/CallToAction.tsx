'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, PlayCircle } from 'lucide-react';

export default function CallToAction() {
  return (
    <section className="relative overflow-hidden bg-black py-16 lg:py-24">
      {/* Background */}
      <Image
        src="/Images/porter-raab-Ucr4Yp-t364-unsplash-min.jpg"
        alt="R.E.S. Experience"
        fill
        className="object-cover img-lighten"
        quality={75}
        sizes="100vw"
        priority={false}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/75" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-6 text-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-yellow"
        >
          Roomza's Educated Secret
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-3xl font-black leading-tight text-white md:text-4xl"
        >
          This Is Where Students
          <br />
          Become National Leaders
        </motion.h2>

        {/* Explanation */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto mt-5 max-w-3xl text-sm text-white/70 md:text-base"
        >
          R.E.S. is not just a show. It is a national platform where students
          compete, grow, lead, and shape South Africa’s future through real
          challenges and real impact.
        </motion.p>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Link
            href="/apply"
            className="group inline-flex items-center gap-3 rounded-full bg-brand-yellow px-6 py-3 text-xs font-black uppercase tracking-widest text-black transition hover:bg-yellow-600"
          >
            Apply to Compete
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/journey"
            className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-white/80 hover:text-white transition"
          >
            <PlayCircle className="h-5 w-5" />
            See How It Works
          </Link>
        </motion.div>

        {/* Supporting actions */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10 flex flex-wrap justify-center gap-8 text-sm text-white/50"
        >
          <Link href="/vote" className="hover:text-white transition">
            Vote for Contestants
          </Link>
          <Link href="/live" className="hover:text-white transition">
            Watch Live
          </Link>
          <Link href="/merch" className="hover:text-white transition">
            Support the Movement
          </Link>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-black" />
    </section>
  );
}
