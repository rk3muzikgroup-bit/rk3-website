"use client";

import { useEffect, useState } from "react";

interface Props {
  userId?: string; // unique ID/email to embed
}

export default function WatermarkOverlay({ userId = "VAULT-MEMBER" }: Props) {
  const [positions, setPositions] = useState<{ x: number; y: number; opacity: number }[]>([]);

  // Generate random floating positions every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPositions((prev) => {
        const newPos = {
          x: Math.random() * 80 + 10, // % across screen
          y: Math.random() * 70 + 15, // % down screen
          opacity: Math.random() * 0.25 + 0.2, // 0.2–0.45
        };
        return [...prev.slice(-2), newPos]; // keep last 2, add new
      });
    }, 7000); // new position every 7s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-50">
      {/* Static Brand Mark — THE VAULT */}
      <div className="absolute bottom-6 right-6 text-4xl font-extrabold tracking-widest select-none
                      text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-emerald-400 to-yellow-400
                      drop-shadow-[0_0_12px_rgba(255,255,255,0.6)] animate-pulse">
        THE VAULT
      </div>

      {/* Floating user ID marks */}
      {positions.map((pos, i) => (
        <div
          key={i}
          className="absolute text-white text-lg font-bold select-none"
          style={{
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            opacity: pos.opacity,
            animation: "floaty 20s linear infinite",
            textShadow: "0 0 6px rgba(255,255,255,0.4)",
          }}
        >
          {userId}
        </div>
      ))}

      {/* CSS animation for drift */}
      <style jsx>{`
        @keyframes floaty {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          50% {
            transform: translate(-20px, 15px) scale(1.05);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
