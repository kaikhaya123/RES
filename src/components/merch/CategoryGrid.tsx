'use client';

import Image from 'next/image';
import { Category } from '@/data/merch';

type Props = {
  categories: Category[];
  selected?: string | null;
  onSelect: (id: string | null) => void;
};

export default function CategoryGrid({ categories, selected, onSelect }: Props) {
  return (
    <section className="mb-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelect(selected === cat.id ? null : cat.id)}
            className={`relative aspect-square overflow-hidden ${
              selected === cat.id ? 'ring-2 ring-brand-yellow' : ''
            }`}
          >
            {cat.image && (
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover"
              />
            )}

            <div className="absolute inset-0 bg-black/30" />

            <div className="absolute bottom-4 left-4">
              <h3 className="font-black text-lg">{cat.name}</h3>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
