'use client';

import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';
import { useCart } from '@/context/cart';

export default function CartDrawer() {
  const { items, open, setOpen, updateQty, remove, count } = useCart();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />

      <aside className="absolute top-0 right-0 h-full w-full sm:w-96 bg-black text-white z-50 p-6 shadow-2xl border-l border-white/10">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-6 pl-6 sm:pl-0">
            <h3 className="text-xl font-black">Your Cart</h3>
            <div className="flex items-center gap-3">
              <span className="text-sm text-white/70">{count} items</span>
              <button onClick={() => setOpen(false)} className="p-2 rounded hover:bg-white/5">
                <X />
              </button>
            </div>
          </div>

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4">
              <p className="text-sm text-white/70">No items yet.</p>
              <Link href="/merch" className="block text-center bg-brand-yellow text-black px-6 py-2 rounded font-bold">Shop Now</Link>
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-between overflow-auto">
              <ul className="space-y-4">
                {items.map((it) => (
                  <li key={`${it.product.id}:${it.size ?? 'default'}`} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 relative rounded overflow-hidden bg-white/5 flex-shrink-0">
                        <Image src={it.product.image} alt={it.product.name} fill sizes="80px" className="object-cover img-lighten" />
                      </div>

                      <div>
                        <div className="font-semibold">{it.product.name}</div>
                        {it.size && <div className="text-xs text-white/60">Size: {it.size}</div>}
                        <div className="text-xs text-white/70">R {(it.product.price / 100).toFixed(2)}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQty(it.product.id, it.qty - 1, it.size)} className="px-2">-</button>
                      <span className="w-6 text-center">{it.qty}</span>
                      <button onClick={() => updateQty(it.product.id, it.qty + 1, it.size)} className="px-2">+</button>
                      <button onClick={() => remove(it.product.id, it.size)} className="ml-2 text-xs underline">Remove</button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-t border-white/5 pt-4">
                <div className="flex items-center justify-between mb-3 font-semibold">
                  <span>Total</span>
                  <span>R {(items.reduce((sum, it) => sum + it.product.price * it.qty, 0) / 100).toFixed(2)}</span>
                </div>
                <Link href="/checkout" onClick={() => setOpen(false)} className="block text-center bg-brand-yellow text-black px-4 py-3 rounded-full font-bold hover:bg-yellow-600 transition">Checkout</Link>
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
