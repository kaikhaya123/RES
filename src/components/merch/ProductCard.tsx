'use client';

import Image from 'next/image';
import { Product } from '@/data/merch';

type Props = {
  product: Product;
  onAdd: (product: Product, size?: string) => void;
  onOpen: (product: Product) => void;
  index?: number;
};

import useInView from '@/hooks/useInView';

export default function ProductCard({ product, onAdd, onOpen, index = 0 }: Props) {
  const { ref, inView } = useInView<HTMLElement>({ once: true, threshold: 0.12 });

  return (
    <article
      ref={ref as any}
      className={`group bg-white/4 rounded-lg overflow-hidden border border-white/8 shadow-md cursor-pointer transform hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 h-full flex flex-col`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(18px)',
        transitionDelay: `${Math.min(index * 65, 350)}ms`,
      }}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden bg-white/5 rounded-t-lg flex-shrink-0 p-3 md:p-0"
        style={{ aspectRatio: '3 / 4' }}
        onClick={() => onOpen(product)}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain md:object-cover transition-transform duration-700 md:group-hover:scale-105 img-lighten"
        />

        <button
          aria-label="Add to wishlist"
          className="absolute right-3 top-3 bg-white/5 w-8 h-8 flex items-center justify-center rounded-full text-white hover:bg-white/10 transition"
          onClick={(e)=>{ e.stopPropagation(); /* TODO: wishlist handler */ }}
        >
          ♡
        </button>

        {/* Quick add / stock indicator */}
        <div className="absolute right-3 bottom-3">
          <button
            onClick={(e) => { e.stopPropagation(); if (product.sizes && product.sizes.length > 0) { onOpen(product); } else { onAdd(product); } }}
            disabled={product.stock === 0}
            aria-disabled={product.stock === 0}
            className={`bg-brand-yellow text-black w-9 h-9 flex items-center justify-center rounded-full text-sm font-semibold shadow ${product.stock === 0 ? 'opacity-40 cursor-not-allowed' : ''}`}
          >
            +
          </button>
        </div>
      </div>

      {/* Info block */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-white font-semibold text-sm md:text-base leading-tight line-clamp-2 md:line-clamp-none">{product.name}</h3>

          {/* moved category label directly under title */}
          {product.category && (
            <div className="mt-2">
              <span className="text-xs uppercase tracking-wider text-white/80 bg-white/5 px-2 py-1">{product.category}</span>
            </div>
          )}

          {/* SKU metadata - hidden on small screens for compact layout */}
          <div className="mt-2 text-white/60 text-xs hidden md:block">SKU: <span className="text-white/80">{product.id}</span></div>



          <div className="mt-3 flex items-center gap-3 flex-wrap text-sm text-white/60">
            {product.sizes && <div>Sizes: <span className="text-white/80">{product.sizes.join(', ')}</span></div>}
            <div className={`ml-auto font-medium ${product.stock && product.stock > 0 ? 'text-white/90' : 'text-red-400'}`}>
              {product.stock && product.stock > 0 ? `In stock ${product.stock}` : 'Out of stock'}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-white font-black text-xl">R {(product.price / 100).toFixed(2)}</span>

          <div className="flex items-center gap-3">
            <button
              onClick={(e) => { e.stopPropagation(); if (product.sizes && product.sizes.length > 0) { onOpen(product); } else { onAdd(product); } }}
              disabled={product.stock === 0}
              aria-disabled={product.stock === 0}
              className={`bg-brand-yellow text-black px-3 py-1 rounded-full text-sm font-semibold hover:bg-yellow-300 transition ${product.stock === 0 ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
              Add
            </button>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onOpen(product); }}
              className="border border-white/10 px-3 py-1 rounded-none text-white text-sm hover:bg-white/5 transition"
            >
              View
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
