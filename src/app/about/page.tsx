'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const missionPillars = [
  { title: 'Educate', desc: 'Embedding real academic and life-skills content into challenges that strengthen critical thinking, creativity, collaboration and communication.' },
  { title: 'Empower', desc: 'Providing contestants and viewers with access to mentorship, career guidance, enterprise development and personal growth opportunities.' },
  { title: 'Entertain', desc: 'Delivering high-quality, emotionally resonant storytelling and competitive tasks that reflect the real struggles and triumphs of South African students.' },
  { title: 'Build Communities', desc: 'Involving families, schools, districts, partners and online audiences in shaping the journey and celebrating youth achievement.' },
  { title: 'Inspire Leadership', desc: 'Showcasing discipline, ethics, teamwork and resilience  the foundational values of transformative young leaders.' },
];

const uniquePoints = [
  'A reality show grounded in education, heritage, values, and nation-building.',
  'A voting system that allows South Africans to actively support their favourite student leaders.',
  'Partnerships with institutions, brands and public sectors to provide meaningful opportunities  bursaries, scholarships, mentorship, internships, entrepreneurial support.',
  'Content that motivates learners across the country, turning entertainment into a classroom of possibilities.',
  'A platform that celebrates diversity and honours the struggles and victories of young people from all walks of life.',
];

