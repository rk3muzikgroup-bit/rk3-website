"use client";

import { useSteering } from "@/context/SteeringContext";
import { motion } from "framer-motion";

export default function CockpitImmersion() {
  const { y, x } = useSteering();
  const thrustPower = Math.round((y + 1) * 50); // 0–100
  const steerOffset = Math.round(x * 50);

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none z-0"
      animate={{
        backgroundColor:
          thrustPower > 80
            ? "rgba(220,38,38,0.15)" // red at high thrust
            : thrustPower > 40
            ? "rgba(34,197,94,0.15)" // green mid thrust
            : "rgba(45,212,191,0.1)", // teal low thrust
      }}
      transition={{ duration: 0.6 }}
    >
      {/* Dashboard Reflection Layer */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/10 to-transparent"
        animate={{ x: steerOffset / 5 }}
        transition={{ type: "spring", stiffness: 60, damping: 20 }}
      />
    </motion.div>
  );
}
