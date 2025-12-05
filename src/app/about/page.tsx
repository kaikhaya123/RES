'use client';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function AboutSplit() {
  return (
    <>
      <Navbar />
      <section className="w-full bg-white px-6 py-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* Left Content */}
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Who We Are
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            R.E.S. is a national student platform built for South African youth.
            We focus on digital engagement, leadership growth, and equal access
            to opportunities for students across all provinces.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            You get a space where real stories, ideas, and talent are shared.
            The platform connects institutions, campuses, and student communities
            in one modern digital experience.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed">
            Our work supports student development through innovation, education,
            and national participation.
          </p>
        </div>

        {/* Right Image Stack */}
        <div className="space-y-4">
          {/* Top Large Image */}
          <Image
            src="/Images/download (14).png"
            alt="Students"
            width={900}
            height={600}
            className="rounded-xl border border-black shadow-md w-full object-cover"
          />

          {/* Bottom Two Images */}
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/Images/download (15).jpg"
              alt="Students talking"
              width={450}
              height={300}
              className="rounded-xl border border-black shadow-md w-full object-cover"
            />

            <Image
              src="/Images/Instagram (1).jpg"
              alt="Campus scene"
              width={450}
              height={300}
              className="rounded-xl border border-black shadow-md w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
    <Footer />
    </>
  );
}
