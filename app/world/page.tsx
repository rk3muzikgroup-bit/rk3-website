"use client";

import CosmicBackground from "@/components/CosmicBackground";
import { useRouter } from "next/navigation";
import { usePlaySound } from "@/hooks/usePlaySound";
import { motion } from "framer-motion";

export default function WorldPage() {
  const router = useRouter();
  const playSound = usePlaySound();

  const goTo = (path: string, sound: string) => {
    playSound(sound, { volume: 0.8 });
    router.push(path);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden text-white">
      <CosmicBackground />

      {/* 🎬 Intro cinematic overlay */}
      <motion.div
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 2, delay: 1 }}
        className="absolute inset-0 z-50 flex items-center justify-center bg-black"
      >
        <h1 className="text-4xl font-bold text-emerald-400 tracking-widest animate-pulse">
          🌌 INITIATING WORLD SEQUENCE
        </h1>
      </motion.div>

      {/* 🌍 Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, delay: 1.5 }}
        className="absolute inset-0 flex flex-col items-center justify-center z-10 space-y-12"
      >
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="text-6xl font-extrabold drop-shadow-[0_0_30px_rgba(0,255,200,0.8)]"
        >
          🌍 Welcome to the World
        </motion.h1>

        {/* 🚪 Portals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="flex space-x-12"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              goTo("/rooms/street", "/sounds/ride/transition_whoosh.mp3")
            }
            className="px-10 py-5 bg-emerald-600 rounded-2xl text-2xl font-semibold shadow-[0_0_20px_rgba(16,185,129,0.7)] hover:shadow-[0_0_40px_rgba(16,185,129,1)] transition"
          >
            🏙 Street Portal
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              goTo("/rooms/soul", "/sounds/ride/transition_whoosh.mp3")
            }
            className="px-10 py-5 bg-indigo-600 rounded-2xl text-2xl font-semibold shadow-[0_0_20px_rgba(99,102,241,0.7)] hover:shadow-[0_0_40px_rgba(99,102,241,1)] transition"
          >
            💚 Soul Portal
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              goTo("/rooms/spirit", "/sounds/ride/transition_whoosh.mp3")
            }
            className="px-10 py-5 bg-yellow-500 text-black rounded-2xl text-2xl font-semibold shadow-[0_0_20px_rgba(234,179,8,0.7)] hover:shadow-[0_0_40px_rgba(234,179,8,1)] transition"
          >
            🌌 Spirit Portal
          </motion.button>
        </motion.div>

        {/* 🗝️ Vault Entry */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3 }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => goTo("/vault/rooms", "/sounds/vault/unlock.mp3")}
          className="mt-16 px-12 py-6 bg-purple-700 rounded-3xl text-3xl font-bold shadow-[0_0_30px_rgba(168,85,247,0.8)] hover:shadow-[0_0_60px_rgba(168,85,247,1)] transition"
        >
          🗝️ Enter Vault Rooms
        </motion.button>
      </motion.div>
    </div>
  );
}
