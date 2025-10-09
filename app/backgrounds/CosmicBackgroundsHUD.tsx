"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const starLayers = [
  { count: 40, size: 1.5, duration: 12 },
  { count: 25, size: 2.5, duration: 18 },
  { count: 15, size: 4, duration: 25 },
];

export default function CosmicBackgroundsHUD({
  cycle = true,
  duration = 20000,
}: {
  cycle?: boolean;
  duration?: number;
}) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!cycle) return;
    const timer = setInterval(() => {
      setPhase((prev) => (prev + 1) % starLayers.length);
    }, duration);
    return () => clearInterval(timer);
  }, [cycle, duration]);

  const activeLayer = starLayers[phase];

  return (
    <div aria-hidden className="fixed inset-0 bg-black -z-10 overflow-hidden">
      {Array.from({ length: activeLayer.count }).map((_, i) => {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0] }}
            transition={{
              duration: activeLayer.duration,
              delay: i * 0.3,
              repeat: Infinity,
            }}
            className="absolute rounded-full bg-white"
            style={{
              width: activeLayer.size,
              height: activeLayer.size,
              left: `${x}%`,
              top: `${y}%`,
            }}
          />
        );
      })}
    </div>
  );
}
