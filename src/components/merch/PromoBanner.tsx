import Image from 'next/image';

export default function PromoBanner() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-10 items-center">
        <div className="rounded-xl overflow-hidden bg-white/5">
          <div className="relative aspect-[16/9]">
            <Image
              src="/Images/pexels-cottonbro-10677492.jpg"
              alt="Store"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <h3 className="text-3xl font-black mb-4">
            Limited Drop. No Restocks.
          </h3>
          <p className="text-white/70 mb-6 max-w-lg">
            Once it sells out, it is gone. Built for those who move first.
          </p>

          <div className="flex items-center gap-6">
            <div className="bg-white/5 px-6 py-4 rounded-lg">
              <p className="text-sm text-white/70">Launch Discount</p>
              <p className="text-4xl font-black">30%</p>
            </div>

            <button className="px-6 py-3 bg-brand-yellow text-black font-black rounded-full">
              View Drop
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
