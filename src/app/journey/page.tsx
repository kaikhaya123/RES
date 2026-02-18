'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowRight } from 'lucide-react';

const chapters = [
  {
    num: '01',
    phase: 'The Beginning',
    title: 'A High School Dreamer',
    subtitle: 'High School Learner with Big Dreams',
    body: 'In a South African township, a learner wakes up every day with ambition burning inside her. She comes from a family that works hard but struggles financially. She studies under candlelight during load-shedding, joins school clubs, and volunteers at community clean-ups. She becomes known as "the girl who never gives up." When she hears about R.E.S., she knows the show is for tertiary students. So she makes a promise to herself: "One day, I will be part of that show."',
    image: '/Images/back-view-young-people-walking-street.jpg',
  },
  {
    num: '02',
    phase: 'The Struggle',
    title: 'Sacrifice, Survival & Hope',
    subtitle: 'The Tertiary Struggle',
    body: 'After matric, she gets accepted into university. But the joy is short-lived  funding becomes a big problem. She queues for NSFAS. There are months when she eats only bread and tea. She shares her room with two other students, studies in packed libraries, and juggles part-time work with her lectures. But in all of this, she grows  tougher, smarter and more determined. She joins campus associations and starts tutoring first-year students. Then she sees the R.E.S. applications open.',
    image: '/Images/gender-fluid-people-posing-min.jpg',
  },
  {
    num: '03',
    phase: 'The Door Opens',
    title: 'Becoming a Participant',
    subtitle: 'A Life-Changing Call',
    body: '"Congratulations, you have been selected to join Roomza\'s Educated Secret." Her whole campus erupts with excitement. Friends hug her. Lecturers congratulate her. Her family cries tears of joy. She becomes a symbol of hope. For the first time in her life, her financial stress is lifted  the show provides support and covers her academic needs. This alone changes her future.',
    image: '/Images/college-students-different-ethnicities-cramming%20(8)-min.jpg',
  },
  {
    num: '04',
    phase: 'The Experience',
    title: 'Growing into a Leader',
    subtitle: 'Inside the R.E.S. House',
    body: 'Inside the show, she meets other ambitious students who carry the same hunger to succeed.\n\nThe show challenges them through:\n Innovation tasks and edutainment challenges\n Community development missions\n Leadership and entrepreneurship projects\n Real-world problem solving and teamwork\n\nShe learns financial literacy, public speaking, digital skills and how to build a business. For the first time, she begins to see herself as a leader.',
    image: '/Images/young-adults-meeting-up-study-min.jpg',
  },
  {
    num: '05',
    phase: 'The Ripple',
    title: 'Family & Community Transformation',
    subtitle: 'Impact Back Home',
    body: 'While she is on the show, her journey is broadcast nationwide. Her family becomes known as "the home of the future leader." Her community gathers around cellphones in spaza shops, schools, sports fields and churches to watch her. Her younger siblings study harder. Her friends on campus push through their own struggles. Her principal proudly tells learners: "Your background is not your destiny."',
    image: '/Images/woman-using-her-mobile-phone-city-skyline-night-light-background-min.jpg',
  },
  {
    num: '06',
    phase: 'The Mission',
    title: 'Changing Lives Before Winning',
    subtitle: 'Community Projects',
    body: 'Before the season even ends, she and her team design community projects:\n Local business incubators\n Youth employment centres\n Recycling and clean-up cooperatives\n Literacy and tutoring programs\n Digital skills bootcamps\n Township tourism ideas\n\nThese projects help revive local economies, create small jobs, inspire entrepreneurship and show communities how to uplift themselves. A student is not just competing  they are transforming their world.',
    image: '/Images/people-traveling-subway-winter-time-min%20(1).jpg',
  },
  {
    num: '07',
    phase: 'Freedom Day',
    title: 'Winning  and What Comes Next',
    subtitle: 'The Grand Finale & Beyond',
    body: 'She becomes one of the finalists. When the winner is announced her name is called. She becomes an instant millionaire  but more importantly, a symbol of possibility. She starts a business. She becomes a community leader and an R.E.S. ambassador. She hires people. Her community begins to change. She builds her parents a home, pays for her siblings\' schooling, and restores dignity. When she returns home, she is not the same girl who once studied under a flickering light.',
    image: '/Images/young-black-woman-min.jpg',
  },
];

