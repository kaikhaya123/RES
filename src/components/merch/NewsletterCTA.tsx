export default function NewsletterCTA() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-[url('/Images/antoine-transon-3CIN7OxIABo-unsplash.jpg')] bg-cover bg-center opacity-20" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-12">
        <div className="bg-black/60 rounded-xl p-10 md:p-14 flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <h3 className="text-3xl font-black">Join the Inner Circle</h3>
            <p className="mt-2 text-white/70 max-w-md">
              Early access to drops, private discounts, and exclusive merch.
            </p>
          </div>

          <form className="flex w-full md:w-auto">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-3 bg-black/30 text-white outline-none w-full rounded-l-md"
            />
            <button className="px-6 py-3 bg-brand-yellow text-black font-black rounded-r-md">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
