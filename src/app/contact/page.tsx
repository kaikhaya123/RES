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
  return (
    <>
      <Navbar />

      <main className="bg-black text-white">

        {/* HERO WITH BACKGROUND IMAGE */}
        <section className="relative h-[75vh] min-h-[480px] overflow-hidden border-b border-white/10">
          <Image
            src="/Images/sweet-silly-cute-s-girl-with-curly-hairstyle-warm-red-hat-folding-lips-flirty-gazing-u.jpg"
            alt="Contact hero background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

         
          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-6xl mx-auto px-6 lg:px-16">
              <div className="max-w-xl md:ml-auto md:mr-12 lg:mr-20">
                <h1 className="text-4xl md:text-6xl font-black tracking-tight">
                  Contact Us
                </h1>
                <p className="mt-4 text-white/70">
                  Questions, partnerships, media, or support.
                  Reach out and our team will respond within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* MAIN CONTENT */}
        <section className="py-28">
          <div className="max-w-6xl mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

            {/* CONTACT FORM */}
            <div className="relative bg-white/[0.03] border border-white/10 rounded-2xl p-8 md:p-12 backdrop-blur-xl shadow-[0_0_50px_rgba(255,255,255,0.04)]">

              <div className="mb-10">
                <h2 className="text-3xl font-black tracking-tight">
                  Get in touch
                </h2>
                <p className="mt-2 text-white/60 max-w-md">
                  Send us a message and our team will respond within 24 hours.
                </p>
              </div>

              <form className="space-y-6">

                {/* Name */}
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder=" "
                    className="peer w-full bg-black/40 border border-white/15 rounded-lg px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                  />
                  <label className="absolute left-4 top-4 text-sm text-white/60 transition-all
                    peer-placeholder-shown:top-4
                    peer-focus:-top-2
                    peer-focus:text-xs
                    peer-focus:text-brand-yellow
                    bg-black px-1">
                    Full name
                  </label>
                </div>

                {/* Email */}
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder=" "
                    className="peer w-full bg-black/40 border border-white/15 rounded-lg px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                  />
                  <label className="absolute left-4 top-4 text-sm text-white/60 transition-all
                    peer-placeholder-shown:top-4
                    peer-focus:-top-2
                    peer-focus:text-xs
                    peer-focus:text-brand-yellow
                    bg-black px-1">
                    Email address
                  </label>
                </div>

                {/* Message */}
                <div className="relative">
                  <textarea
                    rows={6}
                    required
                    placeholder=" "
                    className="peer w-full bg-black/40 border border-white/15 rounded-lg px-4 py-4 text-white resize-none focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                  />
                  <label className="absolute left-4 top-4 text-sm text-white/60 transition-all
                    peer-placeholder-shown:top-4
                    peer-focus:-top-2
                    peer-focus:text-xs
                    peer-focus:text-brand-yellow
                    bg-black px-1">
                    Message
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full mt-4 bg-brand-yellow text-black font-black py-4 rounded-lg uppercase tracking-wider hover:brightness-110 transition"
                >
                  Send message
                </button>

                <p className="text-xs text-white/40 text-center">
                  We usually reply within 24 hours.
                </p>
              </form>
            </div>

            {/* INFO PANEL */}
            <div className="space-y-12">

              <div>
                <h3 className="text-xl font-black mb-4">
                  Contact details
                </h3>

                <div className="space-y-5 text-white/70">
                  <div>
                    <p className="text-xs uppercase text-white/40 mb-1">Email</p>
                    <p>contact@roomzaseducatedsecret.com</p>
                  </div>

                  <div>
                    <p className="text-xs uppercase text-white/40 mb-1">Phone</p>
                    <p>+27 (0) XX XXX XXXX</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-black mb-4">
                  Follow R.E.S.
                </h3>

                <div className="space-y-3">
                  <SocialIcon href="#" src="/Icons/instagram(1).png" alt="Instagram" label="Instagram" />
                  <SocialIcon href="#" src="/Icons/video.png" alt="TikTok" label="TikTok" />
                  <SocialIcon href="#" src="/Icons/facebook(1).png" alt="Facebook" label="Facebook" />
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <p className="text-white/70 text-sm leading-relaxed">
                  R.E.S. is a national student platform focused on education,
                  leadership, and opportunity across South Africa.
                </p>
              </div>

            </div>
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
