"use client";

import { useEffect } from "react";

export default function WarpCameraShake({ active }: { active: boolean }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect reduced motion
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduce) return;

    const root = document.documentElement;

    // Cleanup helper
    const clearShake = () => {
      root.style.removeProperty("--shake-x");
      root.style.removeProperty("--shake-y");
      root.style.removeProperty("--shake-r");
    };

    if (!active) {
      clearShake();
      return;
    }

    let raf: number;

    const tick = () => {
      // Read sound energy (0 → 1)
      const raw = getComputedStyle(root)
        .getPropertyValue("--sound-energy")
        .trim();

      const se = Math.min(
        Math.max(parseFloat(raw || "0.2"), 0),
        1
      );

      // Cinematic micro-shake (very controlled)
      const amp = 0.35 + se * 1.15; // px
      const rot = 0.06 + se * 0.12; // deg

      const x = (Math.random() * 2 - 1) * amp;
      const y = (Math.random() * 2 - 1) * amp;
      const r = (Math.random() * 2 - 1) * rot;

      root.style.setProperty("--shake-x", `${x.toFixed(2)}px`);
      root.style.setProperty("--shake-y", `${y.toFixed(2)}px`);
      root.style.setProperty("--shake-r", `${r.toFixed(3)}deg`);

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearShake();
    };
  }, [active]);

  return null;
}
