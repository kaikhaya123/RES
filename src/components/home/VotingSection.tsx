'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Crown, Heart, Vote, Users } from 'lucide-react';
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
      image: '/Images/Pink_Outfit.jpg',
      votes: 245678,
      rank: 1
    },
    {
      id: 2,
      name: 'Contestant Name',
      campus: 'University Name',
      image: '/Images/gorgeous-student-with-dental-braces-holding-notebook.jpg',
      votes: 198432,
      rank: 2
    },
    {
      id: 3,
      name: 'Contestant Name',
      campus: 'University Name',
      image: '/Images/Jackman.jpg',
      votes: 176890,
      rank: 3
    },
    {
      id: 4,
      name: 'Contestant Name',
      campus: 'University Name',
      image: '/Images/vertical-shot-happy-young-woman-with-curly-hair-holds-notepad-pen-makes-notes-what-she-observes-around-city-dressed-casual-green-jumper-poses-outdoors-against-blurred-background.jpg',
      votes: 154321,
      rank: 4
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-black text-white py-32 px-6 lg:px-12 overflow-hidden"
    >
      {/* HERO */}
      <motion.div
        style={{ y: yHero }}
        className="text-center mb-28"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-block px-5 py-2 border border-white text-xs font-bold tracking-[0.2em]"
        >
          Daily Free Votes
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl lg:text-7xl font-black tracking-tight mt-8"
        >
          Vote For Your Favorite
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-lg text-white/60 max-w-2xl mx-auto mt-6"
        >
          Support the contestants you believe deserve the spotlight.
        </motion.p>
      </motion.div>

      {/* MAIN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">
        
        {/* LEFT GRID */}
        <motion.div
          style={{ y: yGrid }}
          className="lg:col-span-8"
        >
          <h3 className="text-2xl font-black mb-8">Featured Contestants</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {contestants.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white text-black overflow-hidden group"
              >
                {/* IMAGE */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </motion.div>

                  {item.rank <= 3 && (
                    <div className="absolute top-4 left-4 bg-black text-white w-10 h-10 flex items-center justify-center">
                      <Crown className="w-5 h-5" />
                    </div>
                  )}
                </div>

                {/* DETAILS */}
                <div className="p-6">
                  <h4 className="text-xl font-black">{item.name}</h4>
                  <p className="text-xs uppercase tracking-wide text-gray-600">
                    {item.campus}
                  </p>

                  <div className="flex items-center justify-between mt-5 border-t pt-4">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      <span className="font-bold text-sm">{item.votes.toLocaleString()} votes</span>
                    </div>
                    <span className="text-xs font-bold text-gray-500">
                      #{item.rank}
                    </span>
                  </div>

                  <button
                    disabled
                    className="w-full bg-black text-white py-3 mt-6 text-xs font-black tracking-wide disabled:opacity-40"
                  >
                    <Vote className="inline-block w-4 h-4 mr-2" />
                    Coming Soon
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT LEADERBOARD */}
        <motion.div
          style={{ y: yBoard }}
          className="lg:col-span-4"
        >
          <div className="bg-white p-8 text-black">
            <h3 className="text-xl font-black mb-6">Live Rankings</h3>

            <div className="space-y-4">
              {contestants.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="flex items-center gap-4 p-4 border border-gray-200"
                >
                  <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-black">
                    {item.rank}
                  </div>

                  <div className="flex-1">
                    <p className="font-black text-sm">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      {item.votes.toLocaleString()} votes
                    </p>
                  </div>

                  <Users className="w-4 h-4 text-gray-400" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
