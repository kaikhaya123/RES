'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Users, Trophy, Clock, Flame, Lock, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const weeks = [
  {
    week: 1,
    codename: 'THE BLUFF WEEK',
    bookPart: 'Part Eight  Robben Island: The Dark Years',
    theme: 'Welcome & Orientation',
    color: 'from-amber-600 to-yellow-500',
    borderColor: 'border-amber-500/40',
    tagColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    contestants: 20,
    evictions: 0,
    status: 'UPCOMING' as const,
    description:
      'The house opens. Contestants arrive from every corner of South Africa. Orientation, house rules, and the first test of character begin. Ice-breaker challenges explore heritage, teamwork, and diversity.',
    challenges: [
      'Ice-breaker cultural quiz',
      'Heritage storytelling session inspired by SA diversity',
      'Teamwork bonding games',
      'Contestant profiles released to the public',
      '"Favourite Contestant" early poll opens for audience',
    ],
    audienceAction: 'Early favourite poll  cast your first 100 daily votes!',
    evictionNote: 'No evictions this week. Foundation building only.',
  },
  {
    week: 2,
    codename: 'THE SURVIVAL WEEK',
    bookPart: 'Part Eight  Robben Island: The Dark Years',
    theme: 'Survival of the Smartest',
    color: 'from-red-700 to-red-500',
    borderColor: 'border-red-500/40',
    tagColor: 'bg-red-500/20 text-red-400 border-red-500/30',
    contestants: 20,
    evictions: 0,
    status: 'UPCOMING' as const,
    description:
      'First taste of pressure. Business pitches, cultural knowledge tests, and teamwork under the spotlight. Judges observe  the audience opens voting for house leaders.',
    challenges: [
      'Student entrepreneurship business pitch',
      'Cultural knowledge and SA heritage quiz',
      'Teamwork leadership pressure test',
      'General knowledge about SA history',
      'Audience votes for house captain and team captains',
    ],
    audienceAction: 'Vote for your favourite contestant to lead the house and team captains.',
    evictionNote: 'No evictions  judges inputs are carried forward into Week 3 vote.',
  },
  {
    week: 3,
    codename: 'ATTACK WEEK',
    bookPart: 'Part Nine  Robben Island: Beginning to Hope',
    theme: 'Lead or Follow',
    color: 'from-orange-600 to-orange-400',
    borderColor: 'border-orange-500/40',
    tagColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    contestants: 20,
    evictions: 2,
    status: 'UPCOMING' as const,
    description:
      'Innovation and creativity collide. Leadership role-play in real community scenarios. A mini-hackathon forces teams to solve a live social crisis. The first evictions arrive  but no one truly leaves.',
    challenges: [
      'Leadership role-play: student accommodation crisis solutions',
      'Individual innovation and consulting challenge',
      'Mini-hackathon solving a real social issue',
      'Audience votes determine first evictions',
      'Judges hold final veto power',
    ],
    audienceAction: 'First eviction vote  2 contestants transition to the Leadership House.',
    evictionNote: '2 contestants evicted  both move to the Leadership House for intensive growth.',
  },
  {
    week: 4,
    codename: "HOLDER'S WEEK",
    bookPart: 'Part Ten  Talking with the Enemy',
    theme: "Innovators' Lab",
    color: 'from-purple-700 to-purple-500',
    borderColor: 'border-purple-500/40',
    tagColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    contestants: 18,
    evictions: 3,
    status: 'UPCOMING' as const,
    description:
      'Design-thinking takes centre stage. Contestants prototype low-cost solutions for student housing, food security, or mental health. Culture and talent unite diversity. The judges can save one.',
    challenges: [
      'Design-thinking: low-cost student solution prototype',
      'Cultural talent showcase  song, dance, poetry',
      'Collaboration across different backgrounds',
      'Public votes and judges determine evictions',
      'Judges can save ONE contestant from eviction',
    ],
    audienceAction: 'Vote 3 out  but the judges can save one. Who do you want safe?',
    evictionNote: '3 evicted. Judges save 1. All transitions go to Leadership House.',
  },
  {
    week: 5,
    codename: 'VICTOR VERSTER WEEK',
    bookPart: 'Part Ten  Talking with the Enemy',
    theme: 'From Idea to Action',
    color: 'from-blue-700 to-blue-500',
    borderColor: 'border-blue-500/40',
    tagColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    contestants: 15,
    evictions: 4,
    status: 'UPCOMING' as const,
    description:
      'Teams scale their Week 2 business concepts into real pitches before entrepreneurs and youth funding agencies. Win pitch immunity and stay in the game. The stakes are at their highest.',
    challenges: [
      'Scale and develop the Week 2 business concept',
      'Live pitch event to real entrepreneurs and funders',
      'Win pitch immunity to avoid eviction',
      'Public vote and pitch performance determines exits',
      'Real funding conversations begin with industry partners',
    ],
    audienceAction: 'Vote 4 out  pitch immunity protects the strongest pitcher. Choose wisely.',
    evictionNote: '4 evicted. Pitch immunity winner is safe. All go to Leadership House.',
  },
  {
    week: 6,
    codename: 'FREEDOM DAY',
    bookPart: 'Part Eleven  Freedom',
    theme: 'The Final Push',
    color: 'from-yellow-500 to-amber-400',
    borderColor: 'border-yellow-400/40',
    tagColor: 'bg-yellow-400/20 text-yellow-300 border-yellow-400/30',
    contestants: 11,
    evictions: 5,
    status: 'UPCOMING' as const,
    description:
      'The final week. Contestants design implementable community projects and deliver personal branding presentations. Day 4: live voting closes. 6 finalists walk into the Grand Finale event.',
    challenges: [
      'Community-driven project design  implementable post-show',
      'Final personal branding and future plan presentation',
      'Semi-finals: Day 4 live eviction vote closes  5 exit',
      '6 finalists proceed to the Grand Finale',
      'Grand Finale: Huge live public event on the final day',
    ],
    audienceAction: 'The biggest vote of the season. Day 4 is final. 6 finalists go to the Grand Finale.',
    evictionNote: '5 evicted on Day 4. 6 finalists compete in the Grand Finale live event.',
  },
];

