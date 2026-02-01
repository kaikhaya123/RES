'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CheckCircle } from 'lucide-react';

export default function ApplyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      {/* Spacer to offset fixed navbar height for this page */}
      <div className="h-16 md:h-20 lg:h-24" aria-hidden="true" />

      <main className="flex-1 px-4 py-10">
        <div className="max-w-4xl mx-auto space-y-16">

          {/* Hero */}
          <section className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-black uppercase">
              Apply to Compete
            </h1>
            <p className="text-white/70 max-w-2xl">
              This is not entertainment only. It is opportunity, growth, and national exposure.
            </p>
          </section>

          {/* Eligibility */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">Eligibility</h2>
            <ul className="space-y-3">
              {[
                'Registered student at a South African institution',
                'Aged 18 to 25',
                'Available for weekly challenges',
                'Strong communication and commitment'
              ].map(item => (
                <li key={item} className="flex gap-3 text-white/80">
                  <CheckCircle className="w-5 h-5 text-honey-tan" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Timeline */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Application Timeline</h2>
            <div className="border border-white/10 rounded-lg p-6 space-y-2">
              <p>Application dates will be announced soon.</p>
              <p>Sign up for updates or check back later for official dates.</p>
            </div>
          </section>

          {/* CTA */}
          <section>
            <a
              href="/apply/form"
              className="inline-block bg-honey-tan text-black font-bold px-10 py-4 rounded-lg hover:opacity-90 transition"
            >
              Start Application
            </a>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
