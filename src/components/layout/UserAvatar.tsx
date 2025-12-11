'use client';

import { useState, useRef, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { User, LogOut, LayoutDashboard } from 'lucide-react';
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
        className="relative p-2 hover:opacity-80 transition flex items-center justify-center"
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
      {/* Floating Avatar */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative w-12 h-12 rounded-full bg-black text-brand-yellow flex items-center justify-center text-sm font-black shadow-lg hover:shadow-xl transition-all hover:scale-105"
      >
        {getInitials()}
      </button>

      {/* Dropdown Card */}
      {showDropdown && (
        <div className="absolute right-0 mt-4 w-72 bg-white rounded-2xl shadow-2xl border border-warm-stone-border overflow-hidden animate-in fade-in slide-in-from-top-3 duration-300">
          
          {/* User Header */}
          <div className="px-6 py-6 bg-black text-white flex flex-col border-b border-warm-stone-border">
            <p className="font-black text-lg">{session.user?.name || session.user?.email}</p>
            <p className="text-sm text-gray-300 mt-1">{session.user?.email}</p>
            <div className="mt-4 flex items-center gap-2">
              <span className="bg-brand-yellow text-black px-3 py-1 rounded-full text-xs font-black">Active</span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col divide-y divide-warm-stone-border">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-6 py-4 text-black hover:bg-warm-stone-base transition-colors font-semibold"
              onClick={() => setShowDropdown(false)}
            >
              <LayoutDashboard size={18} className="text-black" /> Dashboard
            </Link>
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-3 px-6 py-4 text-black hover:bg-warm-stone-base transition-colors font-semibold"
              onClick={() => setShowDropdown(false)}
            >
              <User size={18} className="text-black" /> Profile
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-6 py-4 text-black hover:bg-warm-stone-base transition-colors font-semibold text-left w-full"
            >
              <LogOut size={18} className="text-black" /> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
