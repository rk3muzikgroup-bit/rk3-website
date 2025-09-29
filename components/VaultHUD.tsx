"use client";
import { motion } from "framer-motion";

export default function VaultHUD() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
      {/* Outer rotating ring */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="
          h-96 w-96 rounded-full
          border border-gray-600/20
          flex items-center justify-center
        "
      >
        {/* Inner faint ring */}
        <div className="h-72 w-72 rounded-full border border-gray-500/10" />

        {/* HUD Glyphs */}
        <div className="absolute h-full w-full flex items-center justify-between px-4">
          <p className="text-xs tracking-widest text-gray-400">STREET</p>
          <p className="text-xs tracking-widest text-gray-400">SOUL</p>
          <p className="text-xs tracking-widest text-gray-400">SPIRIT</p>
        </div>
      </motion.div>

      {/* Pulsing crosshair overlay */}
      <motion.div
        animate={{ opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute h-64 w-64 border border-gray-500/10 rounded-full"
      />
    </div>
  );
}
