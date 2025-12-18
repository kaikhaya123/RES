'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

export default function VotingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const contestants = [
    { 
      id: 1, 
      image: '/Images/medium-shot-man-with-afro-hairstyle.jpg', 
      name: 'Contestant 1',
      votes: 0,
      rank: 1,
      span: 'col-span-1 row-span-2'
    },
    { 
      id: 2, 
      image: '/Images/medium-shot-smiley-man-work-min.jpg', 
      name: 'Contestant 2',
      votes: 0,
      rank: 2,
      span: 'col-span-1 row-span-1'
    },
    { 
      id: 3, 
      image: '/Images/vertical-shot-happy-young-woman-with-curly-hair-holds-notepad-pen-makes-notes-what-she-observes-around-city-dressed-casual-green-jumper-poses-outdoors-against-blurred-background (1).jpg', 
      name: 'Contestant 3',
      votes: 0,
      rank: 3,
      span: 'col-span-1 row-span-1'
    },
    { 
      id: 4, 
      image: '/Images/college-students-different-ethnicities-cramming-min (1).jpg', 
      name: 'Contestant 4',
      votes: 0,
      rank: 4,
      span: 'col-span-1 row-span-1'
    },
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-24 lg:py-48 bg-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-16 max-w-7xl relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-start">
          
          {/* LEFT SIDE - HEADLINE & CTA */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-black leading-tight mb-3 md:mb-6">
                Vote For Your <span className="text-brand-yellow">Favorite</span> &
                <span className="text-brand-yellow"> Support</span> Excellence
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 leading-relaxed max-w-lg">
                Cast your daily free votes to support the contestants you believe deserve the spotlight. Every vote counts toward determining who takes home the top prize.
              </p>
            </div>

            <Link
              href="/auth/register"
              className="group inline-flex items-center justify-center gap-2 md:gap-3 px-4 md:px-8 py-3 md:py-4 bg-brand-yellow text-black font-black text-xs md:text-base uppercase tracking-wider rounded-full hover:bg-yellow-400 hover:shadow-[0_0_30px_rgba(251,191,36,0.4)] transition-all duration-500 w-full sm:w-fit"
            >
              <span>Start Voting</span>
              <motion.div
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </Link>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-sm text-white/40 mt-10"
            >
              One vote per day. Daily reset. Make it count.
            </motion.p>
          </motion.div>

          {/* RIGHT SIDE - MASONRY GRID */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 lg:gap-5 auto-rows-max"
          >
            {contestants.map((contestant, index) => (
              <motion.div
                key={contestant.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className={`${contestant.span} relative group overflow-hidden rounded-3xl`}
              >
                <div className="relative h-full min-h-[250px] overflow-hidden rounded-3xl">
                  <Image
                    src={contestant.image}
                    alt={contestant.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Name and votes on hover */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-0 left-0 right-0 p-4 text-white font-bold"
                  >
                    <p className="text-sm md:text-base">{contestant.name}</p>
                    <p className="text-xs text-white/70 mt-2">{contestant.votes.toLocaleString()} votes</p>
                  </motion.div>

                  {/* Glow border on hover */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-white/0 group-hover:border-brand-yellow/50 transition-all duration-300" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
