
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import AnimatedLogos from "@/components/ui/animated-logos";

export default function Sponsors() {
  return (
    <section className="relative bg-white py-40 overflow-hidden">
      {/* Soft background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.15 }}
          transition={{ duration: 1.8 }}
          className="w-[650px] h-[650px] bg-black/5 blur-3xl rounded-full absolute -top-20 -left-10"
        />
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-40">
        {/* INTRO SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h1 className="text-black lg:text-7xl font-black tracking-tight">
            Our Partners
          </h1>
          <p className="text-white-600 text-lg max-w-2xl mx-auto mt-6">
            Leading brands join us to elevate student culture, creativity and digital engagement across South Africa.
          </p>
        </motion.div>
        {/* SPOTLIGHT MAIN SPONSOR */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
        >
          {/* IMAGE WITH PARALLAX */}
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            whileInView={{ clipPath: "inset(0 0 0 0)" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-full h-[420px] rounded-3xl overflow-hidden shadow-2xl"
          >
            <motion.div
              initial={{ scale: 1.05 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.4 }}
              className="w-full h-full"
            >
              <Image
                src="/Images/MTN Group_id6u4FvWmZ_1.png"
                alt="MTN Spotlight Sponsor"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>
          {/* MAIN SPONSOR INFO */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm tracking-widest text-black/50 font-bold">
              SPOTLIGHT SPONSOR
            </p>
            <h3 className="text-5xl font-black mt-4">MTN South Africa</h3>
            <p className="text-gray-700 text-lg mt-6 leading-relaxed max-w-lg">
              MTN powers our digital infrastructure, enabling real time streaming, voting, 
              campus activations and premium student experiences.
            </p>
            <button className="mt-10 px-10 py-4 border border-black rounded-xl hover:bg-black hover:text-white transition-all font-semibold">
              Explore Partnership
            </button>
          </motion.div>
        </motion.div>
        {/* ANIMATED LOGO SHOWCASE */}
        <AnimatedLogos />
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mt-20"
        >
          <h3 className="text-4xl font-black">Become a Partner</h3>
          <p className="text-gray-600 max-w-lg mx-auto mt-4">
            Join top South African brands advancing student experiences nationwide.
          </p>
          <button className="mt-10 px-10 py-4 bg-black text-white text-sm tracking-wide rounded-xl font-bold">
            Apply Now
          </button>
        </motion.div>
      </div>
    </section>
  );
}
