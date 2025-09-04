"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAmbient } from "@/components/AmbientProvider";
import Starfield from "@/components/Experience/Starfield";
import CosmicBackground from "@/components/CosmicBackground";

export default function VaultEntrance({ onEnter }: { onEnter: () => void }) {
  const { playAmbience, fadeOutAll } = useAmbient();
  const [doorOpen, setDoorOpen] = useState(false);

  useEffect(() => {
    // Play vault hum ambience
    playAmbience("/sounds/vault-hum.mp3", 0.5);

    // Auto open door after 2 seconds
    const timer = setTimeout(() => setDoorOpen(true), 2000);
    return () => clearTimeout(timer);
  }, [playAmbience]);

  const handleEnter = () => {
    fadeOutAll(); // fade vault hum before transition
    onEnter(); // trigger next scene (Street/Soul/Spirit paths)
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden">
      <CosmicBackground videoSrc="/videos/vault-core.mp4" overlayColor="bg-black/70" />
      <Starfield />

      {/* Vault Door Panels */}
      <motion.div
        initial={{ x: "-50%" }}
        animate={{ x: doorOpen ? "-120%" : "-50%" }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="absolute left-0 top-0 w-1/2 h-full bg-gray-800 shadow-2xl z-20"
      />
      <motion.div
        initial={{ x: "50%" }}
        animate={{ x: doorOpen ? "120%" : "50%" }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="absolute right-0 top-0 w-1/2 h-full bg-gray-800 shadow-2xl z-20"
      />

      {/* Light Rays when door opens */}
      {doorOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-white/10 to-transparent blur-2xl z-10"
        />
      )}

      {/* Center Content */}
      {doorOpen && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1.5, ease: "easeOut" }}
          className="z-30 text-center"
        >
          <h1 className="text-5xl font-bold mb-6">🔒 RK3 Vault</h1>
          <p className="mb-8 text-lg opacity-80">Choose your path and unlock the journey.</p>
          <button
            onClick={handleEnter}
            className="px-8 py-4 bg-purple-700 hover:bg-purple-800 rounded-2xl text-xl font-bold shadow-lg"
          >
            🚪 Enter the Vault
          </button>
        </motion.div>
      )}
    </div>
  );
}
