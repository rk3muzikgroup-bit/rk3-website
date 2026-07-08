"use client";

import { useEffect, useRef, useState } from "react";

export default function WarpTransition({ active }: { active: boolean }) {
  const [visible, setVisible] = useState(active);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (active) {
      // immediately show
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setVisible(true);
    } else {
      // allow fade-out before unmount
      timeoutRef.current = window.setTimeout(() => {
        setVisible(false);
        timeoutRef.current = null;
      }, 700);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [active]);

  if (!visible) return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[90] pointer-events-none transition-opacity duration-700 ease-out ${
        active ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* HARD BLACK BASE */}
      <div className="absolute inset-0 bg-black" />

      {/* ENERGY CORE (sound-reactive, JS-safe) */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(circle at center, var(--glow-main), transparent 60%)",
          opacity: 0.6,
        }}
      />

      {/* WARP STREAK FIELD */}
      <div className="absolute inset-0 animate-warp-lines opacity-40" />

      {/* DEPTH BLOOM */}
      <div
        className="absolute inset-0"
        style={{
          boxShadow:
            "inset 0 0 180px rgba(0,0,0,0.9), inset 0 0 60px rgba(0,0,0,0.6)",
        }}
      />

      {/* FILM GRAIN */}
      <div className="absolute inset-0 opacity-[0.035] bg-[url('/noise.png')]" />
    </div>
  );
}
