'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowRight } from 'lucide-react';

export default function MovementPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Navbar />

      <main className="flex-1">
        {/* HERO - ROBBEN ISLAND */}
        <section className="relative overflow-hidden w-screen h-screen flex items-end">
          <Image
            src="/Images/college-students-different-ethnicities-cramming (1).jpg"
            alt="The Movement"
            fill
            className="object-cover object-center"
            priority
            quality={100}
            sizes="100vw"
          />
          
          {/* Gradient overlay - dark at bottom, transparent at top */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-0" />

          {/* Text positioned at bottom - not blocking faces */}
          <div className="relative z-10 w-full px-6 pb-12 md:pb-16 lg:pb-20 lg:px-12">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-5xl text-xl md:text-2xl lg:text-3xl font-black tracking-tight leading-tight mb-2 uppercase"
            >
              The Movement
              <br />
              <span className="text-brand-yellow">Inspired by Robben Island</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xs md:text-sm lg:text-base text-white/90 max-w-3xl leading-relaxed"
            >
              From the dark years to freedom. R.E.S. follows the journey of Nelson Mandela's Long Walk to Freedom, transforming student challenges into leadership opportunities.
            </motion.p>
          </div>
        </section>

        {/* ROBBEN ISLAND CONNECTION */}
        <section className="bg-brand-yellow text-black px-6 lg:px-12 py-24 md:py-32">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 md:mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Robben Island's Legacy</h2>
              <p className="text-lg text-black/70">Understanding our inspiration</p>
            </div>
            
            <div className="space-y-8 md:space-y-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="border-l-4 border-black pl-6 py-6 pb-8"
              >
                <p className="text-xl md:text-2xl font-black mb-3">"Robben Island was a university"</p>
                <p className="text-lg text-black/75 leading-relaxed">
                  Ahmed Kathrada's powerful statement captures the essence of R.E.S. Like Robben Island, our show is a testing ground where young people grow into leaders.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="border-l-4 border-black pl-6 py-6 pb-8"
              >
                <p className="text-lg text-black/75 leading-relaxed">
                  Political prisoners emerged from Robben Island transformed, ready to lead a nation. R.E.S. participants emerge ready to lead their communities, armed with skills, networks, and purpose.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="border-l-4 border-black pl-6 py-6"
              >
                <p className="text-lg text-black/75 leading-relaxed">
                  Just as Mandela's journey lasted decades, R.E.S. begins a longer journey for each participant—one where education, entrepreneurship, and community impact are the true victories.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* THE LONG WALK STRUCTURE */}
        <section className="px-6 lg:px-12 py-24 md:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 md:mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4">The 6-Week Journey</h2>
              <p className="text-lg text-white/60">R.E.S. is structured around the pivotal chapters of "Long Walk to Freedom," mirroring the psychological and emotional journey of transformation.</p>
            </div>

            <div className="space-y-12 lg:space-y-16">
              {[
                {
                  week: 'Week 1-2',
                  title: 'The Dark Years',
                  subtitle: 'Robben Island: Testing the Foundation',
                  description: 'Welcome to the house. Ice-breakers, orientation, and initial challenges test character. Like Robben Island prisoners, contestants face discomfort to discover their resilience.',
                  image: '/Images/students-rehashing-theater-class%20(1).jpg'
                },
                {
                  week: 'Week 3',
                  title: 'Beginning to Hope',
                  subtitle: 'Leadership Emerges',
                  description: 'Leadership challenges inspire. Contestants design solutions to real student crises. Hope blooms through purpose.',
                  image: '/Images/college-students.jpg'
                },
                {
                  week: 'Week 4-5',
                  title: 'Talking with the Enemy',
                  subtitle: 'Innovation & Collaboration',
                  description: 'Teams pitch business ideas. Cultural talent showcases unite diversity. Understanding across differences becomes the path forward.',
                  image: '/Images/young-adults-meeting-up-study-min.jpg'
                },
                {
                  week: 'Week 6',
                  title: 'Freedom',
                  subtitle: 'The Final Push',
                  description: 'Finalists design implementable community projects. True victory is defined by impact, not elimination. Freedom earned through contribution.',
                  image: '/Images/young-black-woman-min.jpg'
                }
              ].map((item, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
                >
                  {/* Text column */}
                  <div className={`col-span-12 lg:col-span-6 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'} px-4 lg:px-0` }>
                    <div className="max-w-xl">
                      <p className="text-brand-yellow font-black text-sm md:text-base mb-3 uppercase tracking-wider">{item.week}</p>
                      <h3 className="text-3xl md:text-4xl font-black mb-3 leading-tight text-white">{item.title}</h3>
                      <p className="text-xs md:text-sm text-white/70 mb-6 uppercase tracking-widest font-semibold">{item.subtitle}</p>
                      <p className="text-white/85 text-base md:text-lg leading-relaxed">{item.description}</p>


                    </div>
                  </div>

                  {/* Image column */}
                  <div className={`col-span-12 lg:col-span-6 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'} px-4 lg:px-0` }>
                    <div className="relative h-56 md:h-72 lg:h-96 rounded-xl overflow-hidden shadow-xl">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        quality={80}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* PURPOSE-DRIVEN SHOW */}
        <section className="bg-brand-yellow text-black px-6 lg:px-12 py-24 md:py-32">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-4xl md:text-5xl font-black mb-12 tracking-tight">More Than Entertainment</h2>
            
            <div className="space-y-8 text-lg leading-relaxed">
              <p className="text-xl text-black/85">
                R.E.S. is driven by purpose: intervening in the real challenges students face daily. Entertainment is the vehicle, but transformation is the destination.
              </p>
              <p className="text-lg text-black/80">
                Every challenge builds character. Every reward funds assistance. Every eviction transitions to the Leadership House where learning continues.
              </p>
              <p className="text-lg text-black/80">
                Participants don't just compete—they learn, lead, innovate, and create. They return to their communities as catalysts for change, launching businesses, mentoring peers, and solving problems.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative px-6 lg:px-12 py-24 md:py-32 text-center overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">Join This Movement</h2>
            <p className="mx-auto mb-12 max-w-2xl text-lg text-white/70 leading-relaxed">
              Be part of a show that transforms lives, honors history, and shapes South Africa's future leaders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center gap-3 bg-brand-yellow px-10 md:px-12 py-5 text-base font-black uppercase tracking-widest text-black hover:bg-yellow-600 transition-all duration-300 rounded-lg"
              >
                Register Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center gap-3 border-2 border-brand-yellow px-10 md:px-12 py-5 text-base font-black uppercase tracking-widest text-white hover:bg-brand-yellow hover:text-black transition-all duration-300 rounded-lg"
              >
                How It Works
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
