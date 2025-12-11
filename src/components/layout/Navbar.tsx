'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { Menu, X, User, LayoutDashboard, LogOut } from 'lucide-react';
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
          ? 'bg-warm-stone-base/95 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center relative z-10">
            <div className="relative w-20 h-20">
              <Image
                src="/Images/RES Logo with Futuristic Emblem.png"
                alt="R.E.S."
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Center Navigation */}
          <div className="hidden lg:flex items-center space-x-12">
            <Link href="/about" className={`font-light text-base transition ${isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white hover:text-white/80 drop-shadow-md'}`}>
              About
            </Link>
            <Link href="/journey" className={`font-light text-base transition ${isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white hover:text-white/80 drop-shadow-md'}`}>
              Journey
            </Link>
            <Link href="/impact" className={`font-light text-base transition ${isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white hover:text-white/80 drop-shadow-md'}`}>
              Impact
            </Link>
          </div>

          {/* Right Section - User Avatar & Menu */}
          <div className="flex items-center gap-4 lg:gap-6">
            {/* User Avatar with Dropdown */}
            <UserAvatar session={session} isScrolled={isScrolled} />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 transition ${isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white hover:text-white/80 drop-shadow-md'}`}
            >
              <Menu size={28} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Full Screen Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50">
            {/* Dark Background */}
            <div className="absolute inset-0 bg-gray-900"></div>
            
            {/* Content Container */}
            <div className="relative h-full flex flex-col">
              {/* Header */}
              <div className="container mx-auto px-6 lg:px-12">
                <div className="flex items-center justify-between h-24">
                  <Link href="/" onClick={() => requestAnimationFrame(() => setIsMobileMenuOpen(false))} className="flex items-center">
                    <div className="relative w-20 h-20">
                      <Image
                        src="/Images/RES Logo with Futuristic Emblem.png"
                        alt="R.E.S."
                        fill
                        className="object-contain"
                      />
                    </div>
                  </Link>

                  <button
                    onClick={() => requestAnimationFrame(() => setIsMobileMenuOpen(false))}
                    className="p-2 text-white hover:text-white/80 transition"
                  >
                    <X size={28} strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              {/* Menu Content */}
              <div className="flex-1 container mx-auto px-6 lg:px-12 py-12 overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                  {/* Left Column - Main Menu */}
                  <div className="flex flex-col justify-center space-y-4 lg:space-y-6">
                    <Link 
                      href="/about" 
                      className="text-4xl lg:text-7xl text-white hover:text-white/70 font-light transition leading-tight"
                      onClick={() => requestAnimationFrame(() => setIsMobileMenuOpen(false))}
                    >
                      About
                    </Link>
                    <Link 
                      href="/journey" 
                      className="text-4xl lg:text-7xl text-white hover:text-white/70 font-light transition leading-tight"
                      onClick={() => requestAnimationFrame(() => setIsMobileMenuOpen(false))}
                    >
                      Journey
                    </Link>
                    <Link 
                      href="/contestants" 
                      className="text-4xl lg:text-7xl text-white hover:text-white/70 font-light transition leading-tight"
                      onClick={() => requestAnimationFrame(() => setIsMobileMenuOpen(false))}
                    >
                      Contestants
                    </Link>
                    <Link 
                      href="/impact" 
                      className="text-4xl lg:text-7xl text-white hover:text-white/70 font-light transition leading-tight"
                      onClick={() => requestAnimationFrame(() => setIsMobileMenuOpen(false))}
                    >
                      Impact
                    </Link>
                  </div>

                  {/* Right Column - Secondary Menu */}
                  <div className="flex flex-col justify-center space-y-4 lg:space-y-6">
                    <Link 
                      href="/vote" 
                      className="text-3xl lg:text-5xl text-white hover:text-white/70 font-light transition"
                      onClick={() => requestAnimationFrame(() => setIsMobileMenuOpen(false))}
                    >
                      Vote
                    </Link>
                    <Link 
                      href="/stream" 
                      className="text-3xl lg:text-5xl text-white hover:text-white/70 font-light transition"
                      onClick={() => requestAnimationFrame(() => setIsMobileMenuOpen(false))}
                    >
                      Watch Live
                    </Link>
                    <Link 
                      href="/contact" 
                      className="text-3xl lg:text-5xl text-white hover:text-white/70 font-light transition"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Contact
                    </Link>

                    <div className="pt-6 lg:pt-8 space-y-3 lg:space-y-4 border-t border-white/20">
                      {session ? (
                        <>
                          <Link
                            href="/dashboard"
                            className="flex items-center gap-3 text-xl lg:text-2xl text-white hover:text-white/70 font-light transition"
                            onClick={() => requestAnimationFrame(() => setIsMobileMenuOpen(false))}
                          >
                            <LayoutDashboard size={24} />
                            Dashboard
                          </Link>
                          <button
                            onClick={async () => {
                              setIsMobileMenuOpen(false);
                              await signOut({ callbackUrl: '/' });
                            }}
                            className="flex items-center gap-3 text-xl lg:text-2xl text-white hover:text-white/70 font-light transition w-full text-left"
                          >
                            <LogOut size={24} />
                            Logout
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            href="/auth/login"
                            className="flex items-center gap-3 text-xl lg:text-2xl text-white hover:text-white/70 font-light transition"
                            onClick={() => requestAnimationFrame(() => setIsMobileMenuOpen(false))}
                          >
                            <User size={24} />
                            Login
                          </Link>
                          <Link
                            href="/auth/register"
                            className="flex items-center gap-3 text-xl lg:text-2xl text-white hover:text-white/70 font-light transition"
                            onClick={() => requestAnimationFrame(() => setIsMobileMenuOpen(false))}
                          >
                            <User size={24} />
                            Sign Up
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
