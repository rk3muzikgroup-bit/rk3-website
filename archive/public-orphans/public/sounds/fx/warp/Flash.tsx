"use client";

import { motion } from "framer-motion";

type Props = {
  active: boolean;
  color?: string;
  variant?: "pulse" | "glow" | "flare";
};

export default function WarpFlash({
  active,
  color = "white",
  variant = "pulse",
}: Props) {
  // Define flash variants
  const flashStyles = {
    pulse: {
      scale: [1, 1.3, 0.9, 1],
      opacity: [0.8, 1, 0.5, 0],
    },
    glow: {
      scale: [1, 1.5, 1],
      opacity: [0.7, 0.9, 0.4],
      filter: ["blur(0px)", "blur(4px)"],
    },
    flare: {
      scale: [1, 2.2, 0.8, 1],
      opacity: [1, 0.6, 0],
      rotate: [0, 15, -15, 0],
    },
  };

  const flashTransition = {
    duration: 0.8,
    ease: "easeOut",
    repeat: 0,
  };

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0, scale: 0 }}
      animate={active ? flashStyles[variant] : { opacity: 0, scale: 0 }}
      transition={flashTransition}
      style={{
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        borderRadius: "50%",
        mixBlendMode: "screen",
      }}
    />
  );
}
