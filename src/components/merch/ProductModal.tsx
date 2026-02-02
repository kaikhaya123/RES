'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import type { Product } from '@/data/merch';

type Props = {
  product: Product | null;
  onClose: () => void;
  onAdd: (product: Product, size?: string) => void;
};

export default function ProductModal({ product, onClose, onAdd }: Props) {
  const [sizeOpen, setSizeOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/60" onClick={() => { setSelectedSize(null); onClose(); }} />

      <div className="relative z-10 max-w-4xl w-full bg-black rounded-lg ring-1 ring-white/6 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative overflow-hidden" style={{ aspectRatio: '4 / 3' }}>
            <Image src={product.image} alt={product.name} fill sizes="(max-width: 768px) 100vw, 40vw" className="object-contain bg-black/5 img-lighten" />
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

            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                {product.sizes && product.sizes.length > 0 && (
                  <div>
                    <div className="text-sm text-white/60">Sizes</div>
                    <div className="mt-1 relative inline-block">
                      <button
                        type="button"
                        onClick={() => setSizeOpen((s) => !s)}
                        className="text-white bg-white/5 px-3 py-1 rounded w-36 text-left"
                      >
                        {selectedSize ?? 'Select size'}
                      </button>

                      {sizeOpen && (
                        <div className="absolute mt-1 bg-black border border-white/5 rounded shadow-md z-20 w-36">
                          {product.sizes.map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => { setSelectedSize(s); setSizeOpen(false); }}
                              className="block w-full text-left px-3 py-2 text-sm text-white hover:bg-white/5"
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

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
                onClick={() => { onAdd(product, selectedSize ?? undefined); setSelectedSize(null); }}
                disabled={product.stock === 0 || (product.sizes && product.sizes.length > 0 && !selectedSize)}
                aria-disabled={product.stock === 0 || (product.sizes && product.sizes.length > 0 && !selectedSize)}
                className={`bg-brand-yellow text-black px-4 py-2 rounded-full font-semibold hover:bg-yellow-600 transition ${product.stock === 0 || (product.sizes && product.sizes.length > 0 && !selectedSize) ? 'opacity-40 cursor-not-allowed' : ''}`}
              >
                Add to cart
              </button>

              <button onClick={() => { setSelectedSize(null); onClose(); }} className="text-white/70 underline">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
