"use client";

import { motion } from "framer-motion";
import { useSteering } from "@/context/SteeringContext";

export default function CockpitHUD() {
  const { x, y } = useSteering();
  const speed = Math.round((y + 1) * 500); // thrust mapped to 0–1000 speed
  const steerOffset = Math.round(x * 50); // -50 to 50

  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 text-teal-300 font-mono text-sm">
      {/* Top HUD */}
      <div className="flex justify-between">
        <span>RK3 SYSTEMS ONLINE</span>
        <span>SPEED: {speed}</span>
      </div>

      {/* Center HUD */}
      <div className="flex justify-center items-center h-full">
        <motion.div
          className="w-24 h-1 bg-teal-400/50"
          animate={{ x: steerOffset }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </div>

      {/* Bottom HUD */}
      <div className="flex justify-between">
        <span>STEER: {steerOffset}°</span>
        <span>THRUST: {Math.round((y + 1) * 50)}%</span>
      </div>
    </div>
  );
}
