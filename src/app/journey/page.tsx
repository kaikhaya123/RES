'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SmoothScrollJourney } from '@/components/journey/SmoothScrollJourney';

export default function JourneyPage() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <SmoothScrollJourney />
      </main>
      <Footer />
    </div>
  );
}
