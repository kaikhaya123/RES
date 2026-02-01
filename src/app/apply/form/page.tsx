'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  institution: string;
  campus: string;
  province: string;
  homeAddress: string;
  bio: string;
};

const provinces = [
  'EASTERN_CAPE',
  'FREE_STATE',
  'GAUTENG',
  'KWAZULU_NATAL',
  'LIMPOPO',
  'MPUMALANGA',
  'NORTHERN_CAPE',
  'NORTH_WEST',
  'WESTERN_CAPE',
];

export default function ApplyFormPage() {
  const [form, setForm] = useState<FormState>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    institution: '',
    campus: '',
    province: '',
    homeAddress: '',
    bio: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const update = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    // Basic validation
    if (!form.firstName || !form.lastName || !form.email || !form.institution) {
      setError('Please fill in all required fields.');
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit application');
      setSuccess('Application submitted successfully! We will be in touch.');
      setForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        institution: '',
        campus: '',
        province: '',
        homeAddress: '',
        bio: '',
      });
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      {/* Spacer to offset fixed navbar height for this page */}
      <div className="h-16 md:h-20 lg:h-24" aria-hidden="true" />
      <main className="flex-1 px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-black uppercase mb-3">Start Application</h1>
          <p className="text-xs md:text-sm text-white/70 mb-6">Fill in your details to apply to compete.</p>

          {success && (
            <div className="mb-4 rounded-md border border-green-600 bg-green-900/20 p-3 text-green-200 text-sm">{success}</div>
          )}
          {error && (
            <div className="mb-4 rounded-md border border-red-600 bg-red-900/20 p-3 text-red-200 text-sm">{error}</div>
          )}

          <div className="rounded-lg border border-white/10 bg-white/5 p-4 md:p-6">
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs mb-1">First Name *</label>
                  <input
                    value={form.firstName}
                    onChange={update('firstName')}
                    placeholder="e.g. Thandi"
                    autoComplete="given-name"
                    className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1">Last Name *</label>
                  <input
                    value={form.lastName}
                    onChange={update('lastName')}
                    placeholder="e.g. Mokoena"
                    autoComplete="family-name"
                    className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs mb-1">Email *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={update('email')}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1">Phone</label>
                  <input
                    value={form.phone}
                    onChange={update('phone')}
                    placeholder="e.g. 0821234567"
                    autoComplete="tel"
                    className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs mb-1">Institution *</label>
                  <input
                    value={form.institution}
                    onChange={update('institution')}
                    placeholder="e.g. Wits University"
                    className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1">Campus</label>
                  <input
                    value={form.campus}
                    onChange={update('campus')}
                    placeholder="e.g. Braamfontein"
                    className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs mb-1">Province</label>
                  <select
                    value={form.province}
                    onChange={update('province')}
                    className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm"
                  >
                    <option value="">Select province</option>
                    {provinces.map((p) => (
                      <option key={p} value={p}>{p.replace('_', ' ')}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs mb-1">Home Address</label>
                  <input
                    value={form.homeAddress}
                    onChange={update('homeAddress')}
                    placeholder="Street, City"
                    autoComplete="address-line1"
                    className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs mb-1">Short Bio</label>
                <textarea
                  value={form.bio}
                  onChange={update('bio')}
                  rows={3}
                  placeholder="Tell us something unique about you"
                  className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center bg-honey-tan text-black font-bold px-6 py-2 rounded-md hover:opacity-90 transition disabled:opacity-50 text-sm"
                >
                  {submitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
