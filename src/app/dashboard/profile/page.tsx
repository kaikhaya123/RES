'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import RoleGuard from '@/components/auth/RoleGuard'
import { useUserRole } from '@/hooks/useUserRole'

function ProfileContent() {
  const { data: session, status } = useSession()
  const { isStudent, isPublic } = useUserRole()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: session?.user?.name || '',
    bio: '',
    institution: '',
    campus: '',
    province: '',
    municipality: '',
    town: '',
  })

  useEffect(() => {
    if (session?.user?.name) {
      setFormData(prev => ({
        ...prev,
        name: session.user.name || '',
      }))
    }
  }, [session])

  if (status === 'loading') return null
  if (!session?.user) return null

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setIsEditing(false)
      }
    } catch (error) {
      console.error('Error saving profile:', error)
    }
    setIsSaving(false)
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-neutral-950 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-[240px_1fr] gap-10">

          {/* SIDEBAR */}
          <aside className="border-r border-white/10 pr-6">
            <div className="mb-8">
              <p className="text-sm text-gray-400">Settings</p>
              <h1 className="text-xl font-semibold text-white">Your account</h1>
            </div>

            <nav className="space-y-1">
              {[
                { id: 'profile', label: 'Profile' },
                { id: 'account', label: 'Account' },
                { id: 'security', label: 'Security' },
                { id: 'notifications', label: 'Notifications' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition ${
                    activeTab === item.id
                      ? 'bg-white/10 text-white font-medium'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="mt-10 text-sm text-red-400 hover:text-red-300"
            >
              Sign out
            </button>
          </aside>

          {/* MAIN CONTENT */}
          <main className="space-y-10">

            {/* HEADER */}
            <div>
              <h2 className="text-2xl font-semibold text-white">Profile</h2>
              <p className="text-sm text-gray-400 mt-1">
                Manage how your profile appears on the platform
              </p>
            </div>

            {/* SECTION */}
            <section className="bg-neutral-900 border border-white/10 rounded-xl divide-y divide-white/10">

              {/* AVATAR */}
              <div className="p-6 flex items-center gap-6">
<div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-yellow to-yellow-600 flex items-center justify-center text-black font-bold text-xl">
                  {session.user.name?.[0] || 'U'}
                </div>

                <div>
                  <p className="text-white font-medium">{session.user.name}</p>
                  <p className="text-sm text-gray-400">{session.user.email}</p>
                </div>
              </div>

              {/* NAME */}
              <div className="p-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Full name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-800 border border-brand-yellow rounded-md px-4 py-2 text-white focus:outline-none"
                  />
                ) : (
                  <div className="bg-neutral-800 border border-white/10 rounded-md px-4 py-2 text-white">
                    {formData.name}
                  </div>
                )}
              </div>

              {/* EMAIL */}
              <div className="p-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Email address
                </label>
                <div className="bg-neutral-800 border border-white/10 rounded-md px-4 py-2 text-gray-400">
                  {session.user.email}
                </div>
                <p className="text-xs text-gray-500 mt-2">Email cannot be changed</p>
              </div>

              {/* BIO */}
              <div className="p-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Bio
                </label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself..."
                    className="w-full bg-neutral-800 border border-brand-yellow rounded-md px-4 py-2 text-white focus:outline-none resize-none"
                    rows={3}
                  />
                ) : (
                  <div className="bg-neutral-800 border border-white/10 rounded-md px-4 py-2 text-gray-400 min-h-[80px]">
                    {formData.bio || 'No bio added yet'}
                  </div>
                )}
              </div>

              {/* INSTITUTION - STUDENT ONLY */}
              {isStudent && (
                <div className="p-6">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Institution
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="institution"
                      value={formData.institution}
                      onChange={handleInputChange}
                      placeholder="Your university or organization"
                      className="w-full bg-neutral-800 border border-brand-yellow rounded-md px-4 py-2 text-white focus:outline-none"
                    />
                  ) : (
                    <div className="bg-neutral-800 border border-white/10 rounded-md px-4 py-2 text-gray-400">
                      {formData.institution || 'Not specified'}
                    </div>
                  )}
                </div>
              )}

              {/* CAMPUS - STUDENT ONLY */}
              {isStudent && (
                <div className="p-6">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Campus
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="campus"
                      value={formData.campus}
                      onChange={handleInputChange}
                      placeholder="Your campus location"
                      className="w-full bg-neutral-800 border border-brand-yellow rounded-md px-4 py-2 text-white focus:outline-none"
                    />
                  ) : (
                    <div className="bg-neutral-800 border border-white/10 rounded-md px-4 py-2 text-gray-400">
                      {formData.campus || 'Not specified'}
                    </div>
                  )}
                </div>
              )}

              {/* MUNICIPALITY - PUBLIC ONLY */}
              {isPublic && (
                <div className="p-6">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Municipality
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="municipality"
                      value={formData.municipality}
                      onChange={handleInputChange}
                      placeholder="Your city or municipality"
                      className="w-full bg-neutral-800 border border-brand-yellow rounded-md px-4 py-2 text-white focus:outline-none"
                    />
                  ) : (
                    <div className="bg-neutral-800 border border-white/10 rounded-md px-4 py-2 text-gray-400">
                      {formData.municipality || 'Not specified'}
                    </div>
                  )}
                </div>
              )}

              {/* TOWN - PUBLIC ONLY */}
              {isPublic && (
                <div className="p-6">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Town/Suburb/Township
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="town"
                      value={formData.town}
                      onChange={handleInputChange}
                      placeholder="Your town, suburb, township, or village"
                      className="w-full bg-neutral-800 border border-brand-yellow rounded-md px-4 py-2 text-white focus:outline-none"
                    />
                  ) : (
                    <div className="bg-neutral-800 border border-white/10 rounded-md px-4 py-2 text-gray-400">
                      {formData.town || 'Not specified'}
                    </div>
                  )}
                </div>
              )}

              {/* PROVINCE */}
              <div className="p-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Province
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="province"
                    value={formData.province}
                    onChange={handleInputChange}
                    placeholder="Your province"
                    className="w-full bg-neutral-800 border border-brand-yellow rounded-md px-4 py-2 text-white focus:outline-none"
                  />
                ) : (
                  <div className="bg-neutral-800 border border-white/10 rounded-md px-4 py-2 text-gray-400">
                    {formData.province || 'Not specified'}
                  </div>
                )}
              </div>

              {/* ACCOUNT TYPE & ACTIONS */}
              <div className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">
                    Account type
                  </p>
                  <p className="text-white mt-1">
                    {session.user.userType || 'Public'}
                  </p>
                </div>

                <div className="flex gap-3">
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => {
                          setIsEditing(false)
                          setFormData({
                            name: session?.user?.name || '',
                            bio: '',
                            institution: '',
                            campus: '',
                            province: '',
                            municipality: '',
                            town: '',
                          })
                        }}
                        className="px-4 py-2 text-sm font-medium bg-neutral-700 text-white rounded-md hover:bg-neutral-600 transition"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-4 py-2 text-sm font-medium bg-brand-yellow text-black rounded-md hover:bg-yellow-600 transition disabled:opacity-50"
                      >
                        {isSaving ? 'Saving...' : 'Save Changes'}
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 text-sm font-medium bg-brand-yellow text-black rounded-md hover:bg-yellow-600 transition"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
            </section>

          </main>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default function ProfilePage() {
  return (
    <RoleGuard
      requiredRoles={['STUDENT', 'PUBLIC']}
      redirectTo="/auth/login"
      fallback={
        <>
          <Navbar />
          <div className="min-h-screen flex items-center justify-center pt-24">
            <div className="text-center px-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
              <p className="text-gray-600 mb-6">You must be logged in to access your profile</p>
              <Link href="/auth/login" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
                Go to Login
              </Link>
            </div>
          </div>
          <Footer />
        </>
      }
    >
      <ProfileContent />
    </RoleGuard>
  )
}
