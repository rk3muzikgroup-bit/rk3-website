"use client";

import { useEffect, useState } from "react";
import { useOrbs } from "@/context/OrbContext";

type Orb = {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  active: boolean;
  dx: number;
  dy: number;
};

export default function GlobalOrbs() {
  const { enabled } = useOrbs();
  const [orbs, setOrbs] = useState<Orb[]>([]);

  useEffect(() => {
    if (!enabled) return;

    const colors = [
      "rgba(16,185,129,0.18)", // emerald faint
      "rgba(99,102,241,0.15)", // indigo faint
      "rgba(253,224,71,0.15)", // gold faint
      "rgba(255,255,255,0.1)", // white faint
    ];

    const newOrbs = Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 60 + Math.random() * 80,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 0,
      active: false,
      dx: (Math.random() - 0.5) * 0.05, // small random direction
      dy: (Math.random() - 0.5) * 0.05,
    }));

    setOrbs(newOrbs);

    const interval = setInterval(() => {
      setOrbs((prev) =>
        prev.map((orb) => {
          // Random fade toggle
          const toggle = Math.random() < 0.01;
          let active = orb.active;
          if (toggle) active = !orb.active;

          // Randomly nudge directions (like a current)
          let dx = orb.dx + (Math.random() - 0.5) * 0.002;
          let dy = orb.dy + (Math.random() - 0.5) * 0.002;

          // Clamp speed so it never gets wild
          const maxSpeed = 0.05;
          dx = Math.max(-maxSpeed, Math.min(maxSpeed, dx));
          dy = Math.max(-maxSpeed, Math.min(maxSpeed, dy));

          // New positions
          let newX = orb.x + dx;
          let newY = orb.y + dy;

          // Wrap around edges
          if (newX < -10) newX = 110;
          if (newX > 110) newX = -10;
          if (newY < -10) newY = 110;
          if (newY > 110) newY = -10;

          return {
            ...orb,
            x: newX,
            y: newY,
            dx,
            dy,
            active,
            opacity: active ? 0.15 : 0,
          };
        })
      );
    }, 100);

    return () => clearInterval(interval);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
}
