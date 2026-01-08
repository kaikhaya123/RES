"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

function StatCard({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="bg-warm-stone-secondary rounded-3xl p-8 shadow-md border border-warm-stone-border text-center"
    >
      <div className="text-3xl lg:text-4xl font-black mb-2">{value}</div>
      <div className="text-sm text-gray-600 uppercase tracking-wider font-bold">{label}</div>
    </motion.div>
  );
}

export default function MakingADifference() {
  const stats = [
    { value: '', label: 'Campuses Engaged' },
    { value: '', label: 'Students to be Reached' }
  ];

  const testimonials = [
    { quote: "R.E.S. changed my life — I won a bursary that paid my tuition.", by: 'Nthabiseng, University of Cape Town' },
    { quote: "The platform gave me a stage to showcase my project and secure mentorship.", by: 'Sipho, University of Johannesburg' },
    { quote: "Our campus connected like never before — real opportunities followed.", by: 'Lerato, Durban University of Technology' }
  ];

  return (
    <section className="py-16 md:py-24 lg:py-28 bg-dark-bg-soft relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-16">
        <div className="text-center mb-10 md:mb-16">
          <p className="section-eyebrow text-white text-sm md:text-lg mb-2 md:mb-4">Impact & Community</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl section-title text-white mb-2 md:mb-4">Making a Difference</h2>
          <p className="section-subtitle text-gray-300 text-sm md:text-lg max-w-3xl mx-auto">Measurable impact across campuses and communities — scholarships, engagement and real opportunities.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-10 md:mb-16 max-w-2xl mx-auto">
          {stats.map((s, i) => (
            <StatCard key={s.label} value={s.value} label={s.label} delay={i * 0.12} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            {testimonials.map((t, i) => (
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="p-8 bg-warm-stone-secondary border border-warm-stone-border rounded-3xl shadow-md"
              >
                <p className="text-gray-900 leading-relaxed">"{t.quote}"</p>
                <div className="text-sm font-black mt-4 text-gray-900\">{t.by}</div>
              </motion.blockquote>
            ))}
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-24">
              <div className="rounded-2xl overflow-hidden shadow-md">
                <Image src="/Images/photo-smiling-woman-with-happy-expression-rejoices-something-good-life-dressed-casual-clothes.jpg" alt="Students on campus" width={560} height={720} className="object-cover img-lighten" />
              </div>
              <p className="text-xs text-gray-400 mt-4">Real students, real stories — powered by R.E.S.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
