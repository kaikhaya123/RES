"use client";

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import React, { useState } from 'react';

function SocialIcon({ href, src, alt, label, imgClassName, imgStyle }: { href: string; src: string; alt: string; label: string; imgClassName?: string; imgStyle?: React.CSSProperties }) {
  const [errored, setErrored] = useState(false);

  return (
    <Link href={href} className="transition hover:opacity-90 inline-flex items-center gap-3">
      {!errored ? (
        <img
          src={src}
          alt={alt}
          className={`w-8 h-8 object-contain ${imgClassName || ''}`}
          style={imgStyle}
          onError={() => setErrored(true)}
        />
      ) : (
        <div className="w-8 h-8 bg-white/5 rounded flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" className="text-white/60" />
            <text x="12" y="15" textAnchor="middle" fontSize="10" fill="currentColor" className="text-white/80">{label[0]}</text>
          </svg>
        </div>
      )}
      <span className="text-sm text-white/70 hidden md:inline">{label}</span>
    </Link>
  );
}

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white flex-1">

      {/* HERO */}
      <section className="relative pt-32 pb-24">
        <div className="container mx-auto max-w-4xl px-6 lg:px-16 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight">
            Get in touch
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Questions, partnerships, media inquiries, or support.  
            Reach out and our team will respond within 24 hours.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="pb-32">
        <div className="container mx-auto max-w-6xl px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">

          {/* FORM */}
          <div className="lg:col-span-3">
            <div className="border border-white/10 rounded-2xl p-8 md:p-10 bg-white/5 backdrop-blur">
              <h2 className="text-2xl md:text-3xl font-black mb-2">
                Send a message
              </h2>
              <p className="text-white/60 mb-8">
                Fill in the form and we will get back to you shortly.
              </p>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Full name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Email address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Tell us how we can help"
                    className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-brand-yellow resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-yellow text-black font-black py-4 rounded-lg uppercase tracking-wider hover:brightness-110 transition"
                >
                  Send message
                </button>

                <p className="text-xs text-white/40 text-center pt-2">
                  We typically reply within 24 hours.
                </p>
              </form>
            </div>
          </div>

          {/* INFO */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-lg font-black mb-4">
                Contact details
              </h3>

              <div className="space-y-6 text-white/70">
                <div>
                  <p className="text-sm uppercase tracking-widest text-white/40 mb-1">
                    Email
                  </p>
                  <p>contact@roomzaseducatedsecret.com</p>
                </div>

                <div>
                  <p className="text-sm uppercase tracking-widest text-white/40 mb-1">
                    Phone
                  </p>
                  <p>+27 (0) XX XXX XXXX</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-black mb-4">
                Follow R.E.S.
              </h3>

              {/*
                Place your social icons in: /public/Images/social/
                Recommended filenames: instagram.png, tiktok.png, facebook.png
                You can use .svg, .png, or .webp formats. Images will render at 32x32 by default.
              */}
                <div className="flex items-center justify-start gap-4">
                  {/* Order: Instagram, TikTok, Facebook */}
                  <SocialIcon href="#" src="/Icons/instagram(1).png" alt="Instagram — R.E.S." label="Instagram" />
                  <SocialIcon href="#" src="/Icons/video.png" alt="TikTok — R.E.S." label="TikTok" imgStyle={{ filter: 'invert(1) brightness(2)' }} />
                  <SocialIcon href="#" src="/Icons/facebook(1).png" alt="Facebook — R.E.S." label="Facebook" />
                </div>
            </div>

            <div className="border border-white/10 rounded-xl p-6 bg-white/5">
              <p className="text-sm text-white/70">
                R.E.S. is a national student platform focused on education,
                leadership, and opportunity across South Africa.
              </p>
            </div>
          </div>

        </div>
      </section>

      </main>

      <Footer />
    </>
  );
}
