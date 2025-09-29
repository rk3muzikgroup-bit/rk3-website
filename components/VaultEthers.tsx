"use client";
import { motion } from "framer-motion";
import AnimatedSigils from "@/components/AnimatedSigils"
export default function VaultEthers() {
  return (

<div className="absolute inset-0 overflow-hidden">
      {/* Gradient Veil 1 */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        className="
          absolute inset-0
          bg-gradient-to-r from-indigo-700/30 via-emerald-500/20 to-yellow-400/20
          blur-3xl
          mix-blend-overlay
        "
      />

      {/* Gradient Veil 2 */}
      <motion.div
        animate={{ rotate: [360, 0] }}
        transition={{ duration: 160, repeat: Infinity, ease: "linear" }}
        className="
          absolute inset-0
          bg-gradient-to-t from-blue-600/20 via-purple-500/20 to-emerald-400/20
          blur-2xl
          mix-blend-overlay
        "
      />

      {/* Particle Wisps */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            x: [Math.random() * 200 - 100, Math.random() * 200 - 100],
            y: [Math.random() * 200 - 100, Math.random() * 200 - 100],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 40 + Math.random() * 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-1 h-1 rounded-full bg-white/50 blur-sm"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Distortion Ripples */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            scale: [1, 3, 1],
            opacity: [0.4, 0, 0.4],
          }}
          transition={{
            duration: 12 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute left-1/2 top-1/2
            h-64 w-64
            -translate-x-1/2 -translate-y-1/2
            rounded-full
            border border-white/10
            blur-md
          "
        />
      ))}

      {/* Ghosted Value Flash */}
      <motion.div
        animate={{ opacity: [0, 0.6, 0] }}
        transition={{ duration: 6, repeat: Infinity, repeatDelay: 20 }}
        className="
          absolute inset-0 flex items-center justify-center
          text-6xl font-bold tracking-widest
          text-transparent bg-clip-text
          bg-gradient-to-r from-indigo-400 via-emerald-300 to-yellow-400
        "
      >
        350,000,000.00
      </motion.div>
    </div>
  );
}
