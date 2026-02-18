'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import RippleEffect from '@/components/ui/RippleEffect';

// Contact info data
const contactInfo = [
  {
    icon: '📧',
    label: 'Email',
    value: 'roomzaseducatedsecret@gmail.com',
    link: 'mailto:roomzaseducatedsecret.com'
  },
  {
    icon: '📱',
    label: 'Phone',
    value: '+27 (0) XX XXX XXXX',
    link: 'tel:+27XXXXXXXXX'
  },
  {
    icon: '📍',
    label: 'Location',
    value: 'South Africa',
    link: null
  }
];

const socialLinks = [
  {
    name: 'Instagram',
    url: '#',
    icon: '/Icons/instagram(1).png',
    color: 'from-purple-500 to-pink-500'
  },
  {
    name: 'TikTok',
    url: '#',
    icon: '/Icons/video.png',
    color: 'from-black to-gray-800'
  },
  {
    name: 'Facebook',
    url: '#',
    icon: '/Icons/facebook(1).png',
    color: 'from-blue-600 to-blue-700'
  }
];

export default function ContactPage() {
  const [status, setStatus] = useState<'idle'|'sending'|'success'|'error'>('idle');
  const [formData, setFormData] = useState({ 
    name: '', 
        email: '', 
    subject: '',
    message: '',
    inquiryType: 'general'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((s) => ({       ...s,       [name]: value     }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      // Simulate API call
      await new Promise((res) => setTimeout(res, 1500));
      setStatus('success');
      setFormData({         name: '',         email: '',         subject: '',         message: '',         inquiryType: 'general'       });
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <>
      <Navbar />

      <main className="bg-white text-black overflow-hidden">
        {/* HERO SECTION */}
        <section 
className="relative min-h-[80vh] flex items-center overflow-hidden"
        >
          {/* Background with Ripple Effect */}
            <RippleEffect
              imageUrl="/Images/cheerful-young-dark-skinned-feminine-girl-has-mobile-phone-conversation-wears-round-transparent-glasses-has-charming-smile-hears-good-news-isolated-purple-studio-wall-copy-space-area.jpg"
              intensity={0.3}
              rippleCount={3}
              rippleSize={100}
              rippleInterval={4000}
              interactive={true}
              className="absolute inset-0 z-0"
            />
                    
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/50 to-transparent z-10" />
          
          <div className="container mx-auto px-6 lg:px-16 relative z-20">
            <div className="max-w-3xl">
                            <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  className="space-y-6"
>
                    <motion.h1 
                  className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-tight text-yellow-500"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  >
                    Let's Connect
                </motion.h1>
                <motion.p 
                  className="text-xl lg:text-2xl text-black/90 font-medium max-w-2xl leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                                  >
                  Ready to be part of the movement? Have questions about R.E.S.? We're here to help you every step of the way.
                </motion.p>
                    <motion.div
                                            className="flex flex-wrap gap-4 text-sm text-black/70"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    Quick Response
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                    24/7 Support
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    Nationwide Reach
                  </span>
                </motion.div>
              </motion.div>
</div>
          </div>
        </section>

        {/* MAIN CONTACT SECTION */}
        <section className="relative py-24 bg-gradient-to-b from-black to-jet-black-charcoal">
          <div className="container mx-auto px-6 lg:px-16 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
              
              {/* CONTACT FORM */}
              <motion.div
className="lg:col-span-2"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="relative bg-yellow-200 rounded-3xl p-8 lg:p-12 shadow-2xl">
                                    {/* Form Header */}
                  <div className="mb-8">
                      <h2 className="text-3xl lg:text-4xl font-black text-black mb-4">
                        Send us a Message
                      </h2>
                                          <p className="text-black/70 text-lg">
                      Fill out the form below and we'll get back to you within 24 hours.
                    </p>
                  </div>

                  {/* Status Messages */}
                  {status === 'success' && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mb-6 p-4 bg-green-100 border border-green-300 rounded-xl text-green-800"
                    >
                      <div className="flex items-center gap-3">
                                                  <span className="text-2xl">✅</span>
                                                <div>
                          <p className="font-semibold">Message Sent Successfully!</p>
                          <p className="text-sm">We'll get back to you soon.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {status === 'error' && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mb-6 p-4 bg-red-100 border border-red-300 rounded-xl text-red-800"
                    >
                      <div className="flex items-center gap-3">
                                                  <span className="text-2xl">❌</span>
                                                <div>
                          <p className="font-semibold">Something went wrong</p>
                          <p className="text-sm">Please try again later.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* Inquiry Type */}
                    <div>
                      <label htmlFor="inquiryType" className="block text-sm font-semibold text-black/80 mb-2">
                        What can we help you with?
                      </label>
                      <select
id="inquiryType"
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                        className="w-full h-12 bg-white border-2 border-black/10 rounded-xl px-4 text-black font-medium focus:outline-none focus:border-black focus:ring-4 focus:ring-black/20 transition-all"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="partnership">Partnership</option>
                        <option value="media">Media & Press</option>
                        <option value="technical">Technical Support</option>
                        <option value="casting">Casting Questions</option>
                      </select>
                    </div>

                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-black/80 mb-2">
                          Full Name *
                        </label>
                        <input
id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          type="text"
                          required
                          className="w-full h-12 bg-white border-2 border-black/10 rounded-xl px-4 text-black font-medium focus:outline-none focus:border-black focus:ring-4 focus:ring-black/20 transition-all"
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-black/80 mb-2">
                          Email Address *
                        </label>
                        <input
id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          type="email"
                          required
                          className="w-full h-12 bg-white border-2 border-black/10 rounded-xl px-4 text-black font-medium focus:outline-none focus:border-black focus:ring-4 focus:ring-black/20 transition-all"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-black/80 mb-2">
                        Subject *
                      </label>
                      <input
id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        type="text"
                        required
                        className="w-full h-12 bg-white border-2 border-black/10 rounded-xl px-4 text-black font-medium focus:outline-none focus:border-black focus:ring-4 focus:ring-black/20 transition-all"
                        placeholder="Brief subject line"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-black/80 mb-2">
                        Message *
                      </label>
                      <textarea
id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        required
                        className="w-full bg-white border-2 border-black/10 rounded-xl px-4 py-3 text-black font-medium resize-none focus:outline-none focus:border-black focus:ring-4 focus:ring-black/20 transition-all"
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={status === 'sending'}
                      className="w-full bg-black text-honey-tan font-black py-4 px-6 rounded-xl text-lg tracking-wide hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-black/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                      whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
                      whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
                    >
                      {status === 'sending' ? (
                        <div className="flex items-center justify-center gap-3">
                          <div className="w-5 h-5 border-2 border-honey-tan border-t-transparent rounded-full animate-spin"></div>
                          Sending Message...
                        </div>
                      ) : (
                        'Send Message'
                      )}
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            
        {/* CONTACT INFO SIDEBAR */}
              <motion.div
className="space-y-8"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                >
                {/* Contact Information */}
                <div className="bg-jet-black-card rounded-3xl p-8 border border-white/10">
                  <h3 className="text-2xl font-black text-white mb-6">Get in Touch</h3>
                <div className="space-y-6">
                    {contactInfo.map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                        viewport={{ once: true }}
>
                  <div className="w-12 h-12 bg-honey-tan rounded-xl flex items-center justify-center text-xl">
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-white/60 uppercase tracking-wide mb-1">
                            {item.label}
                          </p>
                          {item.link ? (
                  <a 
                    href={item.link}
                    className="text-white font-medium hover:text-honey-tan transition-colors"
                  >
                    {item.value}
                            </a>
                          ) : (
                            <p className="text-white font-medium">{item.value}</p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              
                {/* Social Media Links */}
                <div className="bg-jet-black-card rounded-3xl p-8 border border-white/10">
                  <h3 className="text-xl font-black text-white mb-6">Follow Our Journey</h3>
                  <div className="space-y-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.url}
                        className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                >
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${social.color} flex items-center justify-center`}>
                          <img 
                            src={social.icon} 
                            alt={social.name}
                            className="w-5 h-5 invert"
                          />
                        </div>
                <div className="flex-1">
                  <p className="text-white font-medium group-hover:text-honey-tan transition-colors">
                    {social.name}
                  </p>
                  <p className="text-sm text-white/60">
                            @roomzaseducatedsecret
                          </p>
                  </div>
                        <div className="w-4 h-4 text-white/40 group-hover:text-white/60 transition-colors">
                          →
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-gradient-to-br from-honey-tan to-honey-tan-600 rounded-3xl p-8 text-black">
                  <h3 className="text-xl font-black mb-6">Why Choose R.E.S.?</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Response Time</span>
                      <span className="font-black">&lt; 24hrs</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Student Focus</span>
                      <span className="font-black">100%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Nationwide Reach</span>
                      <span className="font-black">SA Wide</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
</div>
        </section>

            {/* FAQ SECTION */}
        <section className="py-24 bg-jet-black-charcoal">
          <div className="container mx-auto px-6 lg:px-16 max-w-4xl">
            <motion.div
className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              >
              <h2 className="text-3xl lg:text-4xl font-black text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-white/70 text-lg">
                Quick answers to common questions about R.E.S.
              </p>
            </motion.div>

            <div className="grid gap-6">
              {[
                {
                  question: "How do I apply to be a contestant on R.E.S.?",
                  answer: "Applications are typically open during specific periods. Follow our social media or contact us to stay updated on upcoming application windows."
                },
                {
                  question: "What makes R.E.S. different from other shows?",
                  answer: "R.E.S. is specifically designed for students, focusing on education, personal growth, and real-world challenges that matter to South African youth."
                },
                {
                  question: "Can I partner with R.E.S. as a brand or institution?",
                  answer: "Absolutely! We welcome partnerships with educational institutions, brands, and organizations that align with our mission. Contact us to discuss opportunities."
                },
                {
                  question: "How can I stay updated on the show?",
                  answer: "Follow us on all social media platforms and subscribe to our newsletter. We regularly post updates, behind-the-scenes content, and announcements."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-jet-black-card rounded-2xl p-6 border border-white/10"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-lg font-bold text-white mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {faq.answer}
                  </p>
                    </motion.div>
                  ))}
                </div>
                        </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-honey-tan via-honey-tan-400 to-honey-tan-600" />
          
          <div className="container mx-auto px-6 lg:px-16 relative z-10">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
                              <h2 className="text-4xl lg:text-5xl font-black text-black mb-6">
                  Ready to Join the Movement?
                </h2>
                <p className="text-black/70 text-xl mb-8 max-w-2xl mx-auto">
                  Be part of South Africa's most inspiring student reality show. Your journey starts here.
                </p>
                            
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/apply"
                    className="inline-flex items-center justify-center px-8 py-4 bg-black text-honey-tan font-black text-lg rounded-xl hover:bg-gray-800 transition-colors"
                  >
                    Apply Now
                  </Link>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/about"
                    className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-black font-bold text-lg rounded-xl border-2 border-black hover:bg-black hover:text-honey-tan transition-colors"
                  >
                    Learn More
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
