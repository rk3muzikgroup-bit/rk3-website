"use client";
import { motion } from "framer-motion";

export default function WarpParticles({ color }: { color: string }) {
  const particles = Array.from({ length: 20 });

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999]">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full`}
          style={{
            backgroundColor: color,
            width: Math.random() * 6 + 4,
            height: Math.random() * 6 + 4,
            top: "50%",
            left: "50%",
          }}
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{
            x: (Math.random() - 0.5) * 400,
            y: (Math.random() - 0.5) * 400,
            opacity: 0,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}
