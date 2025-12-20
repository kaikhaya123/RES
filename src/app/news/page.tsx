'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: string;
  description: string;
  link?: string;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: 'Applications Now Open for R.E.S. Season 1',
    date: 'December 20, 2024',
    category: 'APPLICATIONS',
    description: 'Students across South Africa can now apply to compete in R.E.S. Season 1. Submissions accepted until January 31, 2025. Apply now to be part of the movement.',
    link: '/apply'
  },
  {
    id: 2,
    title: 'Voting Rules & Integrity Framework Released',
    date: 'December 15, 2024',
    category: 'VOTING',
    description: 'Full transparency on how public voting works. Verified accounts only. 100 votes per person per day. Learn how the community shapes the outcome.'
  },
  {
    id: 3,
    title: 'Meet the R.E.S. Judging Panel',
    date: 'December 10, 2024',
    category: 'ANNOUNCEMENTS',
    description: 'Announcing the expert judges who will guide contestants through R.E.S. Experienced entrepreneurs, educators, and community leaders.'
  },
  {
    id: 4,
    title: 'The Robben Island Connection: Our Inspiration',
    date: 'December 5, 2024',
    category: 'MOVEMENT',
    description: 'Learn how Nelson Mandela\'s Long Walk to Freedom inspired R.E.S. We\'re building a movement rooted in South African values and purpose.',
    link: '/movement'
  },
  {
    id: 5,
    title: 'Challenge Calendar Unveiled: 6 Weeks of Growth',
    date: 'November 28, 2024',
    category: 'CHALLENGES',
    description: 'The complete 6-week challenge structure is now public. From Bluff Week to Freedom Day. Every week builds leadership.',
    link: '/challenges'
  },
  {
    id: 6,
    title: 'Student Housing Crisis: R.E.S. Takes Action',
    date: 'November 20, 2024',
    category: 'IMPACT',
    description: 'South Africa faces a 500K+ bed shortage. R.E.S. is launching a dedicated innovation challenge to tackle student housing. Learn how you can participate.',
    link: '/student-crisis'
  },
  {
    id: 7,
    title: 'Community Partners Announced',
    date: 'November 15, 2024',
    category: 'PARTNERSHIPS',
    description: 'From universities to businesses to NGOs. Meet the organizations supporting R.E.S. and shaping the movement.'
  },
  {
    id: 8,
    title: 'Why R.E.S. is Different: Beyond Entertainment',
    date: 'November 10, 2024',
    category: 'ANNOUNCEMENTS',
    description: 'R.E.S. is not a typical reality show. It\'s an educational journey. A leadership factory. A national movement. Here\'s why we exist.'
  }
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'APPLICATIONS':
      return 'text-green-400 bg-green-400/10';
    case 'VOTING':
      return 'text-blue-400 bg-blue-400/10';
    case 'ANNOUNCEMENTS':
      return 'text-purple-400 bg-purple-400/10';
    case 'MOVEMENT':
      return 'text-yellow-400 bg-yellow-400/10';
    case 'CHALLENGES':
      return 'text-orange-400 bg-orange-400/10';
    case 'IMPACT':
      return 'text-red-400 bg-red-400/10';
    case 'PARTNERSHIPS':
      return 'text-cyan-400 bg-cyan-400/10';
    default:
      return 'text-white/60 bg-white/5';
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* HERO */}
        <section className="px-6 lg:px-12 pt-32 md:pt-40 pb-24 md:pb-32 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-7xl font-black mb-8 tracking-tight leading-tight">
              News & Updates
            </h1>
            <p className="text-lg lg:text-xl text-white/70 max-w-2xl leading-relaxed">
              Stay informed about applications, challenges, voting, and the movement. Everything you need to know, as it happens.
            </p>
          </motion.div>
        </section>

        {/* NEWS FEED */}
        <section className="px-6 lg:px-12 py-24 md:py-32 border-t border-white/10 max-w-5xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8 md:space-y-10"
          >
            {newsItems.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="group p-8 md:p-10 border border-white/10 rounded-xl bg-white/[0.02] hover:border-brand-yellow/50 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <span className={`text-xs font-bold px-4 py-2 rounded-full whitespace-nowrap ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                    <span className="flex items-center gap-2 text-white/60 text-sm">
                      <Calendar className="w-4 h-4" />
                      {item.date}
                    </span>
                  </div>
                  {item.link && (
                    <Link href={item.link} className="flex-shrink-0">
                      <ArrowRight className="text-brand-yellow w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </Link>
                  )}
                </div>

                <h3 className="text-2xl md:text-3xl font-black mb-4 leading-tight group-hover:text-brand-yellow transition-colors">
                  {item.title}
                </h3>
                <p className="text-white/75 text-lg leading-relaxed max-w-3xl">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CTA */}
        <section className="px-6 lg:px-12 py-24 md:py-32 border-t border-white/10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Ready to Get Involved?</h2>
            <p className="text-lg text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
              Whether you want to apply as a contestant, vote for your favorites, or support the movement, there's a place for you.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/apply"
                className="inline-flex items-center gap-3 bg-brand-yellow text-black font-black px-10 md:px-12 py-5 text-lg uppercase tracking-widest hover:bg-yellow-300 transition-all duration-300 hover:scale-105 rounded-lg"
              >
                Apply Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/auth/register"
                className="inline-flex items-center gap-3 border-2 border-brand-yellow text-white font-black px-10 md:px-12 py-5 text-lg uppercase tracking-widest hover:bg-brand-yellow hover:text-black transition-all duration-300 rounded-lg"
              >
                Join as Voter
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
