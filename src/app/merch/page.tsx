'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import HoverReveal from '@/components/merch/HoverReveal';
import ProductGrid from '@/components/merch/ProductGrid';
import ProductModal from '@/components/merch/ProductModal';
import CategoryGrid from '@/components/merch/CategoryGrid';
import PromoBanner from '@/components/merch/PromoBanner';
import FeaturedCollections from '@/components/merch/FeaturedCollections';
import NewsletterCTA from '@/components/merch/NewsletterCTA';
import { products, categories, type Product } from '@/data/merch';
import { useCart } from '@/context/cart';

export default function MerchPage() {
  const [openProduct, setOpenProduct] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { add } = useCart();

  const filtered = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative h-screen min-h-[680px] overflow-hidden">
        <HoverReveal
          frontSrc="/Images/antoine-transon-3CIN7OxIABo-unsplash.jpg"
          backSrc="/Images/pexels-cottonbro-7520736.jpg"
          alt="Roomza Educated Wear"
          className="absolute inset-0"
          size="cover"
          duration={0.9}
          circles={[
            { x: 68, y: 46, radius: 96, delay: 0 },
            { x: 34, y: 70, radius: 86, delay: 0.15 }
          ]}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />

        <div className="relative z-20 h-full flex items-end">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-24 w-full">
            <h1 className="leading-[0.9] font-black tracking-tight text-brand-yellow">
              <span className="block text-5xl md:text-7xl">Roomza’s</span>
              <span className="block text-4xl md:text-6xl italic">Educated Wear</span>
            </h1>

            <p className="mt-4 max-w-xl text-white/80">
              Purpose-built apparel inspired by growth, discipline, and ambition.
              Designed for students who move different.
            </p>

            <a
              href="#products"
              className="inline-flex mt-8 px-7 py-3 bg-brand-yellow text-black font-black uppercase rounded-full hover:bg-yellow-300 transition"
            >
              Shop Collection
            </a>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <main id="products" className="py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <header className="mb-10">
            <h2 className="text-4xl font-black">New Arrivals</h2>
            <p className="mt-2 text-white/60 max-w-xl">
              Hoodies, caps, and sweaters engineered for comfort and confidence.
            </p>
          </header>

          <CategoryGrid
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />

          <div className="flex items-center justify-between mt-10 mb-6">
            <div>
              <h3 className="font-semibold">
                {selectedCategory
                  ? categories.find(c => c.id === selectedCategory)?.name
                  : 'All Products'}
              </h3>
              {selectedCategory && (
                <p className="text-sm text-white/60">
                  Filtered selection
                </p>
              )}
            </div>

            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 transition"
              >
                Clear filter
              </button>
            )}
          </div>

          <ProductGrid
            products={filtered}
            onAdd={add}
            onOpen={(p) =>
              setOpenProduct(products.findIndex(x => x.id === p.id))
            }
          />
        </div>
      </main>

      <PromoBanner />
      <FeaturedCollections />
      <NewsletterCTA />

      <ProductModal
        product={openProduct !== null ? products[openProduct] : null}
        onClose={() => setOpenProduct(null)}
        onAdd={(p: Product) => {
          add(p);
          setOpenProduct(null);
        }}
      />
    </div>
  );
}
