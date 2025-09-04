"use client";

import { motion } from "framer-motion";

type Props = {
  active: boolean;
  color?: string;
  variant?: "fracture" | "bloom" | "starlight" | "nebula";
};

export default function PortalBurst({
  active,
  color = "white",
  variant = "bloom",
}: Props) {
  // Define burst variants
  const burstStyles = {
    fracture: {
      scale: [1, 1.4, 0.8, 1.2, 1],
      opacity: [1, 0.6, 0],
      filter: ["blur(0px)", "blur(2px)"],
    },
    bloom: {
      scale: [1, 2, 1],
      opacity: [0.8, 0.4, 0],
      filter: ["blur(2px)", "blur(0px)"],
    },
    starlight: {
      scale: [1, 1.8, 0.9, 1.3, 1],
      opacity: [0.9, 0.6, 0],
      rotate: [0, 25, -25, 0],
    },
    nebula: {
      scale: [1, 3, 1],
      opacity: [1, 0.5, 0],
      filter: ["blur(2px)", "blur(8px)"],
      rotate: [0, 180, -180, 0],
    },
  };

  const burstTransition = {
    duration: 1.0,
    ease: "easeOut",
    repeat: 0,
  };

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0, scale: 0 }}
      animate={active ? burstStyles[variant] : { opacity: 0, scale: 0 }}
      transition={burstTransition}
      style={{
        border: `3px solid ${color}`,
        borderRadius: "50%",
        boxShadow: `0 0 20px ${color}`,
      }}
    />
  );
}
