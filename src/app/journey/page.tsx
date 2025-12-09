'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function JourneyPage() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-8 bg-black text-white">
        <div className="max-w-3xl text-center">
          <h1 className="text-3xl font-bold mb-4">Journey</h1>
          <p className="text-gray-300">This is the Journey page. Content coming soon.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
