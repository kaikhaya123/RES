"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Lock, AlertCircle, Eye, EyeOff, User, Phone } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";

export default function RegisterPage() {
  const router = useRouter();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    province: "",
    homeAddress: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      "use client";

      import { useState, useRef } from "react";
      import { useRouter } from "next/navigation";
      import Link from "next/link";
      import Image from "next/image";
      import { motion } from "framer-motion";
      import { Mail, Lock, AlertCircle, Eye, EyeOff, User, Phone } from "lucide-react";
      import ReCAPTCHA from "react-google-recaptcha";

      export default function RegisterPage() {
        const router = useRouter();
        const recaptchaRef = useRef<ReCAPTCHA>(null);
        const [formData, setFormData] = useState({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          dateOfBirth: "",
          province: "",
          homeAddress: "",
          password: "",
          confirmPassword: "",
        });
        const [showPassword, setShowPassword] = useState(false);
        const [showConfirmPassword, setShowConfirmPassword] = useState(false);
        const [error, setError] = useState("");
        const [isLoading, setIsLoading] = useState(false);
        const [captchaToken, setCaptchaToken] = useState<string | null>(null);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
          setFormData({ ...formData, [e.target.name]: e.target.value });
        };

        const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          setError("");

          if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && !captchaToken) {
            setError("Please complete the reCAPTCHA verification");
            return;
          }

          if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
          }

          if (formData.password.length < 8) {
            setError("Password must be at least 8 characters long");
            return;
          }

          setIsLoading(true);
          try {
            const res = await fetch("/api/auth/register", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...formData, userType: "PUBLIC", captchaToken }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Registration failed");
            router.push("/auth/login?registered=true");
          } catch (err: any) {
            setError(err.message || "An unexpected error occurred. Please try again.");
            recaptchaRef.current?.reset();
            setCaptchaToken(null);
          } finally {
            setIsLoading(false);
          }
        };

        return (
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4">
            <div className="w-full max-w-6xl flex flex-col lg:flex-row rounded-2xl overflow-hidden shadow-2xl min-h-[600px]">
              <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="w-full lg:w-5/12 bg-white/5 backdrop-blur-lg border-r border-white/10 flex flex-col">
                <div className="flex-1 flex flex-col justify-center p-8 lg:p-12 items-center">
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
                    <p className="text-gray-400">Join R.E.S. and start your journey</p>
                  </div>

                  {error && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start space-x-3">
                      <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                      <p className="text-red-400 text-sm">{error}</p>
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5 w-full max-w-md">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="text-gray-500" size={20} />
                        </div>
                        <input id="firstName" name="firstName" type="text" value={formData.firstName} onChange={handleChange} required className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition" placeholder="John" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="text-gray-500" size={20} />
                        </div>
                        <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition" placeholder="you@example.com" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="text-gray-500" size={20} />
                        </div>
                        <input id="password" name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} required className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition" placeholder="Minimum 8 characters" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300 transition">{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="text-gray-500" size={20} />
                        </div>
                        <input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={handleChange} required className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition" placeholder="Re-enter your password" />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300 transition">{showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
                      </div>
                    </div>

                    {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? (
                      <div className="flex justify-center">
                        <ReCAPTCHA ref={recaptchaRef} sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} onChange={(token) => setCaptchaToken(token)} onExpired={() => setCaptchaToken(null)} theme="dark" />
                      </div>
                    ) : (
                      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 text-yellow-200 text-sm text-center">⚠️ reCAPTCHA not configured. Add NEXT_PUBLIC_RECAPTCHA_SITE_KEY to .env file.</div>
                    )}

                    <button type="submit" disabled={isLoading || (!!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && !captchaToken)} className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 hover:shadow-lg transition transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border border-white/20">
                      {isLoading ? (
                        <span className="flex items-center justify-center space-x-2"><svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><span>Creating account...</span></span>
                      ) : (
                        'Create Account'
                      )}
                    </button>

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                      <div className="relative flex justify-center text-sm"><span className="px-4 bg-transparent text-gray-400">Or sign up with</span></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <button type="button" className="flex items-center justify-center px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition">Google</button>
                      <button type="button" className="flex items-center justify-center px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition">Facebook</button>
                    </div>

                    <p className="mt-6 text-center text-gray-400 text-sm">Already have an account? <Link href="/auth/login" className="text-primary-400 hover:text-primary-300 font-medium transition">Log in</Link></p>
                    <p className="mt-4 text-center text-gray-500 text-xs">By continuing, you agree to our <Link href="/terms" className="text-gray-400 hover:text-gray-300 underline">Terms of Service</Link> and <Link href="/privacy" className="text-gray-400 hover:text-gray-300 underline">Privacy Policy</Link></p>
                  </form>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="hidden lg:flex lg:w-7/12 relative">
                <div className="relative w-full h-full min-h-[600px]">
                  <Image src="/Images/college-students-different-ethnicities-cramming.jpg" alt="Students collaborating" fill className="object-cover" priority />
                </div>
              </motion.div>
            </div>
          </div>
        );
      }
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate reCAPTCHA (only if configured)
    if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && !captchaToken) {
      setError('Please complete the reCAPTCHA verification');
      return;
    }

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          dateOfBirth: formData.dateOfBirth,
          province: formData.province,
          homeAddress: formData.homeAddress,
          password: formData.password,
          userType: 'PUBLIC',
          captchaToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Redirect to login page after successful registration
      router.push('/auth/login?registered=true');
    } catch (error: any) {
      setError(error.message || 'An unexpected error occurred. Please try again.');
      // Reset reCAPTCHA on error
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row rounded-2xl overflow-hidden shadow-2xl min-h-[600px]">
        {/* Left Side - Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-1/2 bg-white/5 backdrop-blur-lg border-r border-white/10 flex flex-col"
        >
          <div className="flex-1 flex flex-col justify-center p-8 lg:p-12">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
              <p className="text-gray-400">Join R.E.S. and start your journey</p>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:flex lg:w-1/2 relative"
        >
          <div className="relative w-full h-full min-h-[600px]">
            <Image
              src="/Images/college-students-different-ethnicities-cramming.jpg"
              alt="Students collaborating"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="text-gray-500" size={20} />
                  </div>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                    placeholder="John"
                  />
                </div>
              </div>

              {/* Last Name Field */}
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="text-gray-500" size={20} />
                  </div>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                    placeholder="Doe"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="text-gray-500" size={20} />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="text-gray-500" size={20} />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                    placeholder="+27 XX XXX XXXX"
                  />
                </div>
              </div>

              {/* Date of Birth Field */}
              <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-300 mb-2">
                  Date of Birth
                </label>
                <input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                />
              </div>

              {/* Province Field */}
              <div>
                <label htmlFor="province" className="block text-sm font-medium text-gray-300 mb-2">
                  Province
                </label>
                <select
                  id="province"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                >
                  <option value="" className="bg-gray-900">Select Province</option>
                  <option value="GAUTENG" className="bg-gray-900">Gauteng</option>
                  <option value="WESTERN_CAPE" className="bg-gray-900">Western Cape</option>
                  <option value="EASTERN_CAPE" className="bg-gray-900">Eastern Cape</option>
                  <option value="KWAZULU_NATAL" className="bg-gray-900">KwaZulu-Natal</option>
                  <option value="FREE_STATE" className="bg-gray-900">Free State</option>
                  <option value="LIMPOPO" className="bg-gray-900">Limpopo</option>
                  <option value="MPUMALANGA" className="bg-gray-900">Mpumalanga</option>
                  <option value="NORTH_WEST" className="bg-gray-900">North West</option>
                  <option value="NORTHERN_CAPE" className="bg-gray-900">Northern Cape</option>
                </select>
              </div>

              {/* Home Address Field */}
              <div>
                <label htmlFor="homeAddress" className="block text-sm font-medium text-gray-300 mb-2">
                  Home Address
                </label>
                <input
                  id="homeAddress"
                  name="homeAddress"
                  type="text"
                  value={formData.homeAddress}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                  placeholder="123 Main Street, City"
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="text-gray-500" size={20} />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                    placeholder="Minimum 8 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300 transition"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="text-gray-500" size={20} />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                    placeholder="Re-enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300 transition"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* reCAPTCHA */}
              {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? (
                <div className="flex justify-center">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    onChange={(token) => setCaptchaToken(token)}
                    onExpired={() => setCaptchaToken(null)}
                    theme="dark"
                  />
                </div>
              ) : (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 text-yellow-200 text-sm text-center">
                  ⚠️ reCAPTCHA not configured. Add NEXT_PUBLIC_RECAPTCHA_SITE_KEY to .env file.
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || (!!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && !captchaToken)}
                className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 hover:shadow-lg transition transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border border-white/20"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center space-x-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Creating account...</span>
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-transparent text-gray-400">Or sign up with</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
            </div>

            {/* Login Link */}
            <p className="mt-6 text-center text-gray-400 text-sm">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-primary-400 hover:text-primary-300 font-medium transition">
                Log in
              </Link>
            </p>

            {/* Additional Info */}
            <p className="mt-4 text-center text-gray-500 text-xs">
              By continuing, you agree to our{' '}
              <Link href="/terms" className="text-gray-400 hover:text-gray-300 underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-gray-400 hover:text-gray-300 underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
