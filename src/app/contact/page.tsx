'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';

function SocialIcon({
  href,
  src,
  alt,
  label,
}: {
  href: string;
  src: string;
  alt: string;
  label: string;
}) {
  const [errored, setErrored] = useState(false);

  return (
    <Link
      href={href}
      className="flex items-center gap-3 text-slate-700 hover:text-black transition"
    >
      {!errored ? (
        <img
          src={src}
          alt={alt}
          className="w-8 h-8 object-contain"
          onError={() => setErrored(true)}
        />
      ) : (
        <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center text-xs">
          {label[0]}
        </div>
      )}
      <span className="text-sm">{label}</span>
    </Link>
  );
}

export default function ContactPage() {
  const [status, setStatus] = useState<'idle'|'sending'|'success'|'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      // Simulate send (replace with real API call)
      await new Promise((res) => setTimeout(res, 800));
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      // Reset success state after short delay
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <>
      <Navbar />

      <main className="bg-black text-white">

        {/* HERO WITH RESPONSIVE IMAGE */}
        <section className="overflow-hidden border-b border-black/10">
          {/* Mobile: stacked image above content (plain <img> fallback for reliability) */}
          <div className="block md:hidden w-full h-56 sm:h-72 relative overflow-hidden">
            <img
              src="/Images/cheerful-young-dark-skinned-feminine-girl-has-mobile-phone-conversation-wears-round-transparent-glasses-has-charming-smile-hears-good-news-isolated-purple-studio-wall-copy-space-area.jpg"
              alt="Person smiling while on a call"
              className="w-full h-full object-cover sm:object-contain"
              loading="eager"
              onError={(e) => { console.warn('mobile hero image failed to load', e); (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </div>

          {/* Desktop: absolute background image with content overlay */}
          <div className="relative h-[50vh] sm:h-[60vh] md:h-[75vh] min-h-[320px] md:min-h-[480px]">
            <div className="hidden md:block absolute inset-0">
              <Image
                src="/Images/3d-render-abstract-particle-design-background.jpg"
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 80vw, 60vw"
                className="object-cover object-center"
                aria-hidden
              />
            </div>

            {/* Content */}
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="max-w-6xl mx-auto px-6 lg:px-16 w-full">
              <div className="max-w-xl mx-auto text-center md:text-center md:rounded-md md:p-6">
                  <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight leading-tight text-white md:text-white">
                    Contact Us
                  </h1>
                  <p className="mt-3 text-sm sm:text-base md:text-lg text-white/90 max-w-xl">
                    Questions, partnerships, media, or support. Reach out and our team will respond within 24 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MAIN CONTENT */}
        <section className="py-20 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-start md:items-center">

            {/* CONTACT FORM */}
            <div className="mx-auto lg:mx-0 w-full max-w-lg relative bg-brand-yellow text-black border border-black/10 rounded-2xl p-6 md:p-12 shadow-lg" role="region" aria-labelledby="contact-form-heading">

              <div className="mb-10">
        <h2 id="contact-form-heading" className="text-3xl font-black tracking-tight text-black">
                  Get in touch
                </h2>
                <p className="mt-2 text-black/70 max-w-md">
                  Send us a message and our team will respond within 24 hours.
                </p>
              </div>

              <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit} aria-labelledby="contact-form-heading">

                {/* Status */}
                <div className="md:col-span-2">
                  {status === 'success' && (
                    <div role="status" aria-live="polite" className="rounded-md bg-emerald-800/80 border border-emerald-600 p-3 text-black-100 text-sm mb-2">
                      Thanks! We received your message and will get back soon.
                    </div>
                  )}
                </div>

                {/* Name */}
                <div className="md:col-span-1">
                  <label htmlFor="name" className="block text-sm font-medium text-black/80 mb-2">Full name</label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                    type="text"
                    required
                    aria-required="true"
                    className="w-full h-12 bg-white border border-black-200 rounded-md px-4 text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow ring-offset-2 transition-shadow"
                  />
                </div>

                {/* Email */}
                <div className="md:col-span-1">
                  <label htmlFor="email" className="block text-sm font-medium text-black/80 mb-2">Email address</label>
                  <input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    type="email"
                    required
                    aria-required="true"
                    className="w-full h-12 bg-white border border-gray-200 rounded-md px-4 text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow ring-offset-2 transition-shadow"
                  />
                </div>

                {/* Message */}
                <div className="md:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-black/80 mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    required
                    aria-required="true"
                    className="w-full min-h-[140px] bg-white border border-gray-200 rounded-md px-4 py-3 text-black resize-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow ring-offset-2 transition-shadow"
                  />
                </div>

                {/* Submit */}
                <div className="md:col-span-2 flex items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    aria-disabled={status === 'sending'}
                    className="inline-flex items-center justify-center gap-3 bg-black text-brand-yellow font-black py-3 px-6 rounded-lg uppercase tracking-wider hover:brightness-95 transition disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-brand-yellow ring-offset-2"
                  >
                    {status === 'sending' ? 'Sending…' : 'Send message'}
                  </button>

                  <p className="text-xs text-black/60 hidden md:block">We usually reply within 24 hours.</p>
                </div>

              </form>
            </div>

            {/* INFO PANEL */}
            <aside className="space-y-8 lg:sticky lg:top-28">

              <div className="bg-brand-yellow-50 border border-black-100 rounded-lg p-6">
                <h3 className="text-lg font-black mb-3">Contact details</h3>
                <div className="flex flex-col gap-4 text-slate-700">
                  <div className="flex items-start gap-3">
                    <img src="/Icons/contact/hand.png" alt="Email icon" className="w-5 h-5 mt-1" />
                    <div>
                      <p className="text-xs uppercase text-slate-500 mb-1">Email</p>
                      <p className="font-medium">contact@roomzaseducatedsecret.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <img src="/Icons/contact/viber.png" alt="Phone icon" className="w-5 h-5 mt-1" />
                    <div>
                      <p className="text-xs uppercase text-slate-500 mb-1">Phone</p>
                      <p className="font-medium">+27 (0) XX XXX XXXX</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-2">
                    <a href="#" aria-label="Instagram" className="inline-flex items-center justify-center w-9 h-9 rounded bg-transparent hover:bg-gray-100"><img src="/Icons/instagram(1).png" alt="Instagram" className="w-5 h-5"/></a>
                    <a href="#" aria-label="TikTok" className="inline-flex items-center justify-center w-9 h-9 rounded bg-transparent hover:bg-gray-100"><img src="/Icons/video.png" alt="TikTok" className="w-5 h-5"/></a>
                    <a href="#" aria-label="Facebook" className="inline-flex items-center justify-center w-9 h-9 rounded bg-transparent hover:bg-gray-100"><img src="/Icons/facebook(1).png" alt="Facebook" className="w-5 h-5"/></a>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-100 rounded-xl p-6">
                <p className="text-slate-700 text-sm leading-relaxed">
                  R.E.S. is a national student platform focused on education,
                  leadership, and opportunity across South Africa.
                </p>
              </div>

            </aside>
          </div>
        </section>

        {/* CTA */}
        <section className="relative h-[40vh] min-h-[260px] flex items-center justify-center text-center">
          {/* mobile fallback img in case CSS bg does not render on some devices */}
          <img
            src="/Images/3d-render-concept-old-telephone-3d-art-design-illustration.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover block md:hidden"
            loading="eager"
            onError={(e) => { console.warn('mobile CTA image failed to load', e); (e.target as HTMLImageElement).style.display = 'none'; }}
          />

          <div className="absolute inset-0 bg-[url('/Images/3d-render-concept-old-telephone-3d-art-design-illustration.jpg')] bg-cover bg-center" />

          <div className="relative z-10 px-6 w-full max-w-xl mx-auto md:mx-0 md:ml-auto md:mr-12 text-center md:text-right">
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-white">
              We Are Always Ready
            </h2>
            <p className="text-white/90 mb-6">
              Let us help you build something meaningful.
            </p>
            <div className="md:flex md:justify-end">
              <Link
                href="#"
                className="inline-block px-6 py-3 bg-white text-black font-semibold rounded-full"
              >
                Get Started
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
