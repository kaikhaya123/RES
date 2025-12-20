'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

type Product = {
  id: string;
  title: string;
  price: string;
  img: string;
  purpose: string;
};

const products: Product[] = [
  {
    id: 'p1',
    title: 'R.E.S. Hoodie',
    price: 'R450',
    img: '/Images/modern-loose-fit-hoodie-mockup-for-fashion-brands-and-online-stores-promo-use-01452.png',
    purpose: 'Wear the movement. Stand for growth and leadership.',
  },
  {
    id: 'p2',
    title: 'R.E.S. Cap',
    price: 'R150',
    img: '/Images/high-res-image.png',
    purpose: 'Quiet confidence. Visible commitment.',
  },
];

export default function Merch() {
  const [toasts, setToasts] = useState<
    Array<{ id: string; message: string }>
  >([]);

  function addToast(message: string) {
    const id = String(Date.now());
    setToasts((t) => [...t, { id, message }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 1600);
  }

  return (
    <section className="relative bg-black pt-32 pb-40 overflow-hidden">
      {/* Soft brand accents */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-32 w-[30rem] h-[30rem] bg-brand-yellow/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-24"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-white/60 mb-6">
            Official Merchandise
          </p>

          <h2 className="text-5xl md:text-6xl font-black tracking-tight text-white mb-6">
            Identity Over Products
          </h2>

          <p className="max-w-2xl mx-auto text-lg text-white/70">
            Every piece represents belief, discipline, and leadership.
            This is not merch. It is alignment.
          </p>
        </motion.div>

        {/* Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {products.map((p, idx) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-zinc-900">
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  quality={95}
                />

                <div className="absolute inset-0 bg-black/20 pointer-events-none" />

                <span className="absolute top-6 left-6 bg-brand-yellow text-black text-xs font-bold px-4 py-1 rounded-full">
                  Limited Drop
                </span>
              </div>

              <div className="mt-6 flex items-start justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-black text-white mb-1">
                    {p.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-2">
                    {p.purpose}
                  </p>
                  <p className="text-brand-yellow text-lg font-bold">
                    {p.price}
                  </p>
                </div>

                <motion.button
                  onClick={() =>
                    addToast(`${p.title} added. You are part of this.`)
                  }
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="h-fit inline-flex items-center gap-2 bg-brand-yellow text-black px-5 py-3 rounded-xl font-bold"
                >
                  <ShoppingCart size={18} />
                  Claim
                </motion.button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Closing message */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-32 text-center border-t border-white/10 pt-20"
        >
          <p className="max-w-2xl mx-auto text-lg text-white/60 mb-10">
            When you wear R.E.S., you represent ambition, discipline, and
            the future of student leadership in South Africa.
          </p>

          <a
            href="#apply"
            className="inline-flex items-center gap-3 text-brand-yellow font-bold text-lg hover:text-yellow-300 transition"
          >
            Apply to Participate
            <span className="text-xl">→</span>
          </a>
        </motion.div>

        {/* Toasts */}
        <div className="fixed right-6 bottom-6 z-50 flex flex-col gap-3">
          <AnimatePresence>
            {toasts.map((t) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: 10, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="bg-white text-black px-5 py-3 rounded-xl shadow-xl border border-brand-yellow"
              >
                <p className="text-sm font-semibold">{t.message}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
