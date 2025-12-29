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
      className="flex items-center gap-3 text-white/70 hover:text-white transition"
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

        {/* HERO WITH BACKGROUND IMAGE */}
        <section className="relative h-[50vh] sm:h-[60vh] md:h-[75vh] min-h-[320px] md:min-h-[480px] overflow-hidden border-b border-white/10">
          <Image
            src="/Images/sweet-silly-cute-s-girl-with-curly-hairstyle-warm-red-hat-folding-lips-flirty-gazing-u.jpg"
            alt="Contact hero background"
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw"
            className="object-cover object-center"
          />

          {/* subtle overlay (lighter on small screens for image visibility) */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 md:from-black/80 md:via-black/60 to-transparent" aria-hidden="true" />

          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-6xl mx-auto px-6 lg:px-16 w-full">
              <div className="max-w-xl text-center md:text-left md:ml-auto md:mr-12 lg:mr-20">
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight leading-tight">
                  Contact Us
                </h1>
                <p className="mt-3 text-sm sm:text-base md:text-lg text-white/80 max-w-xl">
                  Questions, partnerships, media, or support. Reach out and our team will respond within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* MAIN CONTENT */}
        <section className="py-20 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-start md:items-center">

            {/* CONTACT FORM */}
            <div className="mx-auto lg:mx-0 w-full max-w-lg relative bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-12 backdrop-blur-xl shadow-[0_0_50px_rgba(255,255,255,0.04)]" role="region" aria-labelledby="contact-form-heading">

              <div className="mb-10">
                <h2 className="text-3xl font-black tracking-tight">
                  Get in touch
                </h2>
                <p className="mt-2 text-white/60 max-w-md">
                  Send us a message and our team will respond within 24 hours.
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit} aria-label="Contact form">

                {/* Status */}
                {status === 'success' && (
                  <div role="status" aria-live="polite" className="rounded-md bg-emerald-800/80 border border-emerald-600 p-3 text-emerald-100 text-sm">
                    Thanks! We received your message and will get back soon.
                  </div>
                )}

                {/* Name */}
                <div className="relative">
                  <span className="absolute left-3 top-4 text-white/50">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zM4 20c0-3.866 3.134-7 7-7h2c3.866 0 7 3.134 7 7v1H4v-1z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                    type="text"
                    required
                    placeholder=" "
                    className="peer w-full bg-black/40 border border-white/15 rounded-lg pl-12 px-4 py-4 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow ring-offset-2 transition-shadow"
                  />
                  <label htmlFor="name" className="absolute left-12 top-4 text-sm text-white/60 transition-all peer-placeholder-shown:top-4 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-brand-yellow bg-black px-1">Full name</label>
                </div>

                {/* Email */}
                <div className="relative">
                  <span className="absolute left-3 top-4 text-white/50">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 7l-10 6L2 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    type="email"
                    required
                    placeholder=" "
                    className="peer w-full bg-black/40 border border-white/15 rounded-lg pl-12 px-4 py-4 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow ring-offset-2 transition-shadow"
                  />
<label htmlFor="email" className="absolute left-12 top-4 text-sm text-white/60 transition-all peer-placeholder-shown:top-4 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-brand-yellow bg-black px-1">Email address</label>
                </div>

                {/* Message */}
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    required
                    placeholder=" "
                    className="peer w-full bg-black/40 border border-white/15 rounded-lg px-4 py-4 text-white resize-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow ring-offset-2 transition-shadow"
                  />
<label htmlFor="message" className="absolute left-4 top-4 text-sm text-white/60 transition-all peer-placeholder-shown:top-4 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-brand-yellow bg-black px-1">Message</label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  aria-disabled={status === 'sending'}
                  className="w-full mt-4 bg-brand-yellow text-black font-black py-3 md:py-4 rounded-lg uppercase tracking-wider hover:brightness-110 transition disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-brand-yellow ring-offset-2"
                >
                  {status === 'sending' ? 'Sending…' : 'Send message'}
                </button>

                <p className="text-xs text-white/40 text-center">
                  We usually reply within 24 hours.
                </p>
              </form>
            </div>

            {/* INFO PANEL */}
            <aside className="space-y-8 lg:sticky lg:top-28">

              <div className="bg-white/[0.02] border border-white/8 rounded-lg p-6">
                <h3 className="text-lg font-black mb-3">Contact details</h3>
                <div className="flex flex-col gap-4 text-white/70">
                  <div className="flex items-start gap-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mt-1" xmlns="http://www.w3.org/2000/svg"><path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 7l-10 6L2 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <div>
                      <p className="text-xs uppercase text-white/40 mb-1">Email</p>
                      <p className="font-medium">contact@roomzaseducatedsecret.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mt-1" xmlns="http://www.w3.org/2000/svg"><path d="M22 16.92V21a1 1 0 0 1-1.11 1A19.8 19.8 0 0 1 3 5.11 1 1 0 0 1 4 4h4.09a1 1 0 0 1 1 .75c.12.68.33 1.34.63 1.94a1 1 0 0 1-.24 1.09L8.91 9.91a15.05 15.05 0 0 0 6.18 6.18l1.13-1.13a1 1 0 0 1 1.09-.24c.6.3 1.26.51 1.94.63a1 1 0 0 1 .75 1V21z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <div>
                      <p className="text-xs uppercase text-white/40 mb-1">Phone</p>
                      <p className="font-medium">+27 (0) XX XXX XXXX</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-2">
                    <a href="#" aria-label="Instagram" className="inline-flex items-center justify-center w-9 h-9 rounded bg-white/[0.03] hover:bg-white/[0.06]"><img src="/Icons/instagram(1).png" alt="Instagram" className="w-5 h-5"/></a>
                    <a href="#" aria-label="TikTok" className="inline-flex items-center justify-center w-9 h-9 rounded bg-white/[0.03] hover:bg-white/[0.06]"><img src="/Icons/video.png" alt="TikTok" className="w-5 h-5"/></a>
                    <a href="#" aria-label="Facebook" className="inline-flex items-center justify-center w-9 h-9 rounded bg-white/[0.03] hover:bg-white/[0.06]"><img src="/Icons/facebook(1).png" alt="Facebook" className="w-5 h-5"/></a>
                  </div>
                </div>
              </div>

              <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6">
                <p className="text-white/70 text-sm leading-relaxed">
                  R.E.S. is a national student platform focused on education,
                  leadership, and opportunity across South Africa.
                </p>
              </div>

            </aside>
          </div>
        </section>

        {/* CTA */}
        <section className="relative h-[40vh] min-h-[260px] flex items-center justify-center text-center">
          <div className="absolute inset-0 bg-[url('/Images/handsome-modern-black-man-talking-mobile-phone-pointing-left-person-smiling-standing-min.jpg')] bg-cover bg-center opacity-40" />

          <div className="relative z-10 px-6">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              We Are Always Ready
            </h2>
            <p className="text-white/70 mb-6">
              Let us help you build something meaningful.
            </p>
            <Link
              href="#"
              className="inline-block px-6 py-3 bg-white text-black font-semibold rounded-full"
            >
              Get Started
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
