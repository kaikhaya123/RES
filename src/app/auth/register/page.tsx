"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import ToastMobile from "@/components/ToastMobile";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    homeAddress: "",
    province: "",
    userType: "public",
    institution: "",
    campus: "",
    residence: "",
    verificationCode: "",
    acceptTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);

  const handleChange = (e: any) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? e.target.checked : value,
    }));
  };

  const handleSendCode = async () => {
    if (!formData.phone) {
      setToast({ show: true, message: "Enter your phone number first" });
      return;
    }

    setToast({ show: true, message: "Sending verification code..." });

    try {
      const response = await fetch("/api/auth/verify-phone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: formData.phone,
          action: "verify",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setToast({ show: true, message: errorData.error });
        return;
      }

      setCodeSent(true);
      setToast({ show: true, message: "Code sent to your phone" });
    } catch (err: any) {
      setToast({ show: true, message: err.message });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setToast({ show: true, message: "Passwords do not match" });
      return;
    }

    if (!formData.acceptTerms) {
      setToast({ show: true, message: "Please accept terms" });
      return;
    }

    if (!formData.verificationCode) {
      setToast({ show: true, message: "Enter your verification code" });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: "user",
          userType: formData.userType.toUpperCase(),
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          password: formData.password,
          dateOfBirth: formData.dateOfBirth,
          homeAddress: formData.homeAddress,
          province: formData.province,
          institution: formData.institution,
          campus: formData.campus,
          residence: formData.residence,
          verificationCode: formData.verificationCode,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setToast({ show: true, message: errorData.error });
        setIsLoading(false);
        return;
      }

      setToast({ show: true, message: "Registration successful" });

      setTimeout(() => {
        router.push("/auth/login?registered=true");
      }, 1500);
    } catch (err: any) {
      setToast({ show: true, message: err.message });
      setIsLoading(false);
    }
  };

  const studentVideo = "/Videos/hmnQ4LuoH2h1T2H3vF.mp4";
  const publicVideo = "/Videos/QGfOI16HI23CjfACj4.mp4";

  return (
    <motion.div
      className="min-h-screen w-full bg-black flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <ToastMobile
        show={toast.show}
        message={toast.message}
        onClose={() => setToast({ ...toast, show: false })}
      />

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">

        {/* LEFT VIDEO SIDE */}
        <motion.div
          className="relative hidden lg:flex items-center justify-center bg-neutral-900"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            src={formData.userType === "student" ? studentVideo : publicVideo}
            className="object-cover opacity-80 w-full h-full absolute inset-0"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-10 text-center px-6"
          >
            <h2 className="text-3xl font-bold text-white mb-2">
              Join the Experience
            </h2>
            <p className="text-gray-300 text-sm max-w-sm mx-auto">
              {formData.userType === "student"
                ? "Create your student account for campus-only access."
                : "Create your public profile for full platform access."}
            </p>
          </motion.div>
        </motion.div>

        {/* RIGHT FORM SECTION */}
        <motion.div
          className="p-6 lg:p-10 overflow-y-auto"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="w-20 h-20 mx-auto relative mb-2">
              <Image
                src="/Images/RES Logo with Futuristic Emblem.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>

            <h1 className="text-2xl font-bold text-white">Create your account</h1>
            <p className="text-gray-400 text-sm">Register as student or public</p>
          </motion.div>

          {/* USER TYPE SWITCH */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            {["student", "public"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setFormData({ ...formData, userType: type })}
                className={`p-2 rounded-lg text-sm font-semibold border transition 
                  ${
                    formData.userType === type
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "bg-white/5 border-white/10 text-gray-300"
                  }`}
              >
                {type === "student" ? "Student" : "Public"}
              </button>
            ))}
          </div>

          {/* FORM */}
          <form className="space-y-4" onSubmit={handleSubmit}>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField name="firstName" label="Name" value={formData.firstName} onChange={handleChange} />
              <InputField name="lastName" label="Surname" value={formData.lastName} onChange={handleChange} />
            </div>

            <InputField name="email" label="Email" value={formData.email} onChange={handleChange} />
            <InputField name="phone" label="Phone Number" value={formData.phone} onChange={handleChange} />

            <InputField name="dateOfBirth" type="date" label="Date of Birth" value={formData.dateOfBirth} onChange={handleChange} />

            <InputField name="homeAddress" label="Home Address" value={formData.homeAddress} onChange={handleChange} />

            <select
              name="province"
              value={formData.province}
              onChange={handleChange}
              className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm"
            >
              <option value="">Select province</option>
              <option value="GAUTENG">Gauteng</option>
              <option value="KWAZULU_NATAL">KwaZulu-Natal</option>
              <option value="WESTERN_CAPE">Western Cape</option>
            </select>

            {/* STUDENT FIELDS */}
            <AnimatePresence>
              {formData.userType === "student" && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="grid grid-cols-1 gap-4"
                >
                  <InputField name="institution" label="Institution" value={formData.institution} onChange={handleChange} />
                  <InputField name="campus" label="Campus" value={formData.campus} onChange={handleChange} />
                  <InputField name="residence" label="Residence" value={formData.residence} onChange={handleChange} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* VERIFICATION CODE */}
            <div className="flex gap-3">
              <input
                name="verificationCode"
                value={formData.verificationCode}
                onChange={handleChange}
                placeholder="Enter verification code"
                className="flex-1 p-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm"
              />
              <button
                type="button"
                onClick={handleSendCode}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
              >
                Send
              </button>
            </div>

            {/* PASSWORDS */}
            <PasswordField label="Password" name="password" value={formData.password} show={showPassword} toggle={() => setShowPassword(!showPassword)} onChange={handleChange} />
            <PasswordField label="Confirm Password" name="confirmPassword" value={formData.confirmPassword} show={showConfirmPassword} toggle={() => setShowConfirmPassword(!showConfirmPassword)} onChange={handleChange} />

            {/* TERMS */}
            <label className="flex items-center gap-2 text-sm text-gray-300">
              <input type="checkbox" name="acceptTerms" checked={formData.acceptTerms} onChange={handleChange} />
              I agree to the Terms and Privacy
            </label>

            <motion.button
              type="submit"
              whileTap={{ scale: 0.95 }}
              className="w-full bg-blue-600 py-3 rounded-lg text-white font-semibold text-sm"
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </motion.button>

            <p className="text-center text-xs text-gray-400">
              Already have an account  
              <Link href="/auth/login" className="text-blue-500 ml-1">Login</Link>
            </p>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* INPUT FIELD */
function InputField({ name, label, value, onChange, type = "text" }: any) {
  return (
    <div>
      <label className="block text-xs text-gray-400 mb-1">{label}</label>
      <motion.input
        whileFocus={{ scale: 1.01 }}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm"
      />
    </div>
  );
}

/* PASSWORD FIELD */
function PasswordField({ label, name, value, onChange, show, toggle }: any) {
  return (
    <div className="relative">
      <label className="block text-xs text-gray-400 mb-1">{label}</label>

      <motion.input
        whileFocus={{ scale: 1.01 }}
        type={show ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm"
      />

      <button
        type="button"
        onClick={toggle}
        className="absolute right-3 top-9 text-gray-400"
      >
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
}
