"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

type Props = {
  elapsedMs: number;
  totalMs: number;
  onSeek: (ms: number) => void;
};

export default function WaveformScrubber({
  elapsedMs,
  totalMs,
  onSeek,
}: Props) {
  const progress = totalMs ? elapsedMs / totalMs : 0;

  const bars = useMemo(() => {
    return Array.from({ length: 48 }, () =>
      Math.random() * 0.6 + 0.4
    );
  }, []);

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    onSeek(Math.max(0, Math.min(totalMs, pct * totalMs)));
  }

  return (
    <div
      onClick={handleClick}
      className="relative h-16 w-full cursor-pointer"
    >
      {/* BARS */}
      <div className="absolute inset-0 flex items-end gap-[2px]">
        {bars.map((h, i) => {
          const filled = i / bars.length < progress;
          return (
            <div
              key={i}
              className={`flex-1 rounded-sm transition-colors ${
                filled ? "bg-emerald-400/80" : "bg-white/10"
              }`}
              style={{ height: `${h * 100}%` }}
            />
          );
        })}
      </div>

      {/* SCRUB LINE */}
      <motion.div
        className="absolute top-0 bottom-0 w-[2px] bg-white"
        style={{ left: `${progress * 100}%` }}
        layout
      />
    </div>
  );
}
