"use client";

import { useState, useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, AlertCircle, X } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"user" | "admin">("user");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    setIsLoading(true);

    const result = await signIn("credentials", {
      identifier,
      password,
      role,
      redirect: false,
    });

    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
      return;
    }

    if (result?.ok) {
      router.push("/");
      router.refresh();
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-black flex overflow-hidden">

      {/* LEFT FORM SECTION */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full lg:w-1/2 px-8 lg:px-16 py-12 flex flex-col justify-center relative z-10"
      >
        {/* Close/Back Button */}
        <motion.div 
          className="absolute top-4 right-4 md:top-6 md:right-6 lg:top-8 lg:right-8 z-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            href="/"
            className="inline-flex items-center justify-center p-2 md:p-2 rounded-full hover:bg-white/10 transition-all duration-200 group"
            title="Back to home"
            aria-label="Back to home"
          >
            <X size={20} className="text-white group-hover:text-brand-yellow transition-colors" />
          </Link>
        </motion.div>

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative w-28 h-28">
            <Image
              src="/Images/RES%20Logo%20with%20Futuristic%20Emblem.png"
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Headings */}
        <h1 className="text-3xl font-bold text-white text-center">Welcome Back</h1>
        <p className="text-gray-400 text-center text-sm mt-2 mb-8">
          Log in to your R.E.S. account
        </p>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="p-3 bg-red-500/20 border border-red-500 rounded-lg flex items-center gap-3 mb-4"
            >
              <AlertCircle size={18} className="text-red-400" />
              <p className="text-red-300 text-sm">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FORM */}
        <form className="space-y-5" onSubmit={handleSubmit}>

          {/* Role */}
          <div>
            <label className="block mb-1 text-xs text-gray-300">Login as</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as "user" | "admin")}
              className="w-full bg-white/10 border border-white/20 rounded-lg p-2 text-white text-sm focus:outline-none"
            >
              <option className="text-black" value="user">User</option>
              <option className="text-black" value="admin">Admin</option>
            </select>
          </div>

          {/* Identifier */}
          <div>
            <label className="block mb-1 text-xs text-gray-300">Email or Phone</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-500" size={18} />
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-xs text-gray-300">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-500" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <Link href="/auth/forgot-password" className="text-xs text-primary-300">
              Forgot password
            </Link>
          </div>

          {/* Login Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.01 }}
            className="w-full py-3 bg-primary-500/80 hover:bg-primary-500 transition border border-white/20 rounded-lg text-white font-semibold text-sm"
          >
            {isLoading ? "Logging in..." : "Log In"}
          </motion.button>
        </form>

        {/* Social Login */}
        <div className="mt-6">
          <div className="flex items-center gap-3 text-gray-400 text-xs">
            <div className="h-px flex-1 bg-white/10" />
            <span>or continue with</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => signIn('google', { callbackUrl: '/' })}
              className="w-full flex items-center justify-center gap-3 py-3 bg-white hover:bg-white transition border border-white rounded-lg text-black text-sm"
              aria-label="Continue with Google"
            >
              <Image src="/Icons/search.png" alt="Google icon" width={20} height={20} />
              <span>Continue with Google</span>
            </button>

            <button
              type="button"
              onClick={() => signIn('apple', { callbackUrl: '/' })}
              className="w-full flex items-center justify-center gap-3 py-3 bg-white hover:bg-white transition border border-white/20 rounded-lg text-black text-sm"
              aria-label="Continue with Apple"
            >
              <Image src="/Icons/apple-logo.png" alt="Apple icon" width={20} height={20} />
              <span>Continue with Apple</span>
            </button>
          </div>
        </div>

        {/* Sign Up */}
        <p className="text-center text-gray-400 text-xs mt-8">
          Don't have an account?{" "}
          <Link href="/auth/register" className="text-primary-300">
            Sign up
          </Link>
        </p>
      </motion.div>

      {/* RIGHT VIDEO SECTION */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="hidden lg:block w-1/2 h-full relative"
      >
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src="/Videos/olShi6AW2pQj75e9EX.mp4" type="video/mp4" />
        </video>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/20" />
      </motion.div>
    </div>
  );
}
