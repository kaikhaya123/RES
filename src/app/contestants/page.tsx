'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function ContestantsPage() {
  const [filter, setFilter] = useState('all');

  const contestants = [
    {
      id: 1,
      name: 'Lebo',
      age: 19,
      bio: 'Creative student with strong leadership energy.',
      image: '/Images/pexels-mikhail-nilov-9158370.jpg',
      category: 'popular'
    },
    {
      id: 2,
      name: 'Ayanda',
      age: 18,
      bio: 'Quiet but strategic. Known for sharp thinking.',
      image: '/contestants/ayanda.jpg',
      category: 'new'
    },
    {
      id: 3,
      name: 'Michael',
      age: 20,
      bio: 'High energy personality who dominates challenges.',
      image: '/Images/pexels-karola-g-8147397.jpg',
      category: 'trending'
    },
    {
      id: 4,
      name: 'Bianca',
      age: 19,
      bio: 'Friendly personality with strong teamwork skills.',
      image: '/Images/pexels-mikhail-nilov-7584340.jpg',
      category: 'popular'
    }
  ];

  const filtered = filter === 'all' 
    ? contestants 
    : contestants.filter(c => c.category === filter);

  return (
    <div className="w-full flex flex-col min-h-screen">
      <Navbar />
      
      {/* HERO */}
      <section className="w-screen h-screen relative flex items-end justify-center bg-black">
        <Image 
          src="/Images/adobe-69386156c98ae%20(1).jpg"
          alt="Contestants"
          fill
          className="object-cover opacity-60"
        />
        <div className="relative z-10 text-center px-6 pb-12 lg:pb-16 w-full">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-xl md:text-2xl lg:text-3xl font-extrabold"
          >
            MEET THE CONTESTANTS
          </motion.h1>
          <p className="text-gray-200 text-xs md:text-sm mt-2 max-w-xl mx-auto">
            Learn about every contestant who shapes the show. Vote. Engage. Support your favorite student.
          </p>
        </div>
      </section>

      {/* FILTER BAR */}
      <div className="w-full px-6 md:px-12 py-6 flex gap-4 bg-dark-bg-soft text-white\">
        {['all', 'popular', 'trending', 'new'].map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium border 
              ${filter === cat ? 'bg-white text-black border-white' : 'border-gray-600 text-gray-300'}`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* GRID */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-12 pb-20 bg-dark-bg-soft\">
        {filtered.map(c => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            viewport={{ once: true }}
            className="rounded-xl overflow-hidden bg-warm-stone-secondary shadow-md"
          >
            <div className="relative h-64">
              <Image 
                src={c.image}
                alt={c.name}
                fill
                className="object-cover img-lighten"
              />
            </div>

            <div className="p-5">
              <h3 className="text-lg font-bold">{c.name}, {c.age}</h3>
              <p className="text-gray-600 text-sm mt-1">{c.bio}</p>

              <button className="mt-4 w-full py-2 bg-black text-white rounded-lg text-sm">
                View Profile
              </button>
            </div>
          </motion.div>
        ))}
      </section>

      <Footer />
    </div>
  );
}
