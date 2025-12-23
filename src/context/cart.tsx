'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { products, Product } from '@/data/merch';

type Entry = { productId: string; qty: number };
export type CartItem = { product: Product; qty: number };

type CartContextValue = {
  items: CartItem[];
  count: number;
  add: (product: Product) => void;
  updateQty: (productId: string, qty: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
  toggle: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [open, setOpen] = useState(false);

  function add(product: Product) {
    setEntries((prev) => {
      const found = prev.find((p) => p.productId === product.id);
      if (found) return prev.map((p) => (p.productId === product.id ? { ...p, qty: p.qty + 1 } : p));
      return [...prev, { productId: product.id, qty: 1 }];
    });
    setOpen(true);
  }

  function updateQty(productId: string, qty: number) {
    if (qty <= 0) return setEntries((p) => p.filter((i) => i.productId !== productId));
    setEntries((p) => p.map((it) => (it.productId === productId ? { ...it, qty } : it)));
  }

  function remove(productId: string) {
    setEntries((p) => p.filter((i) => i.productId !== productId));
  }

  const items = entries
    .map((e) => ({ product: products.find((p) => p.id === e.productId)!, qty: e.qty }))
    .filter((i) => i.product);

  const count = entries.reduce((s, e) => s + e.qty, 0);

  const toggle = () => setOpen((v) => !v);

  return (
    <CartContext.Provider
      value={{ items, count, add, updateQty, remove, clear: () => setEntries([]), open, setOpen, toggle }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const c = useContext(CartContext);
  if (!c) throw new Error('useCart must be used within a CartProvider');
  return c;
}
