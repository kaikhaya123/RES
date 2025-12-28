'use client';

import { motion, useMotionValue } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

type Card = {
  id: number;
  image: string;
  name: string;
  votes: number;
  rank: number;
};

const ARC_RADIUS = 260;
const CARD_WIDTH = 220;
const CARD_HEIGHT = 320;

export default function ArchCarousel({ cards }: { cards: Card[] }) {
  const [active, setActive] = useState(0);
  const dragX = useMotionValue(0);

  function onDragEnd(_: any, info: any) {
    if (info.offset.x < -80) {
      setActive((p) => (p + 1) % cards.length);
    }
    if (info.offset.x > 80) {
      setActive((p) => (p - 1 + cards.length) % cards.length);
    }
  }

  return (
    <div className="relative w-full h-[420px] flex items-center justify-center overflow-hidden">
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        style={{ x: dragX }}
        onDragEnd={onDragEnd}
        className="relative w-full h-full cursor-grab"
      >
        {cards.map((card, index) => {
          const offset = index - active;
          const angle = offset * 12;
          const y = Math.abs(offset) * 22;
          const scale = offset === 0 ? 1 : 0.9;
          const opacity = Math.abs(offset) > 3 ? 0 : 1;

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{
                opacity,
                x: offset * (CARD_WIDTH * 0.6),
                y,
                rotate: angle,
                scale
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ zIndex: 100 - Math.abs(offset) }}
            >
              <div className="group relative w-[220px] h-[320px] rounded-2xl overflow-hidden bg-black shadow-2xl">
                <Image
                  src={card.image}
                  alt={card.name}
                  fill
                  className="object-cover img-lighten"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition" />

                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition">
                  <p className="font-black text-sm">{card.name}</p>
                  <p className="text-xs text-white/70 mt-1">
                    {card.votes.toLocaleString()} votes
                  </p>
                  <p className="text-xs font-black mt-1">#{card.rank}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
