"use client";

import { useEffect, useState } from "react";
import ParallaxLayer from "./ParallaxLayer";

/**
 * NebulaField — SOUND-REACTIVE
 * Driven by CSS variable: --sound-energy (0 → 1)
 */
export default function NebulaField() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * Base opacity (hydration-safe)
   * Energy adds on top via CSS calc()
   */
  const farBase = mounted ? 0.28 : 0.24;
  const midBase = mounted ? 0.36 : 0.30;
  const nearBase = mounted ? 0.44 : 0.36;

  return (
    <>
      {/* FAR NEBULA — subtle */}
      <ParallaxLayer depth={3}>
        <div
          className="pointer-events-none absolute -top-1/3 -left-1/3 w-[900px] h-[900px] rounded-full nebula"
          style={{
            background: "var(--glow-soft)",
            opacity: `calc(${farBase} + var(--sound-energy) * 0.12)`,
            transform: `scale(calc(1 + var(--sound-energy) * 0.03))`,
          }}
        />
      </ParallaxLayer>

      {/* MID NEBULA — main body */}
      <ParallaxLayer depth={8}>
        <div
          className="pointer-events-none absolute top-[20%] right-[-20%] w-[700px] h-[700px] rounded-full nebula"
          style={{
            background: "var(--glow-main)",
            opacity: `calc(${midBase} + var(--sound-energy) * 0.22)`,
            transform: `scale(calc(1 + var(--sound-energy) * 0.05))`,
          }}
        />
      </ParallaxLayer>

      {/* NEAR NEBULA — power layer */}
      <ParallaxLayer depth={14}>
        <div
          className="pointer-events-none absolute bottom-[-30%] left-[10%] w-[600px] h-[600px] rounded-full nebula"
          style={{
            background: "var(--glow-strong)",
            opacity: `calc(${nearBase} + var(--sound-energy) * 0.35)`,
            transform: `scale(calc(1 + var(--sound-energy) * 0.08))`,
          }}
        />
      </ParallaxLayer>
    </>
  );
}
