'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SmoothScrollImpact } from '@/components/impact/SmoothScrollImpact';

export default function ImpactPage() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <SmoothScrollImpact />
      </main>
      <Footer />
    </div>
  );
}
