"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";

type Product = {
  id: string;
  title: string;
  price: string;
  img: string;
  };

const products: Product[] = [
  {     id: "p1",     title: "R.E.S. Hoodie",     price: "R450",     img: "/Images/modern-loose-fit-hoodie-mockup-for-fashion-brands-and-online-stores-promo-use-01452.png"   },
  {     id: "p2",     title: "R.E.S. Cap",     price: "R150",     img: "/Images/high-res-image.png" }
];

export default function Merch() {
  const [toasts, setToasts] = useState<    Array<{ id: string; message: string }>  >([]);

  function addToast(message: string) {
    const id = String(Date.now());
    setToasts((t) => [...t, { id, message }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 1800);
  }

  function handleAdd(p: Product) {
    addToast(`${p.title} added to cart`);
  }

  return (
    <section className="relative bg-gradient-to-br from-[#070812] via-[#0b0f17] to-[#071025] pt-24 pb-32 overflow-hidden">
      {/* Accents */}
      <div className="absolute -top-28 -left-28 w-80 h-80 bg-brand-yellow/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-24 w-96 h-96 bg-pink-500/6 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-lg">R.E.S. Premium Merch</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mt-3">Limited styles, bold designs, premium quality. Shop limited drops curated for the R.E.S. movement.          </p>
        </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {products.map((p, idx) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, delay: idx * 0.06 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="group relative rounded-2xl overflow-hidden shadow-2xl bg-white/6 backdrop-blur-sm border border-white/6 transition-transform duration-300"
            >
              <div className="relative aspect-[4/5] bg-gradient-to-br from-[#0b0f14] to-[#0b0f17]">
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  quality={90}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none" />
<div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-brand-yellow text-black font-bold text-xs shadow-sm">Limited</div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 justify-between bg-black/30 backdrop-blur-sm px-3 py-2 rounded-lg">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-200">R.E.S. Exclusive</span>
                    <span className="text-sm font-bold text-white truncate">{p.title}</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-xs text-gray-300">From</span>
                    <span className="text-lg font-extrabold text-brand-yellow">{p.price}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 flex items-center justify-between gap-4">
                <div className="flex-1">
                <h3 className="text-lg md:text-xl font-black text-white">{p.title}</h3>
                  <p className="text-sm text-gray-300 mt-1">Premium materials, sustainable production. Perfect fit and feel.</p>
                </div>

                  <motion.button
                    onClick={() => handleAdd(p)}
                  aria-label={`Add ${p.title} to cart`}
                    whileTap={{ scale: 0.96 }}
whileHover={{ scale: 1.03 }}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-yellow to-yellow-400 text-black px-4 py-2 rounded-xl font-bold shadow-lg"
                  >
                    <ShoppingCart size={16} />
                    Add
                  </motion.button>
                              </div>
            </motion.article>
          ))}
        </div>

                <div className="fixed right-6 bottom-6 z-50 flex flex-col gap-3">
          <AnimatePresence>
            {toasts.map((t) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: 8, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 8, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-white/95 border border-brand-yellow shadow-lg px-4 py-3 rounded-xl"
              >
                <p className="text-sm text-black font-semibold">{t.message}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
