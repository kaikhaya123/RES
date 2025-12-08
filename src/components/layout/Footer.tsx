"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  }

  return (
    <motion.footer
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="bg-black text-white"
    >
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Brand / About */}
          <div>
            <div className="mb-4">
              <Image
                src="/Images/RES Logo with Futuristic Emblem.png"
                alt="R.E.S. logo"
                width={320}
                height={80}
                className="object-contain w-40 md:w-56 lg:w-64"
              />
            </div>

            <div className="mt-4 flex items-center space-x-3">
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-10 h-10 flex items-center justify-center bg-no-repeat bg-center hover:scale-110 transition-transform"
                style={{ backgroundImage: `url('/Images/icons8-tiktok-50.png)`, backgroundSize: '22px 22px' }}
              />

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 flex items-center justify-center bg-no-repeat bg-center hover:scale-110 transition-transform"
                style={{ backgroundImage: `url('/Images/icons8-instagram-30.png')`, backgroundSize: '22px 22px' }}
              />

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 flex items-center justify-center bg-no-repeat bg-center hover:scale-110 transition-transform"
                style={{ backgroundImage: `url('/Images/icons8-youtube-logo-50.png')`, backgroundSize: '22px 22px' }}
              />

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 flex items-center justify-center bg-no-repeat bg-center hover:scale-110 transition-transform"
                style={{ backgroundImage: `url('/Images/icons8-facebook-50 (1).png')`, backgroundSize: '22px 22px' }}
              />
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h3 className="font-display font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition">About</Link></li>
              <li><Link href="/vote" className="text-gray-400 hover:text-white transition">Voting</Link></li>
              <li><Link href="/auth/register" className="text-gray-400 hover:text-white transition">Registration</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition">Contact</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-white transition">Privacy</Link></li>
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Subscribe to our newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">Get show updates, challenges and merch drops straight to your inbox.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="flex-1 px-4 py-2 rounded-md bg-gray-800 text-gray-100 placeholder-gray-400 border border-gray-700 focus:outline-none focus:border-primary-500"
              />
              <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-500 transition">Subscribe</button>
            </form>
            {subscribed && <div className="mt-3 text-sm text-green-400">Thanks — you're subscribed!</div>}

            <div className="mt-6 text-gray-400 text-sm">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-primary-500" />
                <span>info@res-show.co.za</span>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <Phone size={16} className="text-primary-500" />
                <span>+27 78 523 8792</span>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <MapPin size={16} className="text-primary-500" />
                <span>Durban South Africa</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">© 2025 Roomza's Educated Secret. All rights reserved.</p>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
