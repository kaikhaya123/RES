import Image from 'next/image';
import Link from 'next/link';
import { categories } from '@/data/merch';

export default function FeaturedCollections() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <h2 className="text-4xl font-black mb-3">Featured Collections</h2>
        <p className="text-white/60 mb-10 max-w-xl">
          Curated drops built around identity, mindset, and movement.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map(c => (
            <Link
              key={c.id}
              href={`/merch?category=${c.id}`}
              className="group relative overflow-hidden rounded-xl bg-white/5"
            >
              <div className="relative aspect-[4/3]">
                {c.image ? (
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500 img-lighten"
                  />
                ) : (
                  <div className="w-full h-full bg-white/6" />
                )}
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <div>
                  <h3 className="font-black text-lg">{c.name}</h3>
                  <span className="inline-block mt-2 text-sm bg-white/10 px-3 py-1 rounded-full">
                    Explore
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}