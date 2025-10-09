"use client";

import { motion } from "framer-motion";

interface OrbsProps {
  count?: number;
  color?: string;   // 🔮 "emerald-400", "purple-500" etc.
  pulse?: boolean;  // ⚡ when true, they sync-breathe with the vault hum
}

export default function Orbs({ count = 5, color = "emerald-400", pulse = false }: OrbsProps) {
  // Tailwind color → glow mapping
  const colorGlows: Record<string, string> = {
    "emerald-400": "shadow-[0_0_20px_6px_rgba(52,211,153,0.8)] bg-emerald-400",
    "purple-500": "shadow-[0_0_20px_6px_rgba(168,85,247,0.8)] bg-purple-500",
    "yellow-400": "shadow-[0_0_20px_6px_rgba(250,204,21,0.8)] bg-yellow-400",
    "indigo-400": "shadow-[0_0_20px_6px_rgba(129,140,248,0.8)] bg-indigo-400",
    "pink-400": "shadow-[0_0_20px_6px_rgba(244,114,182,0.8)] bg-pink-400",
  };

  const orbStyle = colorGlows[color] || "bg-white shadow-[0_0_20px_6px_rgba(255,255,255,0.8)]";

  // Create orbs at random positions
  const orbs = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 25 + 15, // 15–40px
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className={`absolute rounded-full ${orbStyle}`}
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
          }}
          animate={{
            scale: pulse ? [1, 1.3, 1] : [1, 1.05, 1],
            opacity: pulse ? [0.6, 1, 0.6] : [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: pulse ? 3 : 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.id * 0.2, // stagger start for realism
          }}
        />
      ))}
    </div>
  );
}
