'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { products, Product } from '@/data/merch';

type Entry = { productId: string; qty: number; size?: string };
export type CartItem = { product: Product; qty: number; size?: string };

type CartContextValue = {
  items: CartItem[];
  count: number;
  add: (product: Product, size?: string) => void;
  updateQty: (productId: string, qty: number, size?: string) => void;
  remove: (productId: string, size?: string) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
  toggle: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [open, setOpen] = useState(false);

  function add(product: Product, size?: string) {
    setEntries((prev) => {
      const found = prev.find((p) => p.productId === product.id && p.size === size);
      if (found) return prev.map((p) => (p.productId === product.id && p.size === size ? { ...p, qty: p.qty + 1 } : p));
      return [...prev, { productId: product.id, qty: 1, size }];
    });
    setOpen(true);
  }

  function updateQty(productId: string, qty: number, size?: string) {
    if (qty <= 0) return setEntries((p) => p.filter((i) => !(i.productId === productId && i.size === size)));
    setEntries((p) => p.map((it) => (it.productId === productId && it.size === size ? { ...it, qty } : it)));
  }

  function remove(productId: string, size?: string) {
    setEntries((p) => p.filter((i) => !(i.productId === productId && i.size === size)));
  }

  const items = entries
    .map((e) => ({ product: products.find((p) => p.id === e.productId)!, qty: e.qty, size: e.size }))
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
