'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Vote, Users } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

export default function VotingSection() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const yHero = useTransform(scrollYProgress, [0, 1], [80, -50]);
  const yGrid = useTransform(scrollYProgress, [0, 1], [120, -100]);
  const yBoard = useTransform(scrollYProgress, [0, 1], [100, -70]);

  const contestants = [
    {
      id: 1,
      name: 'Contestant Name',
      campus: 'University Name',
      image: '/Images/medium-shot-man-with-afro-hairstyle.jpg',
      votes: 0,
      rank: 1
    },
    {
      id: 2,
      name: 'Contestant Name',
      campus: 'University Name',
      image: '/Images/medium-shot-smiley-man-work.jpg',
      votes: 0,
      rank: 2
    },
    {
      id: 3,
      name: 'Contestant Name',
      campus: 'University Name',
      image: '/Images/vertical-shot-happy-young-woman-with-curly-hair-holds-notepad-pen-makes-notes-what-she-observes-around-city-dressed-casual-green-jumper-poses-outdoors-against-blurred-background (1).jpg',
      votes: 0,
      rank: 3
    },
    {
      id: 4,
      name: 'Contestant Name',
      campus: 'University Name',
      image: '/Images/college-students-different-ethnicities-cramming.jpg',
      votes: 0,
      rank: 4
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-charcoal-blue-dark text-white py-32 lg:py-40 overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative">
        {/* HERO SECTION */}
        <motion.div
          style={{ y: yHero }}
          className="text-center mb-20 lg:mb-32"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="inline-block px-5 py-2 border-2 border-brand-yellow text-xs font-bold tracking-[0.2em] text-brand-yellow mb-8"
          >
            Daily Free Votes
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl lg:text-7xl font-black tracking-tight mb-6"
          >
            Vote For Your Favorite
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-white/60 max-w-2xl mx-auto"
          >
            Support the contestants you believe deserve the spotlight.
          </motion.p>
        </motion.div>

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT SECTION - FEATURED CONTESTANTS */}
          <motion.div
            style={{ y: yGrid }}
            className="lg:col-span-8"
          >
            <div className="mb-12">
              <h3 className="text-5xl lg:text-6xl font-black tracking-tight text-white">Featured Contestants</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {contestants.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-warm-stone-secondary text-black overflow-hidden group rounded-lg"
                >
                  {/* IMAGE CONTAINER */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-gray-300">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        quality={90}
                      />
                    </motion.div>
                  </div>

                  {/* CONTESTANT INFO */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h4 className="text-xl font-black text-black">{item.name}</h4>
                      <p className="text-xs uppercase tracking-wider text-gray-600 mt-1">
                        {item.campus}
                      </p>
                    </div>

                    {/* STATS */}
                    <div className="flex items-center justify-between border-t border-warm-stone-border pt-4">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-black" />
                        <span className="font-bold text-sm">{item.votes.toLocaleString()} votes</span>
                      </div>
                      <span className="text-xs font-bold text-gray-500 px-3 py-1 bg-gray-100 rounded-full">
                        #{item.rank}
                      </span>
                    </div>

                    {/* CTA BUTTON */}
                    <button
                      disabled
                      className="w-full bg-white text-black py-3 text-xs font-black tracking-wide rounded transition-all duration-300 disabled:opacity-50 hover:bg-yellow-400 flex items-center justify-center gap-2 mt-2"
                    >
                      <Vote className="w-4 h-4" />
                      Coming Soon
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT SECTION - LEADERBOARD */}
          <motion.div
            style={{ y: yBoard }}
            className="lg:col-span-4"
          >
            <div className="bg-warm-stone-secondary rounded-xl overflow-hidden shadow-2xl sticky top-24 border-4 border-brand-yellow">
              {/* LEADERBOARD HEADER */}
              <div className="bg-brand-yellow px-8 py-8">
                <h3 className="text-3xl font-black text-black">Live Rankings</h3>
                <p className="text-sm font-bold text-gray-700 mt-2">Current Standings</p>
              </div>

              {/* RANKINGS LIST */}
              <div className="divide-y divide-warm-stone-border bg-white">
                {contestants.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center gap-4 p-6 hover:bg-warm-stone-base/50 transition-colors duration-300"
                  >
                    {/* RANK POSITION */}
                    <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-black rounded-full flex-shrink-0 text-lg">
                      {item.rank}
                    </div>

                    {/* CONTESTANT INFO */}
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-base text-black truncate">{item.name}</p>
                      <p className="text-sm text-gray-600 mt-1 font-bold">
                        {item.votes.toLocaleString()} votes
                      </p>
                    </div>

                    {/* ICON */}
                    <Users className="w-5 h-5 text-black flex-shrink-0" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
