
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const sponsorTiers = [
  {
    tier: "Title Sponsor",
    slots: 1,
    label: "TITLE SPONSOR — 1 AVAILABLE",
    description: "Exclusive naming rights and first-position branding across all R.E.S. platforms, events, and broadcasts.",
    size: "large",
    accent: "border-brand-yellow/40 bg-brand-yellow/5",
    textAccent: "text-brand-yellow",
  },
  {
    tier: "Platinum Sponsors",
    slots: 3,
    label: "PLATINUM — 3 AVAILABLE",
    description: "Premium brand placement, contestant sponsorship, and live-event activations.",
    size: "medium",
    accent: "border-white/20 bg-white/5",
    textAccent: "text-white",
  },
  {
    tier: "Gold Sponsors",
    slots: 5,
    label: "GOLD — 5 AVAILABLE",
    description: "Logo placement on website, streaming platforms, and weekly broadcast mentions.",
    size: "small",
    accent: "border-white/10 bg-white/[0.03]",
    textAccent: "text-white/70",
  },
];

export default function Sponsors() {
  return (
    <section className="relative bg-dark-bg-soft py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-24">

        {/* INTRO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="text-brand-yellow text-xs font-black tracking-[0.25em] uppercase mb-4">Partner with R.E.S.</p>
          <h2 className="text-white text-5xl lg:text-7xl font-black tracking-tight mb-6">Our Partners</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Leading brands and institutions partner with R.E.S. to reach millions of South African youth, drive campus activations, and invest in the next generation of leaders.
          </p>
        </motion.div>

        {/* SPOTLIGHT — TITLE SPONSOR PLACEHOLDER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div className="relative w-full h-[380px] rounded-2xl overflow-hidden border-2 border-dashed border-brand-yellow/30 bg-brand-yellow/5 flex flex-col items-center justify-center gap-4">
            <p className="text-brand-yellow/40 text-6xl font-black">?</p>
            <p className="text-brand-yellow font-black text-sm uppercase tracking-widest">Title Sponsor — Reserved</p>
            <p className="text-white/30 text-xs max-w-xs text-center">Your brand logo will appear here as the exclusive title sponsor of Roomza's Educated Secret</p>
          </div>

          <div>
            <p className="text-xs font-black tracking-[0.25em] uppercase text-brand-yellow/60 mb-3">SPOTLIGHT SPONSOR</p>
            <h3 className="text-5xl font-black text-white mb-6">Your Brand Here</h3>
            <p className="text-gray-300 text-lg leading-relaxed max-w-lg mb-8">
              As the R.E.S. title sponsor, your brand powers South Africa's most exciting student movement — reaching +/- 2M students across 500 campuses through live streams, campus activations and national media.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-10 py-4 border border-white rounded-xl hover:bg-white hover:text-black transition-all font-black text-sm uppercase tracking-wider text-white"
            >
              Enquire About Sponsorship
            </Link>
          </div>
        </motion.div>

        {/* TIERS — PLACEHOLDER GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sponsorTiers.map((tier, i) => (
            <motion.div
              key={tier.tier}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={"border rounded-2xl p-8 " + tier.accent}
            >
              <p className={"text-[10px] font-black uppercase tracking-[0.2em] mb-3 " + tier.textAccent + "/60"}>{tier.label}</p>
              <div className="flex gap-2 mb-6 flex-wrap">
                {Array.from({ length: tier.slots }).map((_, s) => (
                  <div key={s} className="h-14 w-28 rounded-lg border border-dashed border-white/20 bg-white/5 flex items-center justify-center">
                    <span className="text-white/20 text-xs font-black">LOGO</span>
                  </div>
                ))}
              </div>
              <p className="text-white/50 text-sm leading-relaxed">{tier.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h3 className="text-4xl font-black text-white mb-4">Become a Partner</h3>
          <p className="text-gray-300 max-w-lg mx-auto mb-8">
            Join the brands investing in South Africa's next generation. Reach millions of students, families, and communities through R.E.S.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-brand-yellow text-black px-10 py-4 font-black text-sm uppercase tracking-widest rounded-lg hover:bg-yellow-500 transition-all"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
