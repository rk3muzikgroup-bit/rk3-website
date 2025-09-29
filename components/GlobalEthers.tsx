"use client";

import { useEffect, useState } from "react";
import { useOrbs } from "@/context/OrbContext";

type Spark = {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
};

export default function GlobalEthers() {
  const { enabled } = useOrbs();
  const [sparks, setSparks] = useState<Spark[]>([]);

  useEffect(() => {
    if (!enabled) return;

    const newSparks = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 6,
      duration: 2 + Math.random() * 4,
    }));

    setSparks(newSparks);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {sparks.map((s) => (
        <div
          key={s.id}
          className="absolute w-1 h-1 rounded-full animate-ping"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            background: `conic-gradient(
              from 0deg,
              rgba(16,185,129,0.6),
              rgba(99,102,241,0.6),
              rgba(253,224,71,0.6),
              rgba(16,185,129,0.6)
            )`,
            WebkitMaskImage: "radial-gradient(circle, white 80%, transparent 100%)",
            maskImage: "radial-gradient(circle, white 80%, transparent 100%)",
            animation: `sparkShift ${s.duration * 2}s linear infinite`,
          }}
        />
      ))}

      {/* keyframes for color cycling */}
      <style jsx global>{`
        @keyframes sparkShift {
          0% {
            filter: hue-rotate(0deg);
          }
          50% {
            filter: hue-rotate(120deg);
          }
          100% {
            filter: hue-rotate(240deg);
          }
        }
      `}</style>
    </div>
  );
}
// inside return
return (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
    {orbs.map((orb) => (
      <div
        key={orb.id}
        className="absolute rounded-full blur-3xl transition-opacity duration-[4000ms] ease-in-out"
        style={{
          left: `${orb.x}%`,
          top: `${orb.y}%`,
          width: `${orb.size}px`,
          height: `${orb.size}px`,
          background: orb.color,
          opacity: orb.opacity,
        }}
      />
    ))}
  </div>
);
