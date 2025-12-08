"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Lock, User, AlertCircle, Eye, EyeOff, Home, Calendar, MapPin, School, Building2, Landmark, CheckCircle } from "lucide-react";
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
		userType: "public", // 'student' or 'public'
		// Student fields
		institution: "",
		campus: "",
		residence: "",
		// Public fields
		municipality: "",
		town: "",
		// Security
		verificationCode: "",
		acceptTerms: false,
	});
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [codeSent, setCodeSent] = useState(false);
	const [phoneVerified, setPhoneVerified] = useState(false);
	const [lastPhoneAttempt, setLastPhoneAttempt] = useState("");
	const [toast, setToast] = useState({
		show: false,
		message: ''
	});

	// Auto-send SMS code when phone number is valid and changes
	useEffect(() => {
		const isValidPhone = formData.phone && formData.phone.length >= 10;
		const phoneChanged = formData.phone !== lastPhoneAttempt;

		if (isValidPhone && phoneChanged && formData.phone.length === 10) {
			setLastPhoneAttempt(formData.phone);
			sendSMSCodeAutomatically();
		}
	}, [formData.phone, lastPhoneAttempt]);

	const sendSMSCodeAutomatically = async () => {
		try {
			console.log('[Auto-SMS] Sending code to:', formData.phone);
			const res = await fetch("/api/auth/verify-phone", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					phone: formData.phone,
					action: "verify"
				}),
			});
			
			const data = await res.json();
			
			if (res.ok) {
				setCodeSent(true);
				setPhoneVerified(false); // Reset verification status
				setToast({
					show: true,
					message: "✓ SMS code sent to your phone"
				});
				console.log('[Auto-SMS] Code sent successfully');
			} else {
				console.log('[Auto-SMS] Failed to send:', data.error);
			}
		} catch (err: any) {
			console.error('[Auto-SMS] Error:', err);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value, type } = e.target;
		let fieldValue: string | boolean = value;
		if (type === "checkbox") {
			fieldValue = (e.target as HTMLInputElement).checked;
		}
		setFormData((prev) => ({
			...prev,
			[name]: fieldValue,
		}));
	};

	const handleSendCode = async () => {
		if (!formData.phone) {
			setToast({
				show: true,
				message: "Please enter your phone number first"
			});
			return;
		}
		
		try {
			setIsLoading(true);
			setToast({
				show: true,
				message: "Waiting for your verification code..."
			});

			const res = await fetch("/api/auth/verify-phone", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					phone: formData.phone,
					action: "verify"
				}),
			});
			
			const data = await res.json();
			console.log('[SendCode Response]', data);
			
			if (!res.ok) {
				setToast({
					show: true,
					message: data.error || "Failed to send verification code"
				});
				setIsLoading(false);
				return;
			}
			
			setCodeSent(true);
			setError(null);
			setToast({
				show: true,
				message: "Code sent! Check your phone."
			});
			setTimeout(() => setCodeSent(false), 300000); // 5 minutes
			setIsLoading(false);
		} catch (err: any) {
			console.error('[SendCode Error]', err);
			setToast({
				show: true,
				message: "Something went wrong. Please try again."
			});
			setIsLoading(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setIsLoading(true);

		// Verify password match
		if (formData.password !== formData.confirmPassword) {
			setToast({
				show: true,
				message: "Passwords do not match"
			});
			setIsLoading(false);
			return;
		}

		// Verify terms accepted
		if (!formData.acceptTerms) {
			setToast({
				show: true,
				message: "You must agree to Terms & Privacy Policy"
			});
			setIsLoading(false);
			return;
		}

		// NEW: Verify SMS code before registration
		if (!formData.verificationCode) {
			setToast({
				show: true,
				message: "Please enter the verification code sent to your phone"
			});
			setIsLoading(false);
			return;
		}

		try {
			// Verify the code with backend
			const verifyRes = await fetch("/api/auth/verify-phone", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					phone: formData.phone,
					action: "confirm",
					code: formData.verificationCode
				}),
			});

			const verifyData = await verifyRes.json();
			
			if (!verifyRes.ok) {
				setToast({
					show: true,
					message: verifyData.error || "Invalid verification code"
				});
				setIsLoading(false);
				return;
			}

			// Code verified! Mark as verified
			setPhoneVerified(true);
			setToast({
				show: true,
				message: "✓ Phone verified! Completing registration..."
			});

			// Now proceed with registration
			const payload: any = {
				...formData,
				userType: formData.userType === "student" ? "STUDENT" : "PUBLIC",
				role: "user",
			};
			delete payload.verificationCode;

			const res = await fetch("/api/auth/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});
			const data = await res.json();
			console.log("[Registration API Response]", data);
			if (!res.ok) {
				setToast({
					show: true,
					message: data.error || "Registration failed"
				});
				setIsLoading(false);
				return;
			}
			setIsLoading(false);
			setToast({
				show: true,
				message: "✓ Registration successful! Redirecting..."
			});
			// Redirect after a short delay
			setTimeout(() => {
			  router.push("/auth/login?registered=true");
			}, 2000);
		} catch (err: any) {
			console.error('[Registration Error]', err);
			setToast({
				show: true,
				message: err.message || "An error occurred. Please try again."
			});
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4">
			<ToastMobile
				show={toast.show}
				message={toast.message}
				onClose={() => setToast({ ...toast, show: false })}
			/>
			<div className="w-full max-w-2xl flex flex-col rounded-2xl overflow-hidden shadow-2xl min-h-[600px] bg-white/5">
				<motion.div
					initial={{ opacity: 0, x: -50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6 }}
				>
					<div className="flex flex-col justify-center p-6 lg:p-8 items-center overflow-y-auto">
						<motion.div
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className="mb-4"
						>
							<div className="relative w-32 h-32 mx-auto">
								<Image
									src="/Images/RES Logo with Futuristic Emblem.png"
									alt="R.E.S."
									fill
									className="object-contain"
									priority
								/>
							</div>
						</motion.div>
						<div className="text-center mb-6">
							<h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Sign Up</h1>
							<p className="text-sm text-gray-400">Register as a student or public user</p>
						</div>
						{error && (
							<motion.div
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start space-x-3 w-full max-w-md"
							>
								<AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
								<p className="text-red-400 text-sm">{error}</p>
							</motion.div>
						)}
						{success && (
							<motion.div
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg flex items-start space-x-3 w-full max-w-md"
							>
								<svg className="text-green-500 flex-shrink-0 mt-0.5" width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
								<p className="text-green-400 text-sm">{success}</p>
							</motion.div>
						)}
						<form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
							<div className="flex space-x-2 mb-2">
								<label className={`flex-1 cursor-pointer rounded-lg px-3 py-2 text-center text-xs font-semibold transition border ${formData.userType === "student" ? "bg-blue-600 text-white border-blue-600" : "bg-white/10 text-gray-300 border-white/20"}`}> 
									<input type="radio" name="userType" value="student" checked={formData.userType === "student"} onChange={handleChange} className="hidden" />
									Student
								</label>
								<label className={`flex-1 cursor-pointer rounded-lg px-3 py-2 text-center text-xs font-semibold transition border ${formData.userType === "public" ? "bg-blue-600 text-white border-blue-600" : "bg-white/10 text-gray-300 border-white/20"}`}> 
									<input type="radio" name="userType" value="public" checked={formData.userType === "public"} onChange={handleChange} className="hidden" />
									Public
								</label>
							</div>
							<div className="grid grid-cols-1 gap-3">
								<div>
									<label htmlFor="name" className="block text-xs font-medium text-gray-300 mb-1.5">Name</label>
									<input id="firstName" name="firstName" type="text" value={formData.firstName} onChange={handleChange} required className="w-full p-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition" placeholder="Enter your name" />
								</div>
								<div>
									<label htmlFor="surname" className="block text-xs font-medium text-gray-300 mb-1.5">Surname</label>
									<input id="lastName" name="lastName" type="text" value={formData.lastName} onChange={handleChange} required className="w-full p-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition" placeholder="Enter your surname" />
								</div>
								<div>
									<label htmlFor="email" className="block text-xs font-medium text-gray-300 mb-1.5">Email</label>
									<input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="w-full p-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition" placeholder="you@example.com" />
								</div>
								<div>
									<label htmlFor="cellphone" className="block text-xs font-medium text-gray-300 mb-1.5">Cellphone Number</label>
									<input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required className="w-full p-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition" placeholder="e.g. 0812345678" />
								</div>
								<div>
									<label htmlFor="dob" className="block text-xs font-medium text-gray-300 mb-1.5">Date of Birth</label>
									<input id="dateOfBirth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} required className="w-full p-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition" />
								</div>
								<div>
									<label htmlFor="address" className="block text-xs font-medium text-gray-300 mb-1.5">Home Address</label>
									<input id="homeAddress" name="homeAddress" type="text" value={formData.homeAddress} onChange={handleChange} required className="w-full p-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition" placeholder="Enter your home address" />
								</div>
								<div>
									<label htmlFor="province" className="block text-xs font-medium text-gray-300 mb-1.5">Province</label>
									<select
										id="province"
										name="province"
										value={formData.province}
										onChange={handleChange}
										required
										className="w-full p-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
									>
										<option value="">Select your province</option>
										<option value="EASTERN_CAPE">Eastern Cape</option>
										<option value="FREE_STATE">Free State</option>
										<option value="GAUTENG">Gauteng</option>
										<option value="KWAZULU_NATAL">KwaZulu-Natal</option>
										<option value="LIMPOPO">Limpopo</option>
										<option value="MPUMALANGA">Mpumalanga</option>
										<option value="NORTHERN_CAPE">Northern Cape</option>
										<option value="NORTH_WEST">North West</option>
										<option value="WESTERN_CAPE">Western Cape</option>
									</select>
								</div>
								{/* Student fields */}
								{formData.userType === "student" && (
									<>
										<div>
											<label htmlFor="institution" className="block text-xs font-medium text-gray-300 mb-1.5">Institution</label>
											<input id="institution" name="institution" type="text" value={formData.institution} onChange={handleChange} required className="w-full p-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition" placeholder="Enter your institution" />
										</div>
										<div>
											<label htmlFor="campus" className="block text-xs font-medium text-gray-300 mb-1.5">Campus</label>
											<input id="campus" name="campus" type="text" value={formData.campus} onChange={handleChange} required className="w-full p-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition" placeholder="Enter your campus" />
										</div>
										<div>
											<label htmlFor="residence" className="block text-xs font-medium text-gray-300 mb-1.5">Student Residence/Accommodation</label>
											<input id="residence" name="residence" type="text" value={formData.residence} onChange={handleChange} required className="w-full p-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition" placeholder="Enter your residence or accommodation" />
										</div>
									</>
								)}
								{/* Public fields */}
								{formData.userType === "public" && (
									<>
										<div>
											<label htmlFor="municipality" className="block text-xs font-medium text-gray-300 mb-1.5">Municipality</label>
											<input id="municipality" name="municipality" type="text" value={formData.municipality} onChange={handleChange} required className="w-full p-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition" placeholder="Enter your municipality" />
										</div>
										<div>
											<label htmlFor="town" className="block text-xs font-medium text-gray-300 mb-1.5">Town or Suburb</label>
											<input id="town" name="town" type="text" value={formData.town} onChange={handleChange} required className="w-full p-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition" placeholder="Enter your town or suburb" />
										</div>
									</>
								)}
								<div>
									<label htmlFor="password" className="block text-xs font-medium text-gray-300 mb-1.5">Password</label>
									<div className="relative">
										<input id="password" name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} required className="w-full p-2 pr-10 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition" placeholder="Create a strong password" />
										<button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300 transition">
											{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
										</button>
									</div>
								</div>
								<div>
									<label htmlFor="confirmPassword" className="block text-xs font-medium text-gray-300 mb-1.5">Confirm Password</label>
									<div className="relative">
										<input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? "text" : "password"} value={formData.confirmPassword} onChange={handleChange} required className="w-full p-2 pr-10 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition" placeholder="Confirm your password" />
										<button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300 transition">
											{showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
										</button>
									</div>
								</div>
								<div className="flex items-center space-x-2">
									<button 
										type="button" 
										onClick={handleSendCode} 
										className={`px-3 py-1.5 rounded text-xs font-semibold transition ${
											phoneVerified 
												? 'bg-green-600 text-white hover:bg-green-700' 
												: 'bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50'
										}`} 
										disabled={codeSent || phoneVerified}
									>
										{phoneVerified ? "✓ Verified" : (codeSent ? "Code Sent" : "Resend Code")}
									</button>
									<input 
										id="verificationCode" 
										name="verificationCode" 
										type="text" 
										value={formData.verificationCode} 
										onChange={handleChange} 
										maxLength={6}
										required 
										className={`flex-1 p-2 bg-white/5 border rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:border-transparent transition ${
											phoneVerified 
												? 'border-green-500 focus:ring-green-500' 
												: 'border-white/10 focus:ring-primary-500'
										}`} 
										placeholder="6-digit code" 
									/>
									{phoneVerified && <CheckCircle size={20} className="text-green-500" />}
								</div>
								<div className="flex items-center space-x-2">
									<input id="acceptTerms" name="acceptTerms" type="checkbox" checked={formData.acceptTerms} onChange={handleChange} required className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
									<label htmlFor="terms" className="text-xs text-gray-300">I agree to the <Link href="/terms" className="underline">Terms</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link></label>
								</div>
								<button type="submit" disabled={isLoading} className="w-full py-2.5 bg-black text-white text-sm font-semibold rounded-lg hover:bg-gray-900 hover:shadow-lg transition transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border border-white/20 mt-2">
									{isLoading ? (
										<span className="flex items-center justify-center space-x-2">
											<svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
												<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
												<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
											</svg>
											<span className="text-sm">Creating account...</span>
										</span>
									) : (
										"Create Account"
									)}
								</button>
							</div>
						</form>
						<p className="mt-5 text-center text-gray-400 text-xs">
							Already have an account?{' '}
							<Link href="/auth/login" className="text-primary-400 hover:text-primary-300 font-medium transition">
								Log in
							</Link>
						</p>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
