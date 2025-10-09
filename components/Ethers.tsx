"use client";

import { motion } from "framer-motion";

interface Ether {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

export default function Ethers({ count = 20 }: { count?: number }) {
  const ethers: Ether[] = Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: Math.random() * 100, // percentage
    y: Math.random() * 100,
    size: 2 + Math.random() * 3, // 2–5px
    delay: Math.random() * 8, // seconds
  }));

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
      {ethers.map((ether) => (
        <motion.div
          key={ether.id}
          initial={{ opacity: 0, x: `${ether.x}%`, y: `${ether.y}%` }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 3 + Math.random() * 3,
            delay: ether.delay,
            repeat: Infinity,
            repeatType: "loop",
          }}
          className="absolute rounded-full bg-white"
          style={{ width: ether.size, height: ether.size }}
        />
      ))}
    </div>
  );
}
