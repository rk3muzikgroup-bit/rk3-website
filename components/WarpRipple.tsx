"use client";

import { motion } from "framer-motion";

type Props = {
  active: boolean;
  color?: string;
  variant?: "glitch" | "wave" | "spark" | "quantum";
};

export default function WarpRipple({
  active,
  color = "white",
  variant = "wave",
}: Props) {
  // Define ripple variants
  const rippleStyles = {
    glitch: {
      scale: [1, 1.3, 0.8, 1.2, 1],
      opacity: [0.7, 1, 0.3, 1],
      filter: ["contrast(200%) brightness(150%)", "none"],
    },
    wave: {
      scale: [1, 1.5, 1],
      opacity: [0.6, 0.8, 0.6],
    },
    spark: {
      scale: [1, 1.1, 1.3, 0.9, 1],
      opacity: [0.5, 1, 0.5],
      rotate: [0, 15, -15, 0],
    },
    quantum: {
      scale: [1, 2, 0.5, 2.5, 1],
      opacity: [0.9, 0.4, 1, 0.2, 0.8],
      rotate: [0, 90, -90, 0],
    },
  };

  const rippleTransition = {
    duration: 1.2,
    ease: "easeInOut",
    repeat: active ? Infinity : 0,
  };

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0, scale: 0 }}
      animate={active ? rippleStyles[variant] : { opacity: 0, scale: 0 }}
      transition={rippleTransition}
      style={{
        border: `2px solid ${color}`,
        borderRadius: "50%",
      }}
    />
  );
}
