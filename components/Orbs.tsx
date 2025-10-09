"use client";

import { motion } from "framer-motion";

interface Orb {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
}

export default function Orbs({ count = 5 }: { count?: number }) {
  const orbs: Orb[] = Array.from({ length: count }).map((_, i) => ({
    id: i,
    size: 80 + Math.random() * 120,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 15 + Math.random() * 20,
  }));

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          initial={{ opacity: 0, x: `${orb.x}%`, y: `${orb.y}%` }}
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            repeatType: "mirror",
          }}
          className="absolute rounded-full bg-gradient-to-r from-indigo-500/40 to-purple-700/40 blur-3xl"
          style={{ width: orb.size, height: orb.size }}
        />
      ))}
    </div>
  );
}
