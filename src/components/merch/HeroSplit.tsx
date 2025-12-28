import Image from 'next/image';
import Link from 'next/link';

export default function HeroSplit() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 h-[68vh] md:h-[78vh]">
        <div className="relative">
          <Image src="/Images/portrait-young-beautiful-woman-gesticulating.jpg" alt="Move" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        </div>

        <div className="relative">
          <Image src="/Images/side-view-male-wearing-cap-with-arms-crossed.jpg" alt="Rest" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent" />
        </div>
      </div>

      {/* centered headline without panel — text over images */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="z-20 w-full max-w-3xl text-center">
          <h1 className="text-[1rem] sm:text-[1.25rem] md:text-[1.75rem] lg:text-[2.5rem] xl:text-[3rem] font-extrabold leading-[1.06] md:leading-[1.04] lg:leading-[1.02] text-white tracking-tight drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]">
            <span className="block">COMPETE.</span>
            <span className="block">COLLABORATE.</span>
            <span className="block">CHANGE.</span>
          </h1>

          <p className="mt-1 text-white/95 text-xs md:text-sm max-w-md mx-auto leading-[1.02] tracking-normal">Official R.E.S. merchandise — limited drops and performance-ready apparel for students who compete and lead. A portion of proceeds supports competitions and community programs.</p>

          <div className="mt-4">
            <Link href="#products" aria-label="Shop the collection" className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black font-semibold uppercase rounded-full hover:opacity-95 transition text-sm">Shop the collection</Link>
          </div>
        </div>
      </div>

      {/* decorative divider line below hero on desktop */}
      <div className="absolute left-0 right-0 bottom-0">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 -mb-6">
          <div className="h-0.5 bg-white/6 rounded-full" />
        </div>
      </div>
    </section>
  );
}
