'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, Settings, Award, BarChart3, Calendar, 
  Trophy, Star, Zap, Target, TrendingUp,
  Edit3, Mail, MapPin, GraduationCap,
  Crown, Medal, Camera, Share2
} from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import RoleGuard from '@/components/auth/RoleGuard'
import { useUserRole } from '@/hooks/useUserRole'

function ProfileContent() {
  const { data: session, status } = useSession()
  const { isStudent, isPublic } = useUserRole()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [userStats, setUserStats] = useState({
    totalVotes: 156,
    quizScore: 85,
    rank: 23,
    streak: 7,
    level: 12,
    achievements: 8,
    referrals: 4
  })
  const [formData, setFormData] = useState({
    firstName: session?.user?.name?.split(' ')[0] || '',
    lastName: session?.user?.name?.split(' ')[1] || '',
    bio: 'Passionate about education and making a difference! 🎓✨',
    institution: '',
    campus: '',
    province: '',
    municipality: '',
    town: '',
    interests: ['Education', 'Technology', 'Community', 'Innovation']
  })

  useEffect(() => {
    if (session?.user?.name) {
      const nameParts = session.user.name.split(' ')
      setFormData(prev => ({
        ...prev,
        firstName: nameParts[0] || '',
        lastName: nameParts[1] || ''
      }))
    }
  }, [session])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-yellow"></div>
      </div>
    )
  }
  
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

  const achievements = [
    { icon: Trophy, name: 'First Vote', description: 'Cast your first vote', unlocked: true },
    { icon: Star, name: 'Quiz Master', description: 'Score 80%+ in 5 quizzes', unlocked: true },
    { icon: Zap, name: 'Vote Streak', description: '7-day voting streak', unlocked: true },
    { icon: Crown, name: 'Top Supporter', description: 'Top 100 voters this week', unlocked: false },
    { icon: Medal, name: 'Quiz Champion', description: 'Perfect quiz score', unlocked: false },
    { icon: Target, name: 'Influence', description: 'Refer 10 friends', unlocked: false }
  ]

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'stats', label: 'Statistics', icon: BarChart3 },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-neutral-950 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">

          {/* HERO PROFILE HEADER */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-gradient-to-r from-brand-yellow/10 via-yellow-500/10 to-amber-500/10 border border-brand-yellow/20 rounded-3xl p-8 mb-8"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-brand-yellow/5 to-transparent rounded-3xl"></div>
            
            <div className="relative flex flex-col lg:flex-row items-start lg:items-center gap-8">
              
              {/* Avatar & Level */}
              <div className="relative">
                <div className="relative">
                  <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br from-brand-yellow to-yellow-600 flex items-center justify-center text-black font-bold text-3xl lg:text-4xl shadow-lg">
                    {session.user.name?.[0] || 'U'}
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute -bottom-2 -right-2 bg-neutral-800 border border-brand-yellow/30 rounded-full p-2 hover:border-brand-yellow/60 transition-colors"
                  >
                    <Camera className="w-4 h-4 text-brand-yellow" />
                  </motion.button>
                </div>
                
                {/* Level Badge */}
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  LVL {userStats.level}
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                      {formData.firstName} {formData.lastName}
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="inline-block ml-2 text-brand-yellow"
                      >
                        ✨
                      </motion.span>
                    </h1>
                    
                    <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {session.user.email}
                      </div>
                      {formData.institution && (
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4" />
                          {formData.institution}
                        </div>
                      )}
                      {formData.province && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {formData.province}
                        </div>
                      )}
                    </div>

                    <p className="text-gray-300 lg:max-w-2xl">
                      {formData.bio}
                    </p>

                    {/* Interests Tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {formData.interests.map((interest, index) => (
                        <span
                          key={index}
                          className="bg-neutral-800 border border-brand-yellow/30 text-brand-yellow px-3 py-1 rounded-full text-sm"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsEditing(true)}
                      className="px-6 py-3 bg-brand-yellow text-black rounded-xl font-medium flex items-center gap-2 hover:bg-yellow-500 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit Profile
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3 bg-neutral-800 border border-neutral-600 text-white rounded-xl font-medium flex items-center gap-2 hover:border-brand-yellow/50 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      Share
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Votes', value: userStats.totalVotes, icon: Trophy, color: 'from-blue-500 to-cyan-500' },
                { label: 'Quiz Score', value: `${userStats.quizScore}%`, icon: Star, color: 'from-purple-500 to-pink-500' },
                { label: 'Current Rank', value: `#${userStats.rank}`, icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
                { label: 'Day Streak', value: userStats.streak, icon: Zap, color: 'from-yellow-500 to-orange-500' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-neutral-900/50 border border-neutral-700 rounded-xl p-4 text-center"
                >
                  <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r ${stat.color} mb-2`}>
                    <stat.icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* NAVIGATION TABS */}
          <div className="flex flex-wrap gap-2 mb-8">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-brand-yellow text-black shadow-lg'
                    : 'bg-neutral-900 border border-neutral-700 text-gray-400 hover:text-white hover:border-brand-yellow/30'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* TAB CONTENT */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  {/* Recent Activity */}
                  <div className="lg:col-span-2 bg-neutral-900 border border-neutral-700 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-brand-yellow" />
                      Recent Activity
                    </h3>
                    
                    <div className="space-y-4">
                      {[
                        { type: 'vote', text: 'Voted for Sarah Johnson', time: '2 hours ago' },
                        { type: 'quiz', text: 'Completed Mathematics Quiz (95%)', time: '1 day ago' },
                        { type: 'achievement', text: 'Earned "Quiz Master" badge', time: '2 days ago' },
                        { type: 'vote', text: 'Voted for Michael Chen', time: '3 days ago' }
                      ].map((activity, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-4 p-4 bg-neutral-800/50 rounded-lg border border-neutral-700"
                        >
                          <div className={`w-3 h-3 rounded-full ${
                            activity.type === 'vote' ? 'bg-blue-500' :
                            activity.type === 'quiz' ? 'bg-green-500' : 'bg-purple-500'
                          }`}></div>
                          <div className="flex-1">
                            <div className="text-white">{activity.text}</div>
                            <div className="text-sm text-gray-400">{activity.time}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Progress & Level */}
                  <div className="space-y-6">
                    
                    {/* Level Progress */}
                    <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-white mb-4">Level Progress</h3>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">Level {userStats.level}</span>
                          <span className="text-brand-yellow">Level {userStats.level + 1}</span>
                        </div>
                        <div className="w-full bg-neutral-800 rounded-full h-2">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '68%' }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="bg-gradient-to-r from-brand-yellow to-yellow-500 h-2 rounded-full"
                          ></motion.div>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">680 / 1000 XP</div>
                      </div>
                    </div>

                    {/* Top Achievements */}
                    <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-white mb-4">Top Achievements</h3>
                      
                      <div className="grid grid-cols-2 gap-3">
                        {achievements.slice(0, 4).map((achievement, index) => (
                          <motion.div
                            key={achievement.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className={`p-3 rounded-lg text-center border ${
                              achievement.unlocked 
                                ? 'bg-brand-yellow/10 border-brand-yellow/30' 
                                : 'bg-neutral-800 border-neutral-700 opacity-50'
                            }`}
                          >
                            <achievement.icon className={`w-6 h-6 mx-auto mb-2 ${
                              achievement.unlocked ? 'text-brand-yellow' : 'text-gray-500'
                            }`} />
                            <div className={`text-xs font-medium ${
                              achievement.unlocked ? 'text-white' : 'text-gray-500'
                            }`}>
                              {achievement.name}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'stats' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  
                  {/* Voting Stats */}
                  <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-6">Voting Statistics</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-400">Total Votes Cast</span>
                          <span className="text-2xl font-bold text-white">{userStats.totalVotes}</span>
                        </div>
                        <div className="w-full bg-neutral-800 rounded-full h-2">
                          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-400">This Week</span>
                          <span className="text-xl font-bold text-white">42</span>
                        </div>
                        <div className="w-full bg-neutral-800 rounded-full h-2">
                          <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-400">Vote Accuracy</span>
                          <span className="text-xl font-bold text-white">85%</span>
                        </div>
                        <div className="w-full bg-neutral-800 rounded-full h-2">
                          <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quiz Performance */}
                  <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-6">Quiz Performance</h3>
                    
                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold text-brand-yellow mb-2">{userStats.quizScore}%</div>
                      <div className="text-gray-400">Average Score</div>
                    </div>

                    <div className="space-y-4">
                      {[
                        { subject: 'Mathematics', score: 92 },
                        { subject: 'Science', score: 88 },
                        { subject: 'History', score: 79 },
                        { subject: 'Literature', score: 86 }
                      ].map((quiz, index) => (
                        <div key={quiz.subject} className="flex justify-between items-center">
                          <span className="text-gray-400">{quiz.subject}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-neutral-800 rounded-full h-2">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${quiz.score}%` }}
                                transition={{ duration: 1, delay: index * 0.2 }}
                                className="bg-gradient-to-r from-brand-yellow to-yellow-500 h-2 rounded-full"
                              ></motion.div>
                            </div>
                            <span className="text-white font-medium w-10">{quiz.score}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'achievements' && (
                <div>
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">Achievements</h3>
                    <p className="text-gray-400">Unlock badges and earn rewards for your participation</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {achievements.map((achievement, index) => (
                      <motion.div
                        key={achievement.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-6 rounded-xl border ${
                          achievement.unlocked
                            ? 'bg-gradient-to-br from-brand-yellow/10 to-yellow-500/10 border-brand-yellow/30'
                            : 'bg-neutral-900 border-neutral-700 opacity-60'
                        }`}
                      >
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                          achievement.unlocked 
                            ? 'bg-gradient-to-br from-brand-yellow to-yellow-500' 
                            : 'bg-neutral-700'
                        }`}>
                          <achievement.icon className={`w-6 h-6 ${
                            achievement.unlocked ? 'text-black' : 'text-gray-500'
                          }`} />
                        </div>
                        
                        <h4 className={`font-bold text-lg mb-2 ${
                          achievement.unlocked ? 'text-white' : 'text-gray-500'
                        }`}>
                          {achievement.name}
                        </h4>
                        
                        <p className={`text-sm ${
                          achievement.unlocked ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          {achievement.description}
                        </p>

                        {achievement.unlocked && (
                          <div className="mt-4 inline-flex items-center gap-1 text-xs text-brand-yellow font-medium">
                            <Trophy className="w-3 h-3" />
                            Unlocked
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="max-w-4xl">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">Profile Settings</h3>
                    <p className="text-gray-400">Manage your personal information and preferences</p>
                  </div>

                  <div className="bg-neutral-900 border border-neutral-700 rounded-xl divide-y divide-neutral-700">
                    
                    {/* Name Fields */}
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-3 text-white focus:border-brand-yellow focus:outline-none transition-colors"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-3 text-white focus:border-brand-yellow focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Bio */}
                    <div className="p-6">
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Bio
                      </label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        placeholder="Tell us about yourself..."
                        className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-3 text-white focus:border-brand-yellow focus:outline-none resize-none transition-colors"
                        rows={3}
                      />
                    </div>

                    {/* Institution & Location */}
                    {isStudent && (
                      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">
                            Institution
                          </label>
                          <input
                            type="text"
                            name="institution"
                            value={formData.institution}
                            onChange={handleInputChange}
                            placeholder="Your university"
                            className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-3 text-white focus:border-brand-yellow focus:outline-none transition-colors"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">
                            Campus
                          </label>
                          <input
                            type="text"
                            name="campus"
                            value={formData.campus}
                            onChange={handleInputChange}
                            placeholder="Campus location"
                            className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-3 text-white focus:border-brand-yellow focus:outline-none transition-colors"
                          />
                        </div>
                      </div>
                    )}

                    {/* Province */}
                    <div className="p-6">
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Province
                      </label>
                      <select
                        name="province"
                        value={formData.province}
                        onChange={(e) => handleInputChange(e as any)}
                        className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-3 text-white focus:border-brand-yellow focus:outline-none transition-colors"
                      >
                        <option value="">Select Province</option>
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

                    {/* Save Button */}
                    <div className="p-6 flex justify-end gap-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-8 py-3 bg-brand-yellow text-black rounded-lg font-medium hover:bg-yellow-500 transition-colors disabled:opacity-50"
                      >
                        {isSaving ? 'Saving...' : 'Save Changes'}
                      </motion.button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
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
