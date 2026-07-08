"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "rk3_portal_unlocked";

export default function IntroPortal({
  onEnter,
}: {
  onEnter?: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [closing, setClosing] = useState(false);

  /* ───────── MOUNT + CHECK ───────── */
  useEffect(() => {
    setMounted(true);

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "true") {
        setUnlocked(true);
      }
    } catch {
      // fail silently
    }
  }, []);

  /* ───────── EARLY EXIT ───────── */
  if (!mounted || unlocked) return null;

  /* ───────── ENTER ACTION ───────── */
  function handleEnter() {
    if (closing) return;

    setClosing(true);

    setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, "true");
      } catch {}

      setUnlocked(true);
      onEnter?.(); // 🚀 trigger ship / audio / warp
    }, 900);
  }

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-700 ${
        closing ? "opacity-0" : "opacity-100"
      }`}
      role="dialog"
      aria-modal="true"
    >
      {/* CONTENT */}
      <div
        className={`relative z-10 text-center space-y-8 transition-all duration-700 ${
          closing
            ? "scale-150 opacity-0 blur-md"
            : "scale-100 opacity-100"
        }`}
      >
        <h1 className="text-4xl md:text-5xl tracking-[0.45em] uppercase glow animate-pulse">
          Enter
        </h1>

        <p className="opacity-70 tracking-widest text-sm">
          RK3 Command Base
        </p>

        <button
          onClick={handleEnter}
          onKeyDown={e =>
            e.key === "Enter" && handleEnter()
          }
          className="mt-6 px-10 py-3 border border-white/30 rounded-full text-sm tracking-widest hover:bg-white/10 transition"
          autoFocus
        >
          ENTER
        </button>
      </div>

      {/* PORTAL OVERLAY */}
      <div
        className={`absolute inset-0 pointer-events-none transition-all duration-[900ms] ${
          closing
            ? "scale-150 opacity-0"
            : "scale-100 opacity-100"
        }`}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_60%)]" />
      </div>
    </div>
  );
}
