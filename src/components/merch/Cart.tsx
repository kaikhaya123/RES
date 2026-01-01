'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/data/merch';

type CartItem = { product: Product; qty: number };

type Props = {
  items: CartItem[];
  onUpdateQty: (productId: string, qty: number) => void;
  onRemove: (productId: string) => void;
};

export default function Cart({ items, onUpdateQty, onRemove }: Props) {
  const [open, setOpen] = useState(false);

  const total = items.reduce((s, it) => s + it.product.price * it.qty, 0);

  return (
    <div
      className="fixed z-50"
      style={{
        bottom: 'calc(env(safe-area-inset-bottom, 0px) + 1.5rem)',
        right: 'calc(env(safe-area-inset-right, 0px) + 1.5rem)'
      }}
    >
      <button
        onClick={() => setOpen((s) => !s)}
        className="bg-brand-yellow text-black px-4 py-3 rounded-full font-bold"
        aria-expanded={open}
        aria-label="Toggle cart"
      >
        Cart ({items.reduce((s, it) => s + it.qty, 0)})
      </button>

      {open && (
        <div className="mt-3 w-80 bg-black rounded-lg border border-white/5 p-4 shadow-xl">
          <h4 className="font-black mb-3">Your cart</h4>
          {items.length === 0 ? (
            <p className="text-sm text-white/70">No items yet.</p>
          ) : (
            <ul className="space-y-3 max-h-72 overflow-auto">
              {items.map((it) => (
                <li key={it.product.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{it.product.name}</div>
                    <div className="text-xs text-white/70">R {(it.product.price / 100).toFixed(2)}</div> 
                  </div>

                  <div className="flex items-center gap-2">
                    <button onClick={() => onUpdateQty(it.product.id, it.qty - 1)} className="px-2">-</button>
                    <span className="w-5 text-center">{it.qty}</span>
                    <button onClick={() => onUpdateQty(it.product.id, it.qty + 1)} className="px-2">+</button>
                    <button onClick={() => onRemove(it.product.id)} className="ml-2 text-xs underline">Remove</button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-4 border-t border-white/5 pt-3">
            <div className="flex items-center justify-between font-semibold mb-3">Total <span>R {(total / 100).toFixed(2)}</span></div>
            <Link href="/checkout" className="block text-center bg-brand-yellow text-black px-4 py-3 rounded-full font-bold hover:bg-yellow-300 transition">Checkout</Link>
          </div>
        </div>
      )}
    </div>
  );
}
