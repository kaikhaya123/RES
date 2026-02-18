'use client';

import { motion, useMotionValue, animate } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';

function NumberTicker({ value, duration = 2.5, prefix = '', suffix = '' }: { value: number; duration?: number; prefix?: string; suffix?: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    const controls = animate(motionValue, value, {
      duration,
      ease: 'easeOut',
      onUpdate: latest => { node.textContent = prefix + Math.floor(latest).toString() + suffix; }
    });
    return controls.stop;
  }, [motionValue, value, duration, prefix, suffix]);
  return <span ref={nodeRef}>{prefix}0{suffix}</span>;
}

const impactAreas = [
  {
    num: '01',
    title: 'Transforming Student Experience & Academic Motivation',
    points: [
      'Encourages learners nationwide to take their education seriously',
      'Boosts motivation, self-belief and a desire for continuous learning',
      'Proves that success is possible regardless of background or circumstance',
      'Normalises peer-to-peer learning, mentorship and collaboration',
    ],
    note: 'This ripple effect extends to classrooms, homes and communities, strengthening South Africa\'s overall learning culture.',
  },
  {
    num: '02',
    title: 'Developing Leaders, Innovators & Community Builders',
    points: [
      'Contestants develop leadership skills that translate into real-world impact',
      'Viewers learn to solve problems, think critically and make better life choices',
      'Communities benefit from contestants who return home empowered and skilled',
    ],
    note: 'The show ultimately becomes a pipeline for youth who are ready to contribute positively to South Africa\'s development.',
  },
  {
    num: '03',
    title: 'Bridging the Gap Between Youth Talent and Real Opportunities',
    points: [
      'Scholarships, bursaries and academic support',
      'Internships, learnerships and job placement',
      'Entrepreneurship funding and incubation',
      'Skills development programmes and career coaching',
    ],
    note: 'This ensures that the impact of the show continues long after filming, turning entertainment into real economic empowerment.',
  },
  {
    num: '04',
    title: 'Reducing Youth Unemployment Through Skills & Exposure',
    points: [
      'Exposing youth to various industries, careers and real-world tasks',
      'Providing practical, transferable skills  communication, leadership, business, digital literacy',
      'Allowing contestants to demonstrate abilities in front of real employers and partners',
      'Encouraging a shift from passive job-seeking to active problem-solving',
    ],
    note: 'Every contestant and viewer gains tools that improve employability and open new economic pathways.',
  },
  {
    num: '05',
    title: 'Contributing to Poverty Reduction Through Education & Opportunity',
    points: [
      'Creates access to education and employment resources for participants and viewers',
      'Supports families and communities through the developmental gains contestants achieve',
      'Inspires a nationwide culture of hard work, self-reliance and community-driven progress',
      'Helps shape a future where more young people break generational cycles of poverty',
    ],
    note: 'Reality online show with a purpose  entertainment designed to contribute to national development.',
  },
  {
    num: '06',
    title: 'Building a Sustainable Ecosystem of Youth Empowerment',
    points: [
      'Annual national auditions and outreach campaigns',
      'School-based competitions and mentorship clubs',
      'Digital learning platforms and mobile learning tools',
      'Alumni programmes that track long-term growth of contestants',
    ],
    note: 'This ecosystem ensures that the show\'s impact is sustainable, measurable and continuously expanding.',
  },
];

const visionGoals = [
  { title: 'Stronger, Fairer Education System', desc: 'Where learners are motivated, supported and equipped with 21st-century skills.' },
  { title: 'Lower Youth Unemployment', desc: 'Through direct work opportunities, skills development, digital exposure and enterprise support.' },
  { title: 'Reduced Poverty Levels', desc: 'As more young people graduate from education into stable income pathways, supported by the show\'s networks.' },
  { title: 'A Confident, Creative Generation', desc: 'Capable of building businesses, supporting communities and driving national progress.' },
];