const statusConfig = {
  COMPLETED: { label: 'Completed', Icon: CheckCircle2, cls: 'bg-green-500/20 text-green-400 border-green-500/30' },
  ACTIVE: { label: 'Now Live', Icon: Flame, cls: 'bg-red-500/20 text-red-400 border-red-500/30' },
  UPCOMING: { label: 'Upcoming', Icon: Lock, cls: 'bg-white/10 text-white/40 border-white/10' },
};

export default function ChallengesPage() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-black text-white">

        {/* HERO */}
        <section className="relative px-6 lg:px-12 pt-32 pb-20 overflow-hidden bg-gradient-to-b from-brand-yellow/10 to-black">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl"
          >
            <p className="text-brand-yellow text-xs font-black tracking-[0.25em] uppercase mb-4">
              Inspired by Long Walk to Freedom
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight mb-6 uppercase">
              6 Weeks.
              <br />
              <span className="text-brand-yellow">6 Transformations.</span>
            </h1>
            <p className="text-lg lg:text-xl text-white/60 max-w-3xl leading-relaxed mb-10">
              Every week mirrors a chapter from Nelson Mandela's Long Walk to Freedom. Challenges build character. Evictions launch leaders. The house is a crucible.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { Icon: Users, label: 'Contestants Enter', value: '20' },
                { Icon: Trophy, label: 'Grand Finale', value: '6 Finalists' },
                { Icon: Clock, label: 'Duration', value: '6 Weeks' },
                { Icon: Flame, label: 'House Transitions', value: '14 Total' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3">
                  <stat.Icon className="w-5 h-5 text-brand-yellow shrink-0" />
                  <div>
                    <p className="text-[10px] text-white/40 uppercase tracking-wider">{stat.label}</p>
                    <p className="font-black text-white text-sm">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* BOOK PARTS LEGEND */}
        <section className="px-6 lg:px-12 py-10 border-y border-white/10 bg-white/[0.015]">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-white/40 mb-6">Show Structure  Mapped to Long Walk to Freedom</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              {[
                { part: 'Part Eight', title: 'The Dark Years', weeks: 'Weeks 1 & 2', color: 'border-amber-500/30 bg-amber-500/5' },
                { part: 'Part Nine', title: 'Beginning to Hope', weeks: 'Week 3', color: 'border-orange-500/30 bg-orange-500/5' },
                { part: 'Part Ten', title: 'Talking with the Enemy', weeks: 'Weeks 4 & 5', color: 'border-blue-500/30 bg-blue-500/5' },
                { part: 'Part Eleven', title: 'Freedom', weeks: 'Week 6  Grand Finale', color: 'border-yellow-400/30 bg-yellow-400/5' },
              ].map((p) => (
                <div key={p.part} className={'border rounded-lg p-4 ' + p.color}>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">{p.part}</p>
                  <p className="font-black text-white text-sm">{p.title}</p>
                  <p className="text-white/50 text-xs mt-1">{p.weeks}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WEEK CARDS */}
        <section className="px-6 lg:px-12 py-20 max-w-7xl mx-auto space-y-10">
          {weeks.map((week, index) => {
            const { label, Icon: StatusIcon, cls } = statusConfig[week.status];
            return (
              <motion.div
                key={week.week}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className={'border ' + week.borderColor + ' rounded-2xl overflow-hidden bg-white/[0.015]'}
              >
                {/* Week Header */}
                <div className={'bg-gradient-to-r ' + week.color + ' px-6 py-5 md:px-10 flex flex-col md:flex-row md:items-center md:justify-between gap-3'}>
                  <div className="flex items-center gap-5">
                    <span className="text-black font-black text-5xl opacity-20 leading-none select-none">
                      {String(week.week).padStart(2, '0')}
                    </span>
                    <div>
                      <p className="text-black/60 text-[10px] font-black tracking-[0.2em] uppercase mb-0.5">{week.bookPart}</p>
                      <h2 className="text-black font-black text-xl md:text-2xl tracking-tight">{week.codename}</h2>
                      <p className="text-black/70 text-sm font-semibold">{week.theme}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black border ' + cls}>
                      <StatusIcon className="w-3.5 h-3.5" />
                      {label}
                    </span>
                    <span className="bg-black/20 text-black/80 text-xs font-black px-3 py-1.5 rounded-full">
                      {week.contestants} in house
                    </span>
                    {week.evictions > 0 && (
                      <span className="bg-black/30 text-black/90 text-xs font-black px-3 py-1.5 rounded-full">
                        {week.evictions} evicted this week
                      </span>
                    )}
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-5 gap-8">
                  <div className="lg:col-span-2 space-y-5">
                    <p className="text-white/70 leading-relaxed text-base">{week.description}</p>
                    <div className={'border ' + week.borderColor + ' rounded-xl p-4'}>
                      <p className="text-[10px] font-black uppercase tracking-wider text-white/40 mb-2">Your Role as Audience</p>
                      <p className="text-white/75 text-sm leading-relaxed">{week.audienceAction}</p>
                    </div>
                    <div className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-xl p-4">
                      <p className="text-[10px] font-black uppercase tracking-wider text-brand-yellow/60 mb-2">Eviction Model</p>
                      <p className="text-white/75 text-sm leading-relaxed">{week.evictionNote}</p>
                      {week.evictions > 0 && (
                        <div className="mt-3 flex items-center gap-2">
                          <span className="text-brand-yellow font-black">{week.evictions}</span>
                          <span className="text-white/50 text-xs">transitions to Leadership House</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="lg:col-span-3">
                    <p className="text-[10px] font-black uppercase tracking-wider text-white/40 mb-5">Weekly Challenges &amp; Events</p>
                    <ul className="space-y-3">
                      {week.challenges.map((challenge, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.07 }}
                          className="flex items-start gap-3 bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-3"
                        >
                          <span className={'text-[10px] font-black px-2 py-0.5 rounded border ' + week.tagColor + ' shrink-0 mt-0.5'}>
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="text-white/65 text-sm leading-relaxed">{challenge}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </section>

        {/* CTA */}
        <section className="px-6 lg:px-12 py-24 text-center border-t border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-brand-yellow text-xs font-black tracking-[0.2em] uppercase mb-4">Ready to be part of it?</p>
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              Register to Vote.
              <br />
              <span className="text-brand-yellow">Apply to Compete.</span>
            </h2>
            <p className="text-white/55 max-w-xl mx-auto mb-10 text-lg">
              100 free votes per day. Support your favourite contestant across all 6 weeks. Shape who leads South Africa's next generation.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/auth/register" className="inline-flex items-center justify-center gap-2 bg-brand-yellow text-black px-10 py-4 text-sm font-black uppercase tracking-widest rounded-lg hover:bg-yellow-500 transition-all">
                Register to Vote <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/apply" className="inline-flex items-center justify-center gap-2 border-2 border-brand-yellow text-white px-10 py-4 text-sm font-black uppercase tracking-widest rounded-lg hover:bg-brand-yellow hover:text-black transition-all">
                Apply to Compete <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </section>
      </div>

      <Footer />
    </>
  );
}