const values = [
  { title: 'Opportunity', image: '/Images/opportunity.png' },
  { title: 'Leadership', image: '/Images/leadership-development.png' },
  { title: 'Inclusion', image: '/Images/cohesion.png' },
  { title: 'Education', image: '/Images/learning.png' },
  { title: 'Community', image: '/Images/crowd-of-users.png' },
  { title: 'Integrity', image: '/Images/trustworthiness.png' },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Navbar />

      <main className="flex-1">
        {/* HERO */}
        <section className="relative w-full h-screen overflow-hidden">
          <Image
            src="/Images/college-students-different-ethnicities-cramming (7).jpg"
            alt="About R.E.S."
            fill
            className="object-cover object-center brightness-50"
            priority quality={100} sizes="100vw"
            style={{ zIndex: 0 }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/60 pointer-events-none" />
          <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-12 lg:px-12 lg:pb-16">
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="text-brand-yellow text-xs font-black tracking-[0.25em] uppercase mb-3">South Africa's First Reality-Education Hybrid Show</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
              className="max-w-4xl text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              About<br /><span className="text-brand-yellow">Roomza's Educated Secret</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-3xl text-base lg:text-lg text-white/70 leading-relaxed">
              Designed to entertain, empower and transform the lives of students. Inspired by the resilience, discipline and leadership of Nelson Mandela's Long Walk to Freedom.
            </motion.p>
          </div>
        </section>

        {/* WHAT IS R.E.S. */}
        <section className="bg-brand-yellow text-black px-6 py-24 lg:px-12">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-10 text-4xl md:text-5xl font-black tracking-tight">What Is R.E.S.?</h2>
            <div className="space-y-6 text-lg leading-relaxed">
              <p>
                Roomza's Educated Secret (R.E.S.) is South Africa's first reality-education hybrid show designed to entertain, empower and transform the lives of students. Set in a dynamic, interactive house environment, the show brings together students from diverse backgrounds to compete in academic challenges, leadership missions, business tasks, cultural activities and community-driven projects.
              </p>
              <p>
                Each episode reveals not only the contestants' talents and intellect, but also their character, teamwork, problem-solving and resilience  the essential qualities of South Africa's next generation of leaders.
              </p>
              <div className="border-l-4 border-black pl-6 py-2">
                <p className="text-xl font-black">R.E.S. is more than a show.</p>
                <p className="mt-2 text-black/80">It is a movement for youth empowerment, nation building and educational innovation. It connects viewers, families, schools and communities to a meaningful, uplifting entertainment experience that nurtures both the mind and the spirit.</p>
              </div>
            </div>
          </div>
        </section>

        {/* VISION & MISSION */}
        <section className="px-6 py-24 lg:px-12">
          <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-brand-yellow text-xs font-black tracking-[0.2em] uppercase mb-4">Our Vision</p>
              <h2 className="text-3xl font-black mb-6 leading-tight">Africa's Leading Youth Development Reality Show</h2>
              <p className="text-white/70 leading-relaxed text-lg">
                To become Africa's leading youth development reality show that inspires learning, unlocks leadership and empowers every young person to believe in their ability to rise, rebuild, and reshape their future.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <Image src="/Images/college-students-different-ethnicities-cramming (2)-min.jpg" alt="Vision" fill className="object-cover" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* MISSION PILLARS */}
        <section className="bg-white text-black px-6 py-24 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-black/40 mb-3">Our Mission</p>
            <h2 className="text-4xl md:text-5xl font-black mb-16 tracking-tight">Five Pillars of Purpose</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {missionPillars.map((p, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="border-2 border-black p-8 relative">
                  <div className="absolute top-5 right-5 text-5xl font-black text-black/5">{String(i + 1).padStart(2, '0')}</div>
                  <p className="text-2xl font-black mb-4">{p.title}</p>
                  <p className="text-black/70 leading-relaxed text-sm">{p.desc}</p>
                </motion.div>
              ))}
              {/* span last card wide if odd */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
                className="border-2 border-black p-8 md:col-span-2 lg:col-span-1 bg-black text-white flex flex-col justify-center">
                <p className="text-3xl font-black mb-3">Built for South Africa.</p>
                <p className="text-white/70 leading-relaxed">Every challenge, every story, every vote  designed to uplift the nation's youth.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* WHAT MAKES IT UNIQUE */}
        <section className="px-6 py-24 lg:px-12">
          <div className="mx-auto max-w-5xl">
            <p className="text-brand-yellow text-xs font-black tracking-[0.2em] uppercase mb-4">What Makes R.E.S. Unique?</p>
            <h2 className="text-4xl font-black mb-12 leading-tight">Unlike Anything Seen Before</h2>
            <div className="space-y-5">
              {uniquePoints.map((point, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-4 bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
                  <CheckCircle2 className="w-5 h-5 text-brand-yellow shrink-0 mt-0.5" />
                  <p className="text-white/75 leading-relaxed">{point}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WHAT WE STAND FOR */}
        <section className="bg-brand-yellow text-black px-6 py-24 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-16 text-4xl md:text-5xl font-black">What We Stand For</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {values.map((item, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}
                  className="relative border-2 border-black p-8 group">
                  <div className="absolute top-4 right-4 text-black/10 text-4xl font-black">{String(index + 1).padStart(2, '0')}</div>
                  <div className="mb-5 relative w-10 h-10">
                    <Image src={item.image} alt={item.title} fill className="object-contain" />
                  </div>
                  <p className="text-xl font-black">{item.title}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* COMMITMENT */}
        <section className="px-6 py-24 lg:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-brand-yellow text-xs font-black tracking-[0.2em] uppercase mb-6">Our Commitment</p>
              <h2 className="text-3xl md:text-4xl font-black mb-8 leading-tight">Fairness. Transparency. Inclusivity.</h2>
              <p className="text-white/70 text-lg leading-relaxed max-w-3xl mx-auto">
                R.E.S. is committed to the ethical treatment of all participants. We aim to create a safe, inspiring and empowering environment where young people can compete, learn and grow without losing their sense of identity, dignity or ambition.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-24 text-center lg:px-12 border-t border-white/10">
          <h2 className="mb-6 text-4xl font-black">Be Part of the Story</h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-white/70">Whether you are a student or a supporter, your participation shapes what comes next.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/auth/register" className="inline-flex items-center justify-center gap-2 bg-brand-yellow text-black px-10 py-4 text-sm font-black uppercase tracking-widest rounded-lg hover:bg-yellow-500 transition-all">
              Join R.E.S. <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/journey" className="inline-flex items-center justify-center gap-2 border-2 border-brand-yellow text-white px-10 py-4 text-sm font-black uppercase tracking-widest rounded-lg hover:bg-brand-yellow hover:text-black transition-all">
              A Participant's Journey <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