const truePurpose = [
  'Rebuilding communities',
  'Reviving local economies',
  'Providing real opportunities to young people',
  'Breaking cycles of poverty',
  'Teaching practical skills for the digital and modern economy',
  'Empowering students to become leaders',
  'Showing families and communities that change is possible',
  'Building a generation that works together to uplift South Africa',
];

export default function JourneyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Navbar />

      <main className="flex-1">
        {/* HERO */}
        <section className="relative h-screen w-full flex items-end overflow-hidden"
          style={{ backgroundImage: "url('/Images/6759-min.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/75" />
          <div className="relative z-10 px-6 pb-12 lg:px-12 lg:pb-16 w-full">
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="text-brand-yellow text-xs font-black tracking-[0.25em] uppercase mb-3">From Dreamer to Leader</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
              className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
              The Journey of a<br /><span className="text-brand-yellow">R.E.S. Participant</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 text-white/65 text-base max-w-2xl leading-relaxed">
              High School Dreamer  University Survivor  R.E.S. Participant  Leader  Influencer  Millionaire  Community Builder
            </motion.p>
          </div>
        </section>

        {/* CHAPTER SECTIONS */}
        <section className="space-y-0">
          {chapters.map((chapter, index) => {
            const isEven = index % 2 === 0;
            const bgClass = isEven ? 'bg-black' : 'bg-white text-black';
            const textMuted = isEven ? 'text-white/65' : 'text-black/70';
            const accent = isEven ? 'text-brand-yellow' : 'text-black';
            const numColor = isEven ? 'text-white/[0.06]' : 'text-black/[0.06]';
            const headingColor = isEven ? 'text-white' : 'text-black';

            return (
              <motion.section key={chapter.num} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className={"px-6 py-20 lg:px-12 lg:py-28 " + bgClass}>
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className={isEven ? '' : 'lg:order-2'}>
                    <div className={"text-8xl font-black mb-4 leading-none select-none " + numColor}>{chapter.num}</div>
                    <p className={"text-xs font-black uppercase tracking-[0.2em] mb-2 " + accent}>{chapter.phase}</p>
                    <h2 className={"text-3xl md:text-4xl font-black mb-2 " + headingColor}>{chapter.title}</h2>
                    <p className={"text-sm mb-6 uppercase tracking-wider font-semibold " + textMuted}>{chapter.subtitle}</p>
                    <div className={textMuted + " leading-relaxed whitespace-pre-line text-base"}>
                      {chapter.body}
                    </div>
                  </div>
                  <div className={isEven ? 'lg:order-2' : 'lg:order-1'}>
                    <div className="relative h-64 md:h-80 lg:h-[420px] rounded-2xl overflow-hidden shadow-2xl">
                      <Image src={chapter.image} alt={chapter.title} fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/30" />
                    </div>
                  </div>
                </div>
              </motion.section>
            );
          })}
        </section>

        {/* THE TRUE PURPOSE */}
        <section className="bg-brand-yellow text-black px-6 py-24 lg:px-12">
          <div className="mx-auto max-w-5xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-black/40 mb-4">The Real Foundation</p>
            <h2 className="text-4xl font-black mb-4 leading-tight">The True Purpose of R.E.S.</h2>
            <p className="text-black/70 text-lg mb-12 max-w-3xl">The show is NOT just entertainment. It is NOT just a competition. Its foundation is transformation.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {truePurpose.map((point, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                  className="flex items-start gap-3 bg-black/5 border border-black/10 rounded-xl px-5 py-4">
                  <span className="text-black font-black text-lg shrink-0"></span>
                  <span className="text-black/80 font-semibold">{point}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-12 border-l-4 border-black pl-6">
              <p className="text-xl font-black">Every participant's journey becomes part of a national transformation story.</p>
              <p className="text-black/70 mt-2">Whether they won or not.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-24 text-center lg:px-12 border-t border-white/10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-black mb-6">This is more than a show.</h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-white/70">A platform. A test of character. A launchpad for the future.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/apply" className="inline-flex items-center justify-center gap-2 bg-brand-yellow text-black px-10 py-4 text-sm font-black uppercase tracking-widest rounded-lg hover:bg-yellow-500 transition-all">
                Apply to Compete <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/auth/register" className="inline-flex items-center justify-center gap-2 border-2 border-brand-yellow text-white px-10 py-4 text-sm font-black uppercase tracking-widest rounded-lg hover:bg-brand-yellow hover:text-black transition-all">
                Register to Vote <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
