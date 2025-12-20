'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { motion } from 'framer-motion';
import { X, User, LayoutDashboard, LogOut } from 'lucide-react';
import { UserAvatar } from './UserAvatar';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 20);
        ticking = false;
      });
    };
    // Use a passive listener so scroll handling doesn't block touch/mouse input
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-warm-stone-base/95 shadow-lg'
          : 'bg-gradient-to-b from-black/40 to-transparent'
      }`}
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20 lg:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center relative z-10" aria-label="R.E.S. Home">
            <div className="relative w-12 md:w-16 lg:w-20 h-12 md:h-16 lg:h-20">
              <Image
                src="/Images/RES%20Logo%20with%20Futuristic%20Emblem.png"
                alt="R.E.S. - Roomza's Educated Secret"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Center Navigation */}
          <div className="hidden lg:flex items-center space-x-8 lg:space-x-12">
            <Link 
              href="/about" 
              className={`font-light text-sm lg:text-base transition-colors focus:outline-none focus:ring-2 focus:ring-amber-300 px-2 py-1 rounded ${isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white hover:text-amber-300 drop-shadow-md'}`}
              aria-label="About the competition"
            >
              About
            </Link>
            <Link 
              href="/movement" 
              className={`font-light text-sm lg:text-base transition-colors focus:outline-none focus:ring-2 focus:ring-amber-300 px-2 py-1 rounded ${isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white hover:text-amber-300 drop-shadow-md'}`}
              aria-label="Learn about our movement"
            >
              Movement
            </Link>
            <Link 
              href="/challenges" 
              className={`font-light text-sm lg:text-base transition-colors focus:outline-none focus:ring-2 focus:ring-amber-300 px-2 py-1 rounded ${isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white hover:text-amber-300 drop-shadow-md'}`}
              aria-label="View challenges"
            >
              Challenges
            </Link>
            <Link 
              href="/apply" 
              className={`font-light text-sm lg:text-base transition-colors focus:outline-none focus:ring-2 focus:ring-amber-300 px-2 py-1 rounded ${isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white hover:text-amber-300 drop-shadow-md'}`}
              aria-label="Apply to compete"
            >
              Apply
            </Link>
            <Link 
              href="/news" 
              className={`font-light text-sm lg:text-base transition-colors focus:outline-none focus:ring-2 focus:ring-amber-300 px-2 py-1 rounded ${isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white hover:text-amber-300 drop-shadow-md'}`}
              aria-label="Read latest news"
            >
              News
            </Link>
            <Link 
              href="/journey" 
              className={`font-light text-sm lg:text-base transition-colors focus:outline-none focus:ring-2 focus:ring-amber-300 px-2 py-1 rounded ${isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white hover:text-amber-300 drop-shadow-md'}`}
              aria-label="Follow the journey"
            >
              Journey
            </Link>
            <Link 
              href="/impact" 
              className={`font-light text-sm lg:text-base transition-colors focus:outline-none focus:ring-2 focus:ring-amber-300 px-2 py-1 rounded ${isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white hover:text-amber-300 drop-shadow-md'}`}
              aria-label="See our impact"
            >
              Impact
            </Link>
          </div>

          {/* Right Section - User Avatar & Menu */}
          <div className="flex items-center gap-2 md:gap-4 lg:gap-6">
            {/* User Avatar with Dropdown */}
            <UserAvatar session={session} isScrolled={isScrolled} />

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 transition relative w-12 h-12 flex items-center justify-center lg:hidden focus:outline-none focus:ring-2 focus:ring-amber-300 rounded ${isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white hover:text-white/80 drop-shadow-md'}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {/* Top line */}
              <motion.div
                className="absolute w-6 h-0.5 bg-current rounded-full"
                animate={isMobileMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                aria-hidden="true"
              />
              {/* Middle line */}
              <motion.div
                className="absolute w-6 h-0.5 bg-current rounded-full"
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.3 }}
                aria-hidden="true"
              />
              {/* Bottom line */}
              <motion.div
                className="absolute w-6 h-0.5 bg-current rounded-full"
                animate={isMobileMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 8 }}
                transition={{ duration: 0.3 }}
                aria-hidden="true"
              />
            </motion.button>
          </div>
        </div>

        {/* Full Screen Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Mobile navigation">
            {/* Dark Background */}
            <div 
              className="absolute inset-0 bg-gray-900" 
              onClick={() => setIsMobileMenuOpen(false)}
              role="button"
              tabIndex={0}
              aria-label="Close menu"
              onKeyDown={(e) => {
                if (e.key === 'Escape') setIsMobileMenuOpen(false);
              }}
            ></div>
            
            {/* Content Container */}
            <div className="relative h-full flex flex-col">
              {/* Header */}
              <div className="container mx-auto px-6 lg:px-12">
                <div className="flex items-center justify-between h-24">
                  <Link 
                    href="/" 
                    onClick={() => requestAnimationFrame(() => setIsMobileMenuOpen(false))} 
                    className="flex items-center focus:outline-none focus:ring-2 focus:ring-amber-300 rounded p-1"
                    aria-label="R.E.S. Home"
                  >
                    <div className="relative w-20 h-20">
                      <Image
                        src="/Images/RES%20Logo%20with%20Futuristic%20Emblem.png"
                        alt="R.E.S. - Roomza's Educated Secret"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </Link>

                  <button
                    onClick={() => requestAnimationFrame(() => setIsMobileMenuOpen(false))}
                    className="p-2 text-white hover:text-white/80 transition focus:outline-none focus:ring-2 focus:ring-amber-300 rounded"
                    aria-label="Close navigation menu"
                  >
                    <X size={28} strokeWidth={1.5} aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Menu Content */}
              <div className="flex-1 container mx-auto px-6 lg:px-12 py-12 overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                  {/* Left Column - Main Menu */}
                  <nav className="flex flex-col justify-center space-y-4 lg:space-y-6" aria-label="Main menu">
                    <Link 
                      href="/about" 
                      className="text-4xl lg:text-7xl text-white hover:text-white/70 font-light transition leading-tight focus:outline-none focus:ring-2 focus:ring-amber-300 px-2 py-1 rounded"
                      onClick={() => requestAnimationFrame(() => setIsMobileMenuOpen(false))}
                      aria-label="About the competition"
                    >
                      About
                    </Link>
                    <Link 
                      href="/movement" 
                      className="text-4xl lg:text-7xl text-white hover:text-white/70 font-light transition leading-tight focus:outline-none focus:ring-2 focus:ring-amber-300 px-2 py-1 rounded"
                      onClick={() => requestAnimationFrame(() => setIsMobileMenuOpen(false))}
                      aria-label="Learn about our movement"
                    >
                      Movement
                    </Link>
                    <Link 
                      href="/challenges" 
                      className="text-4xl lg:text-7xl text-white hover:text-white/70 font-light transition leading-tight focus:outline-none focus:ring-2 focus:ring-amber-300 px-2 py-1 rounded"
                      onClick={() => requestAnimationFrame(() => setIsMobileMenuOpen(false))}
                      aria-label="View challenges"
                    >
                      Challenges
                    </Link>
                    <Link 
                      href="/apply" 
                      className="text-4xl lg:text-7xl text-white hover:text-white/70 font-light transition leading-tight focus:outline-none focus:ring-2 focus:ring-amber-300 px-2 py-1 rounded"
                      onClick={() => requestAnimationFrame(() => setIsMobileMenuOpen(false))}
                      aria-label="Apply to compete"
                    >
                      Apply
                    </Link>
                    <Link 
                      href="/news" 
                      className="text-4xl lg:text-7xl text-white hover:text-white/70 font-light transition leading-tight focus:outline-none focus:ring-2 focus:ring-amber-300 px-2 py-1 rounded"
                      onClick={() => requestAnimationFrame(() => setIsMobileMenuOpen(false))}
                      aria-label="Read latest news"
                    >
                      News
                    </Link>
                    <Link 
                      href="/journey" 
                      className="text-4xl lg:text-7xl text-white hover:text-white/70 font-light transition leading-tight focus:outline-none focus:ring-2 focus:ring-amber-300 px-2 py-1 rounded"
                      onClick={() => requestAnimationFrame(() => setIsMobileMenuOpen(false))}
                      aria-label="Follow the journey"
                    >
                      Journey
                    </Link>
                    <Link 
                      href="/impact" 
                      className="text-4xl lg:text-7xl text-white hover:text-white/70 font-light transition leading-tight focus:outline-none focus:ring-2 focus:ring-amber-300 px-2 py-1 rounded"
                      onClick={() => requestAnimationFrame(() => setIsMobileMenuOpen(false))}
                      aria-label="See our impact"
                    >
                      Impact
                    </Link>
                  </nav>

                  {/* Right Column - Secondary Menu */}
                  <nav className="flex flex-col justify-center space-y-4 lg:space-y-6" aria-label="Secondary menu">
                    <Link 
                      href="/stream" 
                      className="text-3xl lg:text-5xl text-white hover:text-white/70 font-light transition focus:outline-none focus:ring-2 focus:ring-amber-300 px-2 py-1 rounded"
                      onClick={() => requestAnimationFrame(() => setIsMobileMenuOpen(false))}
                      aria-label="Watch live stream"
                    >
                      Watch Live
                    </Link>
                    <Link 
                      href="/contact" 
                      className="text-3xl lg:text-5xl text-white hover:text-white/70 font-light transition focus:outline-none focus:ring-2 focus:ring-amber-300 px-2 py-1 rounded"
                      onClick={() => setIsMobileMenuOpen(false)}
                      aria-label="Contact us"
                    >
                      Contact
                    </Link>

                    <div className="pt-6 lg:pt-8 space-y-3 lg:space-y-4 border-t border-white/20">
                      {session ? (
                        <>
                          <Link
                            href="/dashboard"
                            className="flex items-center gap-3 text-xl lg:text-2xl text-white hover:text-white/70 font-light transition focus:outline-none focus:ring-2 focus:ring-amber-300 px-2 py-1 rounded"
                            onClick={() => requestAnimationFrame(() => setIsMobileMenuOpen(false))}
                            aria-label="Go to dashboard"
                          >
                            <LayoutDashboard size={24} aria-hidden="true" />
                            Dashboard
                          </Link>
                          <button
                            onClick={async () => {
                              setIsMobileMenuOpen(false);
                              await signOut({ callbackUrl: '/' });
                            }}
                            className="flex items-center gap-3 text-xl lg:text-2xl text-white hover:text-white/70 font-light transition w-full text-left focus:outline-none focus:ring-2 focus:ring-amber-300 px-2 py-1 rounded"
                            aria-label="Log out"
                          >
                            <LogOut size={24} aria-hidden="true" />
                            Logout
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            href="/auth/login"
                            className="flex items-center gap-3 text-xl lg:text-2xl text-white hover:text-white/70 font-light transition focus:outline-none focus:ring-2 focus:ring-amber-300 px-2 py-1 rounded"
                            onClick={() => requestAnimationFrame(() => setIsMobileMenuOpen(false))}
                            aria-label="Log in to your account"
                          >
                            <User size={24} aria-hidden="true" />
                            Login
                          </Link>
                          <Link
                            href="/auth/register"
                            className="flex items-center gap-3 text-xl lg:text-2xl text-white hover:text-white/70 font-light transition focus:outline-none focus:ring-2 focus:ring-amber-300 px-2 py-1 rounded"
                            onClick={() => requestAnimationFrame(() => setIsMobileMenuOpen(false))}
                            aria-label="Create a new account"
                          >
                            <User size={24} aria-hidden="true" />
                            Sign Up
                          </Link>
                        </>
                      )}
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
