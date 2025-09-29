"use client";

import { useSteering } from "@/context/SteeringContext";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";

export default function CockpitRide({ src }: { src: string }) {
  const { x, y } = useSteering();
  const steerOffset = Math.round(x * 50);   // -50 ↔ 50
  const thrustPower = Math.round((y + 1) * 50); // 0–100
  const videoRef = useRef<HTMLVideoElement>(null);

  // Adjust video speed by thrust
  useEffect(() => {
    if (videoRef.current) {
      const rate = 0.8 + thrustPower / 250; // 0.8x → 1.2x
      videoRef.current.playbackRate = rate;
    }
  }, [thrustPower]);

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden"
      animate={{
        rotate: steerOffset / 10, // tilt video with steering
        scale: 1 + thrustPower / 500, // subtle zoom at high thrust
      }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        className="w-full h-full object-cover"
      />
      {/* Glow overlay for thrust */}
      <motion.div
        className="absolute inset-0 bg-teal-400/10 pointer-events-none"
        animate={{ opacity: thrustPower / 100 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
