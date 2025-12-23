'use client';

import { X } from 'lucide-react';
import { useCart } from '@/context/cart';

export default function CartDrawer() {
  const { items, open, setOpen, updateQty, remove, count } = useCart();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-60">
      <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />

      <aside className="absolute top-0 right-0 h-full w-full sm:w-96 bg-black text-white z-70 p-6 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-black">Your Cart</h3>
          <div className="flex items-center gap-3">
            <span className="text-sm text-white/70">{count} items</span>
            <button onClick={() => setOpen(false)} className="p-2 rounded hover:bg-white/5">
              <X />
            </button>
          </div>
        </div>

        {items.length === 0 ? (
          <p className="text-sm text-white/70">No items yet.</p>
        ) : (
          <ul className="space-y-4">
            {items.map((it) => (
              <li key={it.product.id} className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{it.product.name}</div>
                  <div className="text-xs text-white/70">R {(it.product.price / 100).toFixed(2)}</div>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={() => updateQty(it.product.id, it.qty - 1)} className="px-2">-</button>
                  <span className="w-6 text-center">{it.qty}</span>
                  <button onClick={() => updateQty(it.product.id, it.qty + 1)} className="px-2">+</button>
                  <button onClick={() => remove(it.product.id)} className="ml-2 text-xs underline">Remove</button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 border-t border-white/5 pt-4">
          <a href="#" className="block text-center bg-brand-yellow text-black px-4 py-2 rounded font-bold">Checkout</a>
        </div>
      </aside>
    </div>
  );
}
