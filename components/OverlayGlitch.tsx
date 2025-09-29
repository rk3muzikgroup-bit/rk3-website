"use client";

import { motion } from "framer-motion";

type Props = {
  text: string;
  show?: boolean;
  color?: string; // tailwind class for text color
};

export default function OverlayGlitch({
  text,
  show = false,
  color = "text-white",
}: Props) {
  const glitchVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: [0, 1, 0.7, 1],
      scale: [0.95, 1.05, 1],
      transition: {
        duration: 1.2,
        times: [0, 0.2, 0.5, 1],
        repeat: 1,
      },
    },
    exit: { opacity: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate={show ? "visible" : "hidden"}
      exit="exit"
      variants={glitchVariants}
      className={`pointer-events-none absolute top-1/3 w-full text-center 
        ${color} text-4xl md:text-6xl font-extrabold tracking-widest 
        drop-shadow-lg mix-blend-screen`}
    >
      {text}
    </motion.div>
  );
}
