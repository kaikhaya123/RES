'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

/* News feed is temporarily hidden — content coming soon. */

// Official news and updates will be published here once verified. For now, users can sign up to be notified.

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center">
        <div className="container mx-auto max-w-4xl py-24 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block px-5 py-2 border-2 border-honey-tan text-xs font-black tracking-[0.2em] text-honey-tan mb-4"
            >
              NEWS & UPDATES
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05]"
            >
              News — Coming Soon
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg text-gray-300 max-w-2xl mx-auto"
            >
              We’re preparing official updates and will publish them here soon. Sign up to receive notifications and be first to hear the news.
            </motion.p>

            <div className="flex justify-center gap-4">
              <Link
                href="/subscribe"
                className="inline-flex items-center gap-2 px-8 py-4 bg-honey-tan text-black font-black uppercase tracking-wide rounded hover:bg-honey-tan-400 transition-all duration-300"
              >
                <span>Get Notified</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white font-black uppercase tracking-wide rounded hover:bg-white hover:text-black transition-all duration-300"
              >
                <span>Learn More</span>
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-warm-stone-secondary rounded-xl p-6 text-black">
                <p className="text-sm font-bold uppercase">Topics</p>
                <p className="mt-2 font-black">Applications, Voting, Impact</p>
              </div>
              <div className="bg-warm-stone-secondary rounded-xl p-6 text-black">
                <p className="text-sm font-bold uppercase">Frequency</p>
                <p className="mt-2 font-black">Official announcements</p>
              </div>
              <div className="bg-warm-stone-secondary rounded-xl p-6 text-black">
                <p className="text-sm font-bold uppercase">Subscribe</p>
                <p className="mt-2 font-black">Be first to know</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
