'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Heart, Trophy, Users, Clock, ArrowLeft, Volume2 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useRef } from 'react';

export default function ChallengeDetailPage({ params }: { params: { id: string } }) {
  const sectionRef = useRef(null);

  // Mock data - would come from database
  const challengeData: any = {
    1: {
      week: 1,
      title: 'The R50 Startup Mission',
      subtitle: 'EDUCATIONAL OPPORTUNITIES',
      image: '/Images/man-enjoying-some-takeaway-food_imgupscaler.ai_General_8K.jpg',
      description: 'Complete a challenge with only R50 and prove your entrepreneurial spirit.',
      status: 'COMPLETED',
      daysLeft: 0,
      countdownDays: 0,
      countdownHours: 0,
      countdownMins: 0,
      rules: [
        'You must start with exactly R50',
        'Document your journey with photos/videos',
        'Show proof of all transactions',
        'Final product/service must be sold or delivered',
        'Submit within 7 days'
      ],
      submissionTypes: [
        'Proof of Initial R50 investment',
        'Proof of sales/delivery',
        'Photos of your product/service',
        'Short story (500 words max)',
        'Reflection video (60 seconds)'
      ],
      votingCategories: [
        { name: 'Most Creative Solution', weight: 40 },
        { name: 'Best Execution', weight: 30 },
        { name: 'Most Impactful', weight: 30 }
      ],
      prizes: {
        first: 'R5,000 + Mentorship',
        second: 'R3,000 + Certificate',
        third: 'R2,000 + Certificate'
      },
      contestants: 20,
      submissions: 20,
      votes: 18901,
      submissions_list: [
        { rank: 1, name: 'Lebo Khumalo', campus: 'UCT', votes: 1234, image: '/Images/Pink_Outfit.jpg' },
        { rank: 2, name: 'Ayanda Mokoena', campus: 'Wits', votes: 1050, image: '/Images/gorgeous-student-with-dental-braces-holding-notebook.jpg' },
        { rank: 3, name: 'Michael Thabo', campus: 'Stellenbosch', votes: 987, image: '/Images/Jackman.jpg' },
        { rank: 4, name: 'Bianca Lee', campus: 'UP', votes: 876, image: '/Images/vertical-shot-happy-young-woman-with-curly-hair-holds-notepad-pen-makes-notes-what-she-observes-around-city-dressed-casual-green-jumper-poses-outdoors-against-blurred-background.jpg' },
        { rank: 5, name: 'Sipho Ndlovu', campus: 'UKZN', votes: 765, image: '/Images/medium-shot-friends-posing-together.jpg' },
        { rank: 6, name: 'Lerato Mokoena', campus: 'UCT', votes: 654, image: '/Images/pexels-mikhail-nilov-9158370.jpg' }
      ]
    }
  };

  const challenge = challengeData[params.id] || challengeData[1];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-dark-bg-soft text-white">
        {/* BACK LINK */}
        <div className="px-6 lg:px-12 py-6 container mx-auto max-w-7xl">
          <Link href="/challenges" className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-bold">Back to Challenges</span>
          </Link>
        </div>

        {/* HERO SECTION */}
        <section className="relative py-20 lg:py-32 overflow-hidden px-6 lg:px-12">
          <div className="absolute inset-0">
            <img
              src={challenge.image}
              alt={challenge.title}
              className="w-full h-full object-cover opacity-30"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-b from-charcoal-blue-dark/0 via-charcoal-blue-dark/40 to-charcoal-blue-dark/80" />

          <div className="container mx-auto max-w-7xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-block px-5 py-2 border-2 border-brand-yellow text-xs font-black tracking-[0.2em] text-brand-yellow mb-6"
              >
                WEEK {challenge.week}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl lg:text-6xl font-black tracking-tighter mb-4 leading-[1.1]"
              >
                {challenge.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-xl text-gray-200 max-w-2xl mb-8"
              >
                {challenge.description}
              </motion.p>

              {/* Status & Countdown */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-6 items-start sm:items-center"
              >
                <div className="inline-block px-4 py-2 bg-brand-yellow/20 border border-brand-yellow rounded-full">
                  <span className="text-brand-yellow font-black uppercase text-sm">Status: {challenge.status}</span>
                </div>

                {challenge.daysLeft > 0 && (
                  <div className="flex items-center gap-3 text-gray-300">
                    <Clock className="w-5 h-5 text-brand-yellow" />
                    <span className="font-bold">{challenge.daysLeft} days {challenge.countdownHours}h {challenge.countdownMins}m left</span>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* MAIN CONTENT GRID */}
        <section className="relative py-20 lg:py-24 px-6 lg:px-12">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* LEFT: Challenge Details */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-2 space-y-8"
              >
                {/* Rules */}
                <div className="bg-warm-stone-secondary rounded-xl p-8 text-black">
                  <h3 className="text-2xl font-black mb-6">📋 Challenge Rules</h3>
                  <ul className="space-y-4">
                    {challenge.rules.map((rule: string, i: number) => (
                      <li key={i} className="flex gap-4">
                        <div className="w-6 h-6 rounded-full bg-brand-yellow text-black flex items-center justify-center flex-shrink-0 font-black text-sm">
                          {i + 1}
                        </div>
                        <span className="text-gray-700 font-semibold">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Submission Types */}
                <div className="bg-warm-stone-secondary rounded-xl p-8 text-black">
                  <h3 className="text-2xl font-black mb-6">📤 What to Submit</h3>
                  <ul className="space-y-3">
                    {challenge.submissionTypes.map((type: string, i: number) => (
                      <li key={i} className="flex gap-3 items-start">
                        <div className="w-1.5 h-1.5 bg-black rotate-45 mt-2 flex-shrink-0" />
                        <span className="text-gray-700 font-semibold">{type}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Voting Categories */}
                <div className="bg-warm-stone-secondary rounded-xl p-8 text-black">
                  <h3 className="text-2xl font-black mb-6">🗳️ How Voting Works</h3>
                  <p className="text-gray-600 text-sm mb-6">
                    Public votes combined with judge scores determine the final ranking.
                  </p>
                  <div className="space-y-4">
                    {challenge.votingCategories.map((cat: any, i: number) => (
                      <div key={i}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-black text-black">{cat.name}</span>
                          <span className="text-xs font-black text-gray-600">{cat.weight}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-brand-yellow"
                            style={{ width: `${cat.weight}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* RIGHT: Stats Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-1"
              >
                {/* Stats Cards */}
                <div className="space-y-6 sticky top-32">
                  {/* Prize Card */}
                  <div className="bg-warm-stone-secondary rounded-xl p-6 text-black">
                    <h4 className="font-black text-lg mb-4 flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-brand-yellow" />
                      Prize Pool
                    </h4>
                    <div className="space-y-3">
                      <div className="pb-3 border-b border-warm-stone-border">
                        <p className="text-xs text-gray-600 uppercase font-bold">🥇 1st Place</p>
                        <p className="text-xl font-black">{challenge.prizes.first}</p>
                      </div>
                      <div className="pb-3 border-b border-warm-stone-border">
                        <p className="text-xs text-gray-600 uppercase font-bold">🥈 2nd Place</p>
                        <p className="text-xl font-black">{challenge.prizes.second}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 uppercase font-bold">🥉 3rd Place</p>
                        <p className="text-xl font-black">{challenge.prizes.third}</p>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="bg-warm-stone-secondary rounded-xl p-6 text-black">
                    <h4 className="font-black text-lg mb-4">📊 Challenge Stats</h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-gray-600 uppercase font-bold">Contestants</p>
                        <p className="text-3xl font-black">{challenge.submissions}/{challenge.contestants}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 uppercase font-bold">Public Votes</p>
                        <p className="text-3xl font-black">{challenge.votes.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button className="w-full bg-brand-yellow text-black py-4 rounded-lg font-black uppercase tracking-wide hover:bg-yellow-400 transition-all duration-300 text-sm">
                    Vote Now
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SUBMISSIONS GALLERY */}
        <section className="relative py-20 lg:py-24 px-6 lg:px-12 bg-charcoal-blue-dark">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-4">
                👥 Contestant Submissions
              </h2>
              <p className="text-gray-300 text-lg">Vote for your favorites. Top votes rank the leaderboard.</p>
            </motion.div>

            {/* Submission Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {challenge.submissions_list.map((submission: any, index: number) => (
                <motion.div
                  key={submission.rank}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-warm-stone-secondary rounded-xl overflow-hidden text-black group hover:shadow-2xl transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-gray-300">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                      src={submission.image}
                      alt={submission.name}
                      className="w-full h-full object-cover"
                    />

                    {/* Rank Badge */}
                    <div className="absolute top-3 left-3 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-black">
                      {submission.rank}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h4 className="text-lg font-black">{submission.name}</h4>
                    <p className="text-xs text-gray-600 uppercase tracking-wide mb-4">{submission.campus}</p>

                    {/* Vote Count */}
                    <div className="flex items-center gap-2 pb-4 border-b border-warm-stone-border">
                      <Heart className="w-4 h-4 text-black" />
                      <span className="font-black">{submission.votes.toLocaleString()} votes</span>
                    </div>

                    {/* Vote Button */}
                    <button className="w-full mt-4 bg-brand-yellow text-black py-2 rounded font-black text-xs uppercase tracking-wide hover:bg-yellow-400 transition-all duration-300">
                      Vote
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mt-12"
            >
              <button className="px-8 py-3 border-2 border-brand-yellow text-brand-yellow font-black uppercase tracking-wide rounded hover:bg-brand-yellow hover:text-black transition-all duration-300">
                Load More Submissions
              </button>
            </motion.div>
          </div>
        </section>

        {/* LIVE LEADERBOARD */}
        <section className="relative py-20 lg:py-24 px-6 lg:px-12">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-4">📊 Live Rankings</h2>
              <p className="text-gray-300 text-lg">Current leaderboard for this challenge.</p>
            </motion.div>

            {/* Leaderboard Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-warm-stone-secondary rounded-xl overflow-hidden text-black"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-warm-stone-border bg-warm-stone-base">
                      <th className="px-6 py-4 text-left text-xs font-black uppercase">Rank</th>
                      <th className="px-6 py-4 text-left text-xs font-black uppercase">Contestant</th>
                      <th className="px-6 py-4 text-left text-xs font-black uppercase">Campus</th>
                      <th className="px-6 py-4 text-right text-xs font-black uppercase">Votes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-warm-stone-border">
                    {challenge.submissions_list.map((submission: any) => (
                      <tr key={submission.rank} className="hover:bg-warm-stone-base transition-colors">
                        <td className="px-6 py-4">
                          <span className="text-lg font-black">{submission.rank}</span>
                        </td>
                        <td className="px-6 py-4 font-black">{submission.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{submission.campus}</td>
                        <td className="px-6 py-4 text-right font-black">{submission.votes.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
