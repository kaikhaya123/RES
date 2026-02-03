'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail } from 'lucide-react';
import Lottie from 'lottie-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // Fetch Lottie animation from public folder
    fetch('/lottie-files/Figure Message sent.json')
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => {
        console.error('Failed to load animation:', error);
        // Animation will fallback to mail icon
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Failed to send reset email');
        setIsLoading(false);
        return;
      }

      setSubmitted(true);
      setIsLoading(false);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black flex">
      {/* LEFT FORM SECTION */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full lg:w-1/2 flex items-center justify-center p-8"
      >
        <div className="w-full max-w-md">
          {/* Logo */}
        <div className="flex justify-center mb-12">
            <Image 
                src="/Images/RES Logo with Futuristic Emblem.png" 
                alt="R.E.S. Logo"
                width={90}
                height={90}
                className="object-contain"
                priority
            />
        </div>

        {submitted ? (
            <div className="text-center">
            <div className="flex justify-center mb-6">
                {animationData ? (
                  <Lottie 
                    animationData={animationData}
                    loop={false}
                    autoplay={true}
                    style={{ width: 200, height: 200 }}
                    className="filter brightness-125"
                  />
                ) : (
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Mail className="text-green-400" size={32} />
                  </div>
                )}
            </div>
              <h1 className="text-3xl font-bold text-white mb-4">Check Your Email</h1>
              <p className="text-white mb-6 text-lg leading-relaxed">
                We've sent a password reset link to <span className="font-semibold text-gray-900">{email}</span>. 
                Please check your inbox and click the link to reset your password.
              </p>
              <p className="text-sm text-white mb-8">
                The link will expire in 24 hours.
              </p>
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-2 text-white hover:text-gray-900 transition font-medium"
              >
                <ArrowLeft size={18} />
                Back to Login
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-10">
                <h1 className="text-4xl font-bold text-white mb-3">Reset your password</h1>
                <p className="text-white text-lg">Enter the email address you used to register with.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-white">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  />
                </div>

                {error && (
                  <div className="">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ scale: 1.01 }}
                  className="w-full py-4 bg-white text-black font-semibold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Send ...' : 'Send'}
                </motion.button>
              </form>

              {/* Sign up link */}
              <div className="mt-8 text-center">
                <span className="text-gray-600">Don't have an account? </span>
                <Link href="/auth/register" className="text-white font-semibold hover:underline">
                  Sign up
                </Link>
              </div>
            </>
          )}
        </div>
      </motion.div>

      {/* RIGHT IMAGE SECTION */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="hidden lg:block w-1/2 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <Image
            src="/Images/3d-portrait-people.jpg"
            alt="Students studying"
            fill
            className="object-cover"
            priority
          />
        </div>
      </motion.div>
    </div>
  );
}
