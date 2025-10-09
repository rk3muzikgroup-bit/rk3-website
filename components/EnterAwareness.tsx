"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function EnterAwareness({ trigger }: { trigger: boolean }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (trigger) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 1 }}
      className="absolute bottom-12 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl 
                 bg-black/60 border border-yellow-400/70 text-yellow-200 shadow-xl 
                 font-mono text-sm backdrop-blur-md z-50 overflow-hidden"
    >
      {/* Stardust sparkles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-yellow-300 rounded-full shadow"
          initial={{
            x: Math.random() * 220,
            y: Math.random() * 40,
            opacity: 0,
            scale: 0,
          }}
          animate={{
            x: Math.random() * 220,
            y: Math.random() * 40,
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}

      🌠 When you see a shooting star —{" "}
      <span className="italic text-yellow-300">make a wish 💕</span>
    </motion.div>
  );
}
