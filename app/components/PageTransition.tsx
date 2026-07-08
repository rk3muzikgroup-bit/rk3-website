"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        prefersReducedMotion
          ? { opacity: 1 }
          : { opacity: 0, y: 6 }
      }
      animate={{ opacity: 1, y: 0 }}
      exit={
        prefersReducedMotion
          ? { opacity: 1 }
          : { opacity: 0, y: -6 }
      }
      transition={{
        duration: prefersReducedMotion ? 0 : 0.4,
        ease: "easeOut",
      }}
      className="h-full will-change-transform"
    >
      {children}
    </motion.div>
  );
}
