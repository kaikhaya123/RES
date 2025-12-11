'use client';

import { useState, useRef, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { User, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';
import { Session } from 'next-auth';

interface UserAvatarProps {
  session: Session | null;
  isScrolled: boolean;
}

export function UserAvatar({ session, isScrolled }: UserAvatarProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getInitials = () => {
    if (session?.user?.name) {
      return session.user.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
    }
    return session?.user?.email?.[0]?.toUpperCase() || 'U';
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdown]);

  const handleLogout = async () => {
    setShowDropdown(false);
    await signOut({ callbackUrl: '/' });
  };

  if (!session) {
    return (
      <Link
        href="/auth/login"
        className="relative p-2 hover:opacity-80 transition-all duration-300 flex items-center justify-center"
      >
        <User
          size={24}
          className={`${isScrolled ? 'text-gray-700' : 'text-white drop-shadow-md'}`}
        />
        <span className="sr-only">Login</span>
      </Link>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button - Modern Minimal Design */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-white/10 transition-all duration-300 group backdrop-blur-sm"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-yellow to-yellow-500 flex items-center justify-center flex-shrink-0 shadow-lg hover:shadow-xl transition-shadow">
          <User size={22} className="text-black font-bold" />
        </div>
        <div className="flex flex-col items-start hidden sm:flex min-w-0 gap-0.5">
          <span className="text-white font-black text-sm leading-none drop-shadow-md">
            khayalami
          </span>
          <span className="text-gray-200 text-xs font-bold leading-none drop-shadow">Participant</span>
        </div>
        <ChevronDown 
          size={18} 
          className="text-white drop-shadow-md group-hover:text-brand-yellow transition-all duration-300 group-hover:rotate-180 ml-0.5"
        />
      </button>

      {/* Dropdown Menu - Modern Clean Design */}
      {showDropdown && (
        <div className="absolute right-0 mt-3 w-80 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-gray-200/50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
          
          {/* User Header Section */}
          <div className="px-6 py-5 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b-3 border-brand-yellow">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-brand-yellow flex items-center justify-center shadow-lg">
                <User size={26} className="text-gray-900 font-bold" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-black text-base leading-tight">khayalami</p>
                <p className="text-gray-300 text-sm leading-tight font-semibold">{session.user?.email}</p>
              </div>
            </div>
            
            {/* Status Badges */}
            <div className="flex flex-wrap gap-2">
              <span className="inline-block px-3 py-1.5 bg-brand-yellow text-gray-900 text-xs font-black rounded-full shadow-md">
                ✓ Active
              </span>
              <span className="inline-block px-3 py-1.5 bg-gray-700 text-white text-xs font-black rounded-full border border-gray-600">
                Top Voter
              </span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col py-3 px-2">
            <Link
              href="/dashboard"
              onClick={() => setShowDropdown(false)}
              className="flex items-center gap-4 px-5 py-3.5 text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200 font-semibold text-base group border-l-4 border-transparent hover:border-brand-yellow"
            >
              <LayoutDashboard size={22} className="text-gray-700 group-hover:text-brand-yellow transition-colors flex-shrink-0" />
              <span className="group-hover:translate-x-1 transition-transform">Dashboard</span>
            </Link>

            <Link
              href="/dashboard/profile"
              onClick={() => setShowDropdown(false)}
              className="flex items-center gap-4 px-5 py-3.5 text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200 font-semibold text-base group border-l-4 border-transparent hover:border-brand-yellow"
            >
              <User size={22} className="text-gray-700 group-hover:text-brand-yellow transition-colors flex-shrink-0" />
              <span className="group-hover:translate-x-1 transition-transform">Profile</span>
            </Link>

            {/* Divider */}
            <div className="my-2.5 h-px bg-gray-300 mx-3" />

            <button
              onClick={handleLogout}
              className="flex items-center gap-4 px-5 py-3.5 text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 font-semibold text-base group text-left w-full border-l-4 border-transparent hover:border-red-500"
            >
              <LogOut size={22} className="text-red-600 group-hover:text-red-700 transition-colors flex-shrink-0" />
              <span className="group-hover:translate-x-1 transition-transform">Sign Out</span>
            </button>
          </div>

          {/* Footer */}
          <div className="px-5 py-3.5 bg-gray-100/80 border-t border-gray-200">
            <p className="text-xs text-gray-700 font-bold text-center">
              R.E.S. • Student Competition Platform
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
