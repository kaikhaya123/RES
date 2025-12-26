'use client';

import Image from 'next/image';
import useInView from '@/hooks/useInView';
import { Category } from '@/data/merch';

type Props = {
  featured?: Category | null;
  selected?: string | null;
  onSelect: (id: string | null) => void;
};

export default function FeaturedMobileCard({ featured, selected, onSelect }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>({ once: true, threshold: 0.12 });

  if (!featured) {
    return <div className="mb-3 h-[160px] w-full" />;
  }

  return (
    <div ref={ref as any} className="mb-3 h-[360px] w-full overflow-hidden">
      <button
        onClick={() => onSelect(selected === featured?.id ? null : (featured?.id || null))}
        className="w-full h-full"
        aria-label={featured?.name ?? 'Featured'}
      >
        <div className="relative w-full h-full">
          {featured?.image && <Image src={featured.image} alt={featured.name} fill className="object-contain object-center" />}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div
            className={`absolute inset-0 flex items-end transition-all duration-700 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="p-4 md:p-6 max-w-[90%]">
              <h3 className="text-white text-2xl md:text-3xl font-black leading-tight">{featured?.name}</h3>
              {featured?.description && <p className="text-white/80 mt-2 text-sm md:text-base">{featured.description}</p>}
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}
