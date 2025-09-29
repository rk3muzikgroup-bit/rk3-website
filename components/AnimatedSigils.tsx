"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

/**
 * AnimatedSigils
 * - Renders subtle floating number-sigils (111, 777, 444, 888)
 * - Randomized positions, opacities, timings so they feel like "art working"
 * - Designed to be layered over VaultEthers (z-index high enough to be seen, but low intensity)
 */

const SIGILS = ["111", "777", "444", "888"] as const;

type Sigil = {
  id: string;
  text: string;
  left: string;
  top: string;
  scale: number;
  delay: number;
  duration: number;
  color: string;
  opacity: number;
};

const COLOR_MAP: Record<string, string> = {
  "111": "text-indigo-300",
  "777": "text-emerald-300",
  "444": "text-yellow-300",
  "888": "text-pink-300",
};

export default function AnimatedSigils({
  density = 6, // how many sigils are present over time
  maxSize = 40, // max font size in px (approx)
}: {
  density?: number;
  maxSize?: number;
}) {
  const [tick, setTick] = useState(0);

  // generate a stable set of sigils per mount
  const items: Sigil[] = useMemo(() => {
    return Array.from({ length: density }).map((_, i) => {
      const text = SIGILS[Math.floor(Math.random() * SIGILS.length)];
      const left = `${5 + Math.random() * 90}%`;
      const top = `${5 + Math.random() * 85}%`;
      const scale = 0.6 + Math.random() * 1.2;
      const delay = Math.random() * 18; // spread appearances
      const duration = 6 + Math.random() * 12;
      const color = COLOR_MAP[text] ?? "text-gray-300";
      const opacity = 0.06 + Math.random() * 0.16; // very subtle baseline
      return {
        id: `${text}-${i}-${Math.floor(Math.random() * 9999)}`,
        text,
        left,
        top,
        scale,
        delay,
        duration,
        color,
        opacity,
      };
    });
  }, [density]);

  // small tick to retrigger subtle repositioning over long sessions
  useEffect(() => {
    const t = setInterval(() => setTick((s) => s + 1), 30000); // refresh every 30s for tiny shuffle
    return () => clearInterval(t);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden z-20">
      {items.map((it) => (
        <motion.div
          key={it.id + "-" + tick}
          initial={{ opacity: 0, scale: it.scale * 0.9, y: 10 }}
          animate={{
            opacity: [0, it.opacity, it.opacity * 1.4, 0],
            scale: [it.scale * 0.9, it.scale, it.scale * 1.05, it.scale * 0.95],
            y: [10, 0, -6, 0],
          }}
          transition={{
            delay: it.delay,
            duration: it.duration,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 18 + Math.random() * 24,
          }}
          style={{
            left: it.left,
            top: it.top,
            position: "absolute",
            fontVariantNumeric: "tabular-nums",
            fontWeight: 700,
            letterSpacing: "0.18em",
            transformOrigin: "center center",
            // responsive font size
            fontSize: `${Math.round((maxSize * it.scale) / 1.2)}px`,
            // subtle blur so it blends with ethers
            filter: "blur(0.2px)",
          }}
          className={`${it.color} select-none`}
        >
          <span
            style={{
              WebkitTextStroke: "0.2px rgba(0,0,0,0.25)",
              mixBlendMode: "screen",
            }}
            className="opacity-90"
          >
            {it.text}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
