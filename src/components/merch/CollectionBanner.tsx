'use client';

import Image from 'next/image';
import Link from 'next/link';

type Props = {
  image?: string;
  title?: string;
  subtitle?: string;
  cta?: string;
};

export default function CollectionBanner({
  image = '/Images/people-making-grimace-expression-with-their-faces-min.jpg',
  title = "ROOMZA'S EDUCATED WEAR COLLECTION",
  subtitle = 'Elevate your wear and downtime with pieces that perform and last.',
  cta = 'Shop Now',
}: Props) {
  return (
    <section className="relative py-14 lg:py-20">
      {/* Full-bleed wrapper */}
      <div className="w-full">
        <div className="relative w-full rounded-none overflow-hidden">

          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            {/* Full-bleed image column */}
            <div className="relative w-full h-80 md:h-[560px] lg:h-[720px]">
              <Image src={image} alt={title} fill className="object-cover object-center w-full h-full" />
              <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* Content — constrained and aligned to the right side */}
            <div className="p-8 md:p-12 lg:p-16 bg-transparent">
              <div className="max-w-3xl ml-auto rounded-l-xl rounded-r-none p-8 md:p-12 bg-white/6">
                <p className="text-sm uppercase tracking-wider text-slate-600 mb-2">Official Collection</p>
                <h2 className="text-3xl md:text-4xl font-black mb-4">{title}</h2>
                <p className="text-slate-700 max-w-lg mb-6">{subtitle}</p>
                <Link href="#products" className="inline-flex items-center px-6 py-3 bg-black text-white rounded-full font-semibold">{cta}</Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