export default function ImpactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Navbar />

      <main className="flex-1">
        {/* HERO */}
        <section className="relative overflow-hidden min-h-screen flex items-end">
          <div className="absolute inset-0 z-0">
            <Image src="/Images/college-students-different-ethnicities-cramming (3) (1).jpg" alt="Impact" fill className="object-cover object-center" priority />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/80" />
          </div>
          <div className="relative z-10 px-6 pb-14 lg:px-12 lg:pb-20 w-full">
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="text-brand-yellow text-xs font-black tracking-[0.25em] uppercase mb-3">Built for National Transformation</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
              Real Impact.<br /><span className="text-brand-yellow">Real Change.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-5 max-w-2xl text-base lg:text-lg text-white/70">
              R.E.S. is designed not only to entertain, but to drive measurable transformation in the lives of young people and the communities they come from.
            </motion.p>
          </div>
        </section>

        {/* STATS */}
        <section className="bg-brand-yellow text-black px-6 py-20 lg:px-12">
          <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-7xl font-black">~<NumberTicker value={500} duration={3} /></p>
              <p className="mt-3 text-sm font-black uppercase tracking-widest text-black/60">Campuses to Be Engaged</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <p className="text-7xl font-black">+/-<NumberTicker value={2} duration={2.5} />M</p>
              <p className="mt-3 text-sm font-black uppercase tracking-widest text-black/60">Students to Be Reached</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <p className="text-7xl font-black"><NumberTicker value={100} duration={3} />%</p>
              <p className="mt-3 text-sm font-black uppercase tracking-widest text-black/60">Digital Participation</p>
            </motion.div>
          </div>
        </section>

        {/* IMPACT AREAS */}
        <section className="px-6 py-24 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <p className="text-brand-yellow text-xs font-black tracking-[0.2em] uppercase mb-4">Where the Impact Happens</p>
            <h2 className="text-4xl md:text-5xl font-black mb-16 tracking-tight">6 Dimensions of Change</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {impactAreas.map((area, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 2) * 0.1 }}
                  className="border border-white/10 rounded-xl p-8">
                  <div className="text-5xl font-black text-white/10 mb-5">{area.num}</div>
                  <h3 className="text-xl font-black mb-5 leading-tight">{area.title}</h3>
                  <ul className="space-y-2 mb-5">
                    {area.points.map((point, pi) => (
                      <li key={pi} className="flex items-start gap-3 text-white/65 text-sm">
                        <span className="text-brand-yellow mt-1 shrink-0"></span>
                        {point}
                      </li>
                    ))}
                  </ul>
                  <p className="text-white/40 text-xs italic border-t border-white/10 pt-4">{area.note}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* VISUAL BREAK */}
        <section className="relative overflow-hidden">
          <div className="relative aspect-video">
            <Image src="/Images/friends-learning-study-group-min.jpg" alt="Student impact" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute bottom-8 left-8 lg:bottom-12 lg:left-12">
              <p className="max-w-2xl text-2xl lg:text-4xl font-black text-yellow-300 leading-tight drop-shadow-lg">
                "Impact is measured by lives changed, not views gained."
              </p>
            </div>
          </div>
        </section>

        {/* VISION FOR THE FUTURE */}
        <section className="bg-yellow-300 text-black px-6 py-24 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-black/40 mb-4">Vision for the Ideal Future</p>
            <h2 className="text-4xl font-black mb-14 tracking-tight">R.E.S. Aims to Help Fix National Challenges</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {visionGoals.map((goal, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="border-2 border-black p-8 relative">
                  <div className="absolute top-4 right-4 text-4xl font-black text-black/5">{String(i + 1).padStart(2, '0')}</div>
                  <p className="text-xl font-black mb-3">{goal.title}</p>
                  <p className="text-black/70 leading-relaxed text-sm">{goal.desc}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-10 border-l-4 border-black pl-6">
              <p className="text-lg font-black">R.E.S. is built as a platform for hope, opportunity and nation-building.</p>
              <p className="text-black/70 mt-2">Empowering young people to rewrite their stories while uplifting the country as a whole.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-24 text-center lg:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="mb-6 text-4xl font-black">Be Part of the Impact</h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-white/70">Whether you are a student, supporter, or partner  your participation shapes outcomes.</p>
            <Link href="/auth/register" className="inline-flex items-center gap-2 bg-brand-yellow text-black px-10 py-4 text-sm font-black uppercase tracking-widest rounded-lg hover:bg-yellow-500 transition-all">
              Get Involved <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
