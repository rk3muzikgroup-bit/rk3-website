"use client";
import { motion } from "framer-motion";

export default function VaultCore() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Glowing Orb */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          relative h-40 w-40 rounded-full
          bg-gradient-to-r from-indigo-500 via-emerald-400 to-blue-500
          shadow-[0_0_60px_20px_rgba(0,255,180,0.5)]
        "
      >
        {/* Inner Core */}
        <motion.div
          animate={{
            opacity: [0.6, 1, 0.6],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-4 rounded-full bg-black/70 blur-md"
        ></motion.div>
      </motion.div>

      {/* Subtle Energy Rings */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute h-56 w-56 rounded-full border border-emerald-400/40"
      ></motion.div>

      <motion.div
        animate={{
          scale: [1.2, 1.4, 1.2],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute h-72 w-72 rounded-full border border-indigo-400/30"
      ></motion.div>

      {/* Engraved Inscription */}
      <div className="absolute -bottom-20 text-center">
        <h2
          className="text-xl font-bold tracking-widest text-gray-300 
                     [text-shadow:1px_1px_2px_rgba(0,0,0,0.8)] 
                     drop-shadow-[0_0_4px_rgba(255,255,255,0.15)]"
        >
          THIS VAULT IS FOR FEEDING
        </h2>
        <p
          className="text-sm text-gray-400 mt-2 
                     [text-shadow:1px_1px_2px_rgba(0,0,0,0.6)] 
                     drop-shadow-[0_0_3px_rgba(255,255,255,0.1)]"
        >
          Street • Soul • Spirit
        </p>
      </div>
    </div>
  );
}
