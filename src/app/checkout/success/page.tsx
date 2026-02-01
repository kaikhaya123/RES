'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { FiCheckCircle, FiMail, FiPackage, FiArrowRight } from 'react-icons/fi';
import confetti from 'canvas-confetti';

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const [orderNumber] = useState(() => `RES-${Date.now().toString().slice(-8)}`);

  useEffect(() => {
    // Trigger confetti animation on mount
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ['#FBBF24', '#FFFFFF', '#F59E0B'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-24 md:py-32">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6">
            <FiCheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-4">
            Order Confirmed!
          </h1>
          <p className="text-lg text-white/80 mb-2">
            Thank you for your purchase
          </p>
          <p className="text-sm text-white/60">
            Order #{orderNumber}
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Email Confirmation */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-honey-tan/20 rounded-full flex items-center justify-center flex-shrink-0">
                <FiMail className="w-6 h-6 text-honey-tan" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Check Your Email</h3>
                <p className="text-sm text-white/70">
                  We've sent you a confirmation email with your order details and tracking information.
                </p>
              </div>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-honey-tan/20 rounded-full flex items-center justify-center flex-shrink-0">
                <FiPackage className="w-6 h-6 text-honey-tan" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Shipping Updates</h3>
                <p className="text-sm text-white/70">
                  You'll receive tracking information once your order ships. Estimated delivery: 3-5 business days.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-gradient-to-br from-honey-tan/10 to-honey-tan/5 border border-honey-tan/20 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-black mb-6">What's Next?</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-honey-tan text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                1
              </div>
              <div>
                <h3 className="font-bold mb-1">Order Processing</h3>
                <p className="text-sm text-white/70">
                  We're preparing your order and will send you an email when it ships.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-honey-tan text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                2
              </div>
              <div>
                <h3 className="font-bold mb-1">Shipping & Tracking</h3>
                <p className="text-sm text-white/70">
                  Track your package in real-time once it's on its way.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-honey-tan text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                3
              </div>
              <div>
                <h3 className="font-bold mb-1">Delivery & Enjoy</h3>
                <p className="text-sm text-white/70">
                  Your RES merch will arrive at your door. Rock it with pride!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push('/merch')}
            className="flex items-center justify-center gap-2 bg-honey-tan text-black px-8 py-4 rounded-full font-bold hover:bg-honey-tan-400 transition"
          >
            Continue Shopping
            <FiArrowRight />
          </button>
          <button
            onClick={() => router.push('/')}
            className="flex items-center justify-center gap-2 border border-white/10 text-white px-8 py-4 rounded-full font-bold hover:bg-white/5 transition"
          >
            Back to Home
          </button>
        </div>

        {/* Support Section */}
        <div className="mt-12 text-center">
          <p className="text-sm text-white/60 mb-2">Need help with your order?</p>
          <a
            href="/contact"
            className="text-honey-tan hover:text-honey-tan-400 transition font-semibold text-sm"
          >
            Contact Support
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
