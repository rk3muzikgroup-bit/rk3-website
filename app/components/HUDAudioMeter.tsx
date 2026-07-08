"use client";

import { useEffect, useState } from "react";

/* ───────── CONSTANTS ───────── */

const BAR_COUNT = 8;
const MAX_HEIGHT = 32;
const MIN_HEIGHT = 4;
const SCALE = 40;

/* ───────── COMPONENT ───────── */

export default function HUDAudioMeter() {
  const [level, setLevel] = useState(0);

  useEffect(() => {
    let raf: number;
    let active = true;

    const prefersReducedMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches;

    function tick() {
      if (!active) return;

      let raw =
        parseFloat(
          getComputedStyle(document.documentElement)
            .getPropertyValue("--sound-energy")
        ) || 0;

      // Clamp + normalize safety
      const clamped = Math.max(0, Math.min(1, raw));

      // Light smoothing to avoid jitter
      setLevel(prev =>
        prefersReducedMotion
          ? clamped
          : prev + (clamped - prev) * 0.35
      );

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);

    return () => {
      active = false;
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className="fixed bottom-6 left-6 z-50 flex items-end gap-1 pointer-events-none"
      aria-hidden
    >
      {Array.from({ length: BAR_COUNT }).map((_, i) => {
        const rawHeight = level * SCALE - i * 4;
        const height = Math.max(
          MIN_HEIGHT,
          Math.min(MAX_HEIGHT, rawHeight)
        );

        return (
          <div
            key={i}
            className="w-[4px] rounded bg-white/80 transition-[height] duration-75"
            style={{ height }}
          />
        );
      })}
    </div>
  );
}
