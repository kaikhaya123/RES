"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

type Product = {
  id: string;
  title: string;
  price: string;
  img: string;
};

const products: Product[] = [
  { id: "p1", title: "R.E.S. Hoodie", price: "R450", img: "/Images/ChatGPT Image Dec 4, 2025, 06_17_56 PM.png" },
  { id: "p2", title: "R.E.S. Cap", price: "R150", img: "/Images/ChatGPT Image Dec 4, 2025, 06_27_22 PM.png" },
];

export default function Merch() {
  const [toasts, setToasts] = useState<Array<{ id: string; message: string }>>([]);

  function addToast(message: string) {
    const id = String(Date.now());
    setToasts((t) => [...t, { id, message }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 1600);
  }

  function handleAdd(p: Product) {
    // UI-only confirmation
    addToast(`${p.title} added to cart`);
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.h3
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-gray-900 mb-8 text-center"
        >
          Shop R.E.S. Merch & Digital Goods
        </motion.h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((p, idx) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: idx * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="relative overflow-hidden rounded-lg">
                <div className="relative h-48 md:h-56 lg:h-64 bg-gray-100">
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover w-full h-full transition-transform duration-500 ease-out transform-gpu hover:scale-105"
                    quality={90}
                    priority={idx < 2}
                    loading={idx < 2 ? "eager" : "lazy"}
                  />
                </div>
                {/* limited badge removed per request */}
              </div>

              <div className="mt-4">
                <h4 className="text-md font-semibold text-slate-900">{p.title}</h4>
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-lg font-bold text-slate-800">{p.price}</div>
                  <button
                    onClick={() => handleAdd(p)}
                    className="inline-flex items-center gap-2 bg-indigo-600 text-white text-sm font-medium px-3 py-2 rounded-md shadow-sm hover:bg-indigo-700"
                    aria-label={`Buy ${p.title}`}
                  >
                    <ShoppingCart size={16} />
                    <span>Buy Now</span>
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Toast area */}
        <div className="fixed right-6 bottom-6 z-50 flex flex-col gap-3">
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 12, y: 8 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 6 }}
              className="bg-white border border-gray-100 text-slate-900 px-4 py-2 rounded-lg shadow-md"
            >
              <div className="text-sm font-medium">{t.message}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
