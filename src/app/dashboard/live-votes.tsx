'use client';

import useLiveVotes from '@/hooks/useLiveVotes';
import { motion } from 'framer-motion';

export default function LiveVotesBoard() {
  const votes = useLiveVotes();

  return (
    <div className="p-10 bg-warm-stone-secondary rounded-2xl shadow-xl border border-warm-stone-border">
      <h2 className="text-3xl font-black mb-8">Live Votes</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {votes.map((c: any) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl bg-warm-stone-base border border-warm-stone-border"
          >
            <p className="font-bold text-xl">{c.name}</p>
            <p className="text-3xl font-black mt-2">{c.votes}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
