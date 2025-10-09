"use client";

import { motion } from "framer-motion";
import { useAmbient } from "@/hooks/useAmbient";
import { useWarp } from "@/hooks/useWarp";

export default function LivingRoom() {
  // Fireplace hum
  useAmbient("/sounds/room/fireplace.mp3", 0.2);

  // Warp system
  const { warpTo, overlay } = useWarp("livingroom");

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen bg-neutral-900 text-white overflow-hidden">
      {/* Background aura */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/backgrounds/living_room.jpg)" }}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 1.5 }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/90" />

      {/* Halo effect */}
      <motion.div
        className="absolute flex justify-center items-center"
        style={{ top: "40%" }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [0.8, 1.1, 0.9, 1], opacity: [0.2, 0.6, 0.4, 0.6] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <div className="w-96 h-96 rounded-full border-4 border-white/60 blur-2xl" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: [0, 1, 1, 0.8, 1], y: 0 }}
          transition={{ duration: 2 }}
          className="text-5xl font-bold mb-4 text-white"
          style={{
            textShadow:
              "0 0 35px rgba(255,255,255,1), 0 0 70px rgba(255,255,255,0.8)",
          }}
        >
          🏠 Living Room
        </motion.h1>
        <p className="opacity-80 max-w-xl mx-auto text-lg mb-10">
          This is the center hub where all portals connect. Relax, explore, or
          prepare for the next journey.
        </p>

        {/* Return Button */}
        <button
          onClick={() => warpTo("/vault")}
          className="px-6 py-3 rounded-md bg-yellow-500/70 hover:bg-yellow-400 
                     border border-yellow-300/40 text-sm
                     shadow-[0_0_15px_rgba(255,221,0,0.8)] backdrop-blur-md"
        >
          Return to Vault
        </button>
      </div>

      {overlay}
    </main>
  );
}
