'use client';

import Image from 'next/image';
import type { Product } from '@/data/merch';

type Props = {
  product: Product | null;
  onClose: () => void;
  onAdd: (product: Product) => void;
};

export default function ProductModal({ product, onClose, onAdd }: Props) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative z-10 max-w-4xl w-full bg-black rounded-lg ring-1 ring-white/6 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative overflow-hidden" style={{ aspectRatio: '4 / 3' }}>
            <Image src={product.image} alt={product.name} fill className="object-contain bg-black/5" />
          </div>

          <div className="p-6 lg:p-8">
            <div className="flex items-center gap-4 mb-3">
              <h3 className="text-2xl font-black">{product.name}</h3>
              {product.tag && <span className="text-xs uppercase bg-white/5 text-white px-2 py-1 rounded">{product.tag}</span>}
            </div>

            {product.category && (
              <div className="mb-3">
                <span className="text-xs uppercase tracking-wider text-white/80 bg-white/5 px-2 py-1">{product.category}</span>
              </div>
            )}

            <p className="text-white/70 mb-4">{product.description}</p>

            <div className="flex items-center gap-4 mb-4">
              {product.sizes && (
                <div>
                  <div className="text-sm text-white/60">Sizes</div>
                  <div className="mt-1 flex gap-2 flex-wrap">
                    {product.sizes.map((s) => (
                      <span key={s} className="text-white text-sm bg-white/5 px-2 py-1">{s}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="ml-auto text-sm">
                {product.stock && product.stock > 0 ? (
                  <span className="text-white/90">In stock {product.stock}</span>
                ) : (
                  <span className="text-white/60">Availability: 0</span>
                )}
              </div>
            </div>

            <p className="font-semibold text-lg mb-6">R {(product.price / 100).toFixed(2)}</p>

            <div className="flex items-center gap-4">
              <button
                onClick={() => onAdd(product)}
                disabled={product.stock === 0}
                aria-disabled={product.stock === 0}
                className={`bg-brand-yellow text-black px-4 py-2 rounded-full font-semibold hover:bg-yellow-300 transition ${product.stock === 0 ? 'opacity-40 cursor-not-allowed' : ''}`}
              >
                Add to cart
              </button>

              <button onClick={onClose} className="text-white/70 underline">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
