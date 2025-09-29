"use client";

import { useSteering } from "@/context/SteeringContext";
import { motion } from "framer-motion";

export default function PortalOverlay({ type }: { type: "street" | "soul" | "spirit" }) {
  const { x, y } = useSteering();
  const steerOffset = Math.round(x * 50);
  const thrustPower = Math.round((y + 1) * 50);

  // Color themes per portal
  const themes = {
    street: { color: "gold", glow: "rgba(255,215,0,0.6)" },
    soul: { color: "pink", glow: "rgba(236,72,153,0.5)" },
    spirit: { color: "indigo", glow: "rgba(99,102,241,0.5)" },
  };

  const theme = themes[type];

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 font-mono text-sm z-20">
      {/* Top HUD */}
      <div className="flex justify-between text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]">
        <span className="uppercase">{type} portal</span>
        <span style={{ color: theme.color }}>Thrust: {thrustPower}%</span>
      </div>

      {/* Center crosshair */}
      <div className="flex justify-center items-center h-full">
        <motion.div
          className="w-20 h-1 rounded bg-white/60"
          style={{ boxShadow: `0 0 20px ${theme.glow}` }}
          animate={{ x: steerOffset }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </div>

      {/* Bottom HUD */}
      <div className="flex justify-between text-white">
        <span>Steer: {steerOffset}°</span>
        <span className="opacity-80">POWER LEVEL</span>
      </div>
    </div>
  );
}
