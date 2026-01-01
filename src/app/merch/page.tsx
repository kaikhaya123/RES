'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import HoverReveal from '@/components/merch/HoverReveal';
import HeroSplit from '@/components/merch/HeroSplit';
import ProductGrid from '@/components/merch/ProductGrid';
import ProductModal from '@/components/merch/ProductModal';
import CategoryGrid from '@/components/merch/CategoryGrid';
import CollectionBanner from '@/components/merch/CollectionBanner';
import NewsletterCTA from '@/components/merch/NewsletterCTA';
import CartDrawer from '@/components/merch/CartDrawer';
import Footer from '@/components/layout/Footer';
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

      {/* HERO: split editorial hero inspired by reference */}
      <HeroSplit />

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

      <CollectionBanner />

      <NewsletterCTA />

      <ProductModal
        product={openProduct !== null ? products[openProduct] : null}
        onClose={() => setOpenProduct(null)}
        onAdd={(p: Product, size?: string) => {
          add(p, size);
          setOpenProduct(null);
        }}
      />

      <CartDrawer />

      <Footer />
    </div>
  );
}
