'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Trophy, Users, Calendar, ArrowRight } from 'lucide-react';

/**
 * ContestantsPage
 * Self-contained page component.
 * Tailwind classes assumed available.
 */

export default function ContestantsPage() {
  const [contestants, setContestants] = useState([
    {
      id: 'c1',
      name: 'Amani Khumalo',
      campus: 'University of Cape Town',
      image: '/Images/Pink_Outfit.jpg',
      votes: 245678,
      bio: 'Performing arts student. Campus leader.'
    },
    {
      id: 'c2',
      name: 'Sipho Ndlovu',
      campus: 'University of Pretoria',
      image: '/Images/gorgeous-student-with-dental-braces-holding-notebook.jpg',
      votes: 198432,
      bio: 'Tech entrepreneur. Coding mentor.'
    },
    {
      id: 'c3',
      name: 'Lerato Mokoena',
      campus: 'Wits University',
      image: '/Images/Jackman.jpg',
      votes: 176890,
      bio: 'Debating champion and volunteer.'
    },
    {
      id: 'c4',
      name: 'Thabo Dlamini',
      campus: 'Durban University of Technology',
      image:
        '/Images/vertical-shot-happy-young-woman-with-curly-hair-holds-notepad-pen-makes-notes-what-she-observes-around-city-dressed-casual-green-jumper-poses-outdoors-against-blurred-background.jpg',
      votes: 154321,
      bio: 'Community organiser and poet.'
    }
  ]);

  const [activeId, setActiveId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'top' | 'recent'>('all');
  const [isAddOpen, setAddOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCampus, setNewCampus] = useState('');
  const [newImage, setNewImage] = useState('');
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -24]);

  function openDetail(id: string) {
    setActiveId(id);
  }

  function closeDetail() {
    setActiveId(null);
  }

  function handleDelete(id: string) {
    if (!confirm('Delete contestant?')) return;
    setContestants((s) => s.filter((c) => c.id !== id));
    if (activeId === id) setActiveId(null);
  }

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;
    const newC = {
      id: `c${Date.now()}`,
      name: newName.trim(),
      campus: newCampus.trim() || 'Unknown campus',
      image: newImage || '/Images/sergey-zolkin-_UeY8aTI6d0-unsplash.jpg',
      votes: 0,
      bio: ''
    };
    setContestants((s) => [newC, ...s]);
    setNewName('');
    setNewCampus('');
    setNewImage('');
    setAddOpen(false);
  }

  const list = contestants
    .slice()
    .sort((a, b) => (filter === 'top' ? b.votes - a.votes : a.name.localeCompare(b.name)));

  const active = contestants.find((c) => c.id === activeId) || null;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navbar */}
      <header className="bg-white/80 backdrop-blur sticky top-0 z-30 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-white font-black">
              RES
            </div>
            <div className="text-sm font-bold">Roomza&apos;s Educated Secret</div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/contestants" className="font-semibold">Contestants</Link>
            <Link href="/vote" className="text-gray-600 hover:text-gray-900">Vote</Link>
            <Link href="/impact" className="text-gray-600 hover:text-gray-900">Impact</Link>
            <Link href="/dashboard" className="px-3 py-2 bg-black text-white rounded-lg font-semibold">Dashboard</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <motion.section
        style={{ y: heroY }}
        className="relative overflow-hidden bg-black text-white"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="inline-block text-xs uppercase tracking-wide bg-white/8 px-3 py-1 rounded-full mb-6">Contestants</p>
            <h1 className="text-4xl lg:text-6xl font-black leading-tight">Meet the Students</h1>
            <p className="mt-4 text-lg text-white/80 max-w-xl">
              Profiles. Votes. Stories. Track contestants as they compete, grow, and win.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm ${filter === 'all' ? 'bg-white text-black' : 'bg-white/10 text-white'}`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('top')}
                className={`px-4 py-2 rounded-lg text-sm ${filter === 'top' ? 'bg-white text-black' : 'bg-white/10 text-white'}`}
              >
                Top Voted
              </button>
              <button
                onClick={() => setFilter('recent')}
                className={`px-4 py-2 rounded-lg text-sm ${filter === 'recent' ? 'bg-white text-black' : 'bg-white/10 text-white'}`}
              >
                A-Z
              </button>

              <button
                onClick={() => setAddOpen(true)}
                className="ml-4 px-4 py-2 rounded-lg text-sm bg-accent-500 text-white font-semibold"
              >
                + Add Contestant
              </button>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-white/5">
              <Image
                src="/Images/Silhouettes_2.jpg"
                alt="Contestants hero"
                width={900}
                height={900}
                className="object-cover w-full h-72 lg:h-96"
                priority
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Stats strip */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white rounded-xl p-4 shadow-md border">
          <Metric icon={<Users size={20} />} label="Contestants" value={contestants.length} />
          <Metric icon={<Trophy size={20} />} label="Top Votes" value={Math.max(...contestants.map((c) => c.votes), 0)} />
          <Metric icon={<Calendar size={20} />} label="Season" value="Season 1" />
        </div>
      </section>

      {/* Main grid */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: grid of contestants */}
        <section className="lg:col-span-2">
          <h2 className="text-lg font-bold mb-4">Featured Contestants</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {list.map((c) => (
              <motion.article
                key={c.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border"
              >
                <div className="relative aspect-[4/5]">
                  <Image src={c.image} alt={c.name} fill className="object-cover" />
                  <div className="absolute left-3 top-3 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    #{c.votes.toLocaleString()}
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-lg">{c.name}</h3>
                      <p className="text-xs text-gray-500 uppercase mt-1">{c.campus}</p>
                      <p className="mt-3 text-sm text-gray-700 line-clamp-2">{c.bio}</p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => openDetail(c.id)}
                        className="px-3 py-2 text-sm bg-black text-white rounded-lg font-semibold"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="px-3 py-2 text-sm text-red-600 border border-red-100 rounded-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Right: leaderboard / sidebar */}
        <aside className="space-y-6">
          <div className="bg-white p-4 rounded-2xl border shadow-sm">
            <h3 className="font-bold mb-3">Live Rankings</h3>
            <ol className="space-y-3">
              {contestants.slice().sort((a, b) => b.votes - a.votes).slice(0, 5).map((c, i) => (
                <li key={c.id} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center font-bold">{i + 1}</div>
                    <div>
                      <div className="font-semibold text-sm">{c.name}</div>
                      <div className="text-xs text-gray-500">{c.campus}</div>
                    </div>
                  </div>
                  <div className="text-sm font-black">{c.votes.toLocaleString()}</div>
                </li>
              ))}
            </ol>
            <Link href="/leaderboard" className="mt-4 inline-flex items-center gap-2 text-sm text-primary-600">
              Full leaderboard <ArrowRight size={14} />
            </Link>
          </div>

          <div className="bg-white p-4 rounded-2xl border shadow-sm">
            <h3 className="font-bold mb-3">Quick Actions</h3>
            <div className="flex flex-col gap-3">
              <button onClick={() => setAddOpen(true)} className="py-2 rounded-lg bg-accent-500 text-white font-semibold">Add contestant</button>
              <button onClick={() => setContestants((s) => s.map((x) => ({ ...x, votes: x.votes + Math.floor(Math.random() * 500) })))} className="py-2 rounded-lg border">Simulate votes</button>
              <Link href="/dashboard" className="py-2 rounded-lg text-center border">Open dashboard</Link>
            </div>
          </div>
        </aside>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-sm text-gray-600 flex flex-col md:flex-row justify-between gap-4">
          <div>© {new Date().getFullYear()} R.E.S. All rights reserved.</div>
          <div className="flex gap-4">
            <Link href="/terms" className="hover:underline">Terms</Link>
            <Link href="/privacy" className="hover:underline">Privacy</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
          </div>
        </div>
      </footer>

      {/* Detail modal */}
      <AnimateDetail
        active={active}
        onClose={closeDetail}
        onDelete={handleDelete}
      />

      {/* Add Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-md bg-white rounded-xl p-6">
            <h3 className="font-bold text-lg mb-4">Add contestant</h3>
            <form onSubmit={handleAdd} className="space-y-3">
              <input required placeholder="Full name" value={newName} onChange={(e) => setNewName(e.target.value)} className="w-full p-2 border rounded" />
              <input placeholder="Campus" value={newCampus} onChange={(e) => setNewCampus(e.target.value)} className="w-full p-2 border rounded" />
              <input placeholder="Image URL" value={newImage} onChange={(e) => setNewImage(e.target.value)} className="w-full p-2 border rounded" />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setAddOpen(false)} className="px-4 py-2 rounded border">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded bg-black text-white">Create</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

/* small components */

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: number | string }) {
  return (
    <div className="flex items-center gap-4 p-4">
      <div className="w-12 h-12 rounded-lg bg-white shadow flex items-center justify-center text-black">
        {icon}
      </div>
      <div>
        <div className="text-2xl font-black">{value}</div>
        <div className="text-xs text-gray-500">{label}</div>
      </div>
    </div>
  );
}

function AnimateDetail({ active, onClose, onDelete }: any) {
  if (!active) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full max-w-3xl bg-white rounded-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <div className="relative lg:col-span-1 h-64 lg:h-auto">
            <Image src={active.image} alt={active.name} fill className="object-cover" />
          </div>

          <div className="p-6 lg:col-span-2">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold">{active.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{active.campus}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Votes</div>
                <div className="text-2xl font-black">{active.votes.toLocaleString()}</div>
              </div>
            </div>

            <p className="mt-4 text-gray-700">{active.bio || 'No bio available.'}</p>

            <div className="mt-6 flex gap-3">
              <button className="px-4 py-2 bg-black text-white rounded-lg">Message</button>
              <button onClick={() => onDelete(active.id)} className="px-4 py-2 border rounded-lg text-red-600">Delete</button>
              <button onClick={onClose} className="ml-auto px-4 py-2 rounded-lg border">Close</button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
