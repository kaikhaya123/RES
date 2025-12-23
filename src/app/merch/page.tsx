'use client';

import { useState } from 'react';
import Image from 'next/image';
import HoverReveal from '@/components/merch/HoverReveal';
import Navbar from '@/components/layout/Navbar';
import ProductGrid from '@/components/merch/ProductGrid';
import ProductModal from '@/components/merch/ProductModal';
import { products } from '@/data/merch';
import { useCart } from '@/context/cart';

type CartItem = { productId: string; qty: number };

export default function MerchPage() {
  const [openProduct, setOpenProduct] = useState<number | null>(null);
  const { add } = useCart();

  const onAdd = (product: any) => {
    add(product);
  };

  const onOpen = (product: any) => {
    const idx = products.findIndex((p) => p.id === product.id);
    setOpenProduct(idx);
  };

  const open = openProduct !== null ? products[openProduct] : null;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <section className="relative h-screen min-h-[600px] overflow-hidden">
        <HoverReveal
          frontSrc="/Images/portrait-young-adults-wearing-hoodie-mockup-min.jpg"
          backSrc="/Images/front-view-friends-posing-together-min.jpg"
          alt="Merch hero"
          className="absolute inset-0"
          circles={[{ x: 72, y: 42, delay: 0, radius: 80 }, { x: 28, y: 62, delay: 0.12, radius: 70 }]}
          duration={0.9}
          startRadius={0}
          endRadius={90}
          size="cover"
>
          <div className="relative z-40 max-w-6xl mx-auto px-6 lg:px-12 h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-4">Roomza's Educated Secret – Merch</h1>
              <p className="text-white/80 mb-6">Shop official merch and represent the movement — high quality clothing that supports the show and community projects.</p>
              <a href="#products" className="inline-flex items-center gap-3 bg-brand-yellow text-black px-6 py-3 rounded font-bold">View products</a>
            </div>
          </div>
        </HoverReveal>
      </section>

      <main className="py-20 px-6 lg:px-12 max-w-6xl mx-auto" id="products">
        <h2 className="text-3xl md:text-4xl font-black mb-6">Featured items</h2>
        <ProductGrid products={products} onAdd={onAdd} onOpen={(p) => onOpen(p)} />
      </main>

      <ProductModal product={open} onClose={() => setOpenProduct(null)} onAdd={(p) => { onAdd(p); setOpenProduct(null); }} />

      {/* Site-wide cart drawer renders from Navbar via context */}
    </div>
  );
}
