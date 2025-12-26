'use client';

import Image from 'next/image';
import FeaturedMobileCard from './FeaturedMobileCard';
import { Category } from '@/data/merch';
import useInView from '@/hooks/useInView';

type Props = {
  categories: Category[];
  selected?: string | null;
  onSelect: (id: string | null) => void;
  variant?: 'editorial' | 'minimal' | 'split' | 'rail' | 'responsive';
};

function CategoryTile({ category, active, onClick }: { category: Category; active?: boolean; onClick: () => void }) {
  const { ref, inView } = useInView<HTMLButtonElement>({ once: true, threshold: 0.2 });

  return (
    <button
      ref={ref as any}
      onClick={onClick}
      className={`relative rounded-none overflow-hidden border border-white/6 bg-white/[0.02] text-left p-0 focus:outline-none focus:ring-2 focus:ring-brand-yellow transition ${
        active ? 'ring-2 ring-brand-yellow' : ''
      } ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
      aria-pressed={active}
      aria-label={`Filter by ${category.name}`}
    >
      <div className="relative w-full h-full" style={{ aspectRatio: '1 / 1' }}>
        {category.image && (
          <Image src={category.image} alt={category.name} fill className="object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
        <div className="absolute left-4 bottom-4">
          <h3 className="font-black text-lg">{category.name}</h3>
          {category.description && <p className="text-sm text-white/70">{category.description}</p>}
        </div>
      </div>
    </button>
  );
}

export default function CategoryGrid({ categories, selected = null, onSelect, variant = 'responsive' }: Props) {
  // For responsive: editorial on lg, rail on small
  if (variant === 'minimal') {
    return (
      <div>
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => onSelect(null)}
            className="px-3 py-1 rounded-none bg-white/5 hover:bg-white/10 text-sm font-semibold"
          >
            View all
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelect(selected === cat.id ? null : cat.id)}
              className={`aspect-square rounded-none bg-white/5 border border-white/10 hover:border-brand-yellow transition p-4 font-semibold text-left ${
                selected === cat.id ? 'ring-2 ring-brand-yellow' : ''
              }`}
            >
              <div className="h-full w-full relative overflow-hidden rounded-none">
                {cat.image && <Image src={cat.image} alt={cat.name} fill className="object-cover" />}
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 flex items-end p-4">
                  <span className="font-black">{cat.name}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'split') {
    const left = categories[0];
    const right = categories.slice(1, 5);

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-1">
          <h2 className="text-4xl font-black">Shop The Drop</h2>
          <p className="text-white/70 mt-4">Official show merchandise.</p>
          <div className="mt-6">
            <button
              onClick={() => onSelect(null)}
              className="rounded-none px-4 py-2 bg-white/5 hover:bg-white/10"
            >
              View all
            </button>
          </div>
        </div>
        <div className="lg:col-span-2 grid grid-cols-2 gap-6">
          {right.map((cat) => (
            <button key={cat.id} onClick={() => onSelect(selected === cat.id ? null : cat.id)} className="aspect-square rounded-none bg-white/5 overflow-hidden">
              <div className="relative w-full h-full">
                {cat.image && <Image src={cat.image} alt={cat.name} fill className="object-cover" />}
                <div className="absolute inset-0 bg-black/30" />
                <span className="absolute left-4 bottom-4 font-black">{cat.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'rail') {
    return (
      <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4">
        <div className="snap-start min-w-[120px]">
          <button onClick={() => onSelect(null)} className="px-3 py-2 rounded-none bg-white/5 hover:bg-white/10">View all</button>
        </div>

        {categories.map((cat) => (
          <div key={cat.id} className="snap-start min-w-[260px]">
            <CategoryTile
              category={cat}
              active={selected === cat.id}
              onClick={() => onSelect(selected === cat.id ? null : cat.id)}
            />
          </div>
        ))}
      </div>
    );
  }

  // Default responsive: editorial on lg, horizontal rail on small
  const featured = categories.find((c) => c.featured) || categories[0];
  const small = categories.filter((c) => c.id !== featured?.id).slice(0, 4);
  const rightTop = small[0];
  const bottomTwo = small.slice(1, 3);

  return (
    <div>
      {/* mobile: featured + rail */}
      <div className="lg:hidden">
        {/* Mobile featured card (animated client-side) */}
        <FeaturedMobileCard featured={featured} selected={selected} onSelect={(id) => onSelect(id)} />

        {/* Supporting categories below - two column grid to mirror desktop hierarchy */}
        <div className="grid grid-cols-2 gap-3">
          {small.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelect(selected === cat.id ? null : cat.id)}
              className="h-36 overflow-hidden"
            >
              <div className="relative w-full h-full">
                {cat.image && <Image src={cat.image} alt={cat.name} fill className="object-cover" />}
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute left-3 bottom-3">
                  <h4 className="text-white text-sm font-black">{cat.name}</h4>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* desktop: editorial (balanced heights & larger previews) */}
      <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 h-[520px] md:h-[560px] rounded-none overflow-hidden">
          <button onClick={() => onSelect(selected === featured?.id ? null : (featured?.id || null))} className="w-full h-full">
            <div className="relative w-full h-full bg-black">
              {/* use object-cover so the image fills the tile edge-to-edge for visual alignment */}
              {featured?.image && (
                <Image src={featured.image} alt={featured.name} fill className="object-cover object-center" priority />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

              <div className="absolute inset-0 flex items-end">
                <div className="p-4 md:p-8 max-w-[75%] text-left">
                  <h3 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight drop-shadow-lg">{featured?.name}</h3>
                  {featured?.description && (
                    <p className="text-white/80 mt-3 text-base md:text-lg">{featured.description}</p>
                  )}
                </div>
              </div>
            </div>
          </button>
        </div>

        <div className="h-[520px] md:h-[560px] grid grid-rows-3 gap-3">
          {/* top large tile (takes more presence) */}
          <div className="row-span-2 rounded-none overflow-hidden bg-black">
            {small[0] && (
              <button
                key={small[0].id}
                onClick={() => onSelect(selected === small[0].id ? null : small[0].id)}
                className="w-full h-full"
              >
                <div className="relative w-full h-full overflow-hidden">
                  {small[0].image && <Image src={small[0].image} alt={small[0].name} fill className="object-cover" />}
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute left-4 bottom-4">
                    <h4 className="text-white text-lg md:text-xl font-black">{small[0].name}</h4>
                  </div>
                </div>
              </button>
            )}
          </div>

          {/* bottom: two larger preview tiles */}
          <div className="row-span-1 grid grid-cols-2 gap-4">
            {small.slice(1, 3).map((cat) => (
              <button key={cat.id} onClick={() => onSelect(selected === cat.id ? null : cat.id)} className="rounded-none overflow-hidden h-40 md:h-48">
                <div className="relative w-full h-full overflow-hidden bg-black">
                  {cat.image && <Image src={cat.image} alt={cat.name} fill className="object-cover" />}
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute left-4 bottom-4">
                    <h5 className="text-white text-sm md:text-base font-black">{cat.name}</h5>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
