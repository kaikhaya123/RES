'use client';

import { Product } from '@/data/merch';
import ProductCard from './ProductCard';

type Props = {
  products: Product[];
  onAdd: (product: Product) => void;
  onOpen: (product: Product) => void;
};

export default function ProductGrid({ products, onAdd, onOpen }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
      {products.map((product, i) => (
        <ProductCard
          key={product.id}
          product={product}
          onAdd={onAdd}
          onOpen={onOpen}
          index={i}
        />
      ))}
    </div>
  );
}
