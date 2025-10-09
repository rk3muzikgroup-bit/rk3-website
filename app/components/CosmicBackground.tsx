"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface CosmicBackgroundProps {
  flicker?: boolean; // 🔥 when true, cosmic dust will shimmer & flash
}

export default function CosmicBackground({ flicker = false }: CosmicBackgroundProps) {
  const [stars, setStars] = useState<{ x: number; y: number; size: number }[]>([]);

  // Generate random starfield on mount
  useEffect(() => {
    const starArray = Array.from({ length: 120 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
    }));
    setStars(starArray);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {/* 🌌 Base starfield */}
      <div className="absolute inset-0">
        {stars.map((star, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
            }}
            animate={{
              opacity: [0.1, 1, 0.1],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* 🌫️ Cosmic dust layer (soft glow) */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-black to-black"
        animate={{
          opacity: flicker ? [0.2, 0.6, 0.2] : [0.3, 0.3, 0.3],
        }}
        transition={{
          duration: flicker ? 0.8 : 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ⚡ Energy surges (only when flicker=true) */}
      {flicker && (
        <motion.div
          className="absolute inset-0 bg-white/10 mix-blend-overlay"
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </div>
  );
}
