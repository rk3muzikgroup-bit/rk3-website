"use client";

import CosmicBackground from "@/components/CosmicBackground";
import { useRouter } from "next/navigation";
import { usePlaySound } from "@/hooks/usePlaySound";
import { motion } from "framer-motion";

export default function SpiritPage() {
  const router = useRouter();
  const playSound = usePlaySound();

  return (
    <div className="relative h-screen w-screen overflow-hidden text-white">
      <CosmicBackground />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 flex flex-col items-center justify-center z-10 p-8"
      >
        <h1 className="text-6xl font-extrabold mb-6 text-yellow-400 drop-shadow-lg">
          🌌 Spirit World
        </h1>
        <p className="text-lg max-w-2xl text-center opacity-80 mb-12">
          Sacred, infinite, eternal — where cosmic law speaks.
        </p>
        <div className="grid grid-cols-2 gap-8">
          <motion.button onClick={() => router.push("/rooms/spirit/meditations")} className="px-8 py-6 rounded-xl text-2xl bg-yellow-500 shadow-xl">🕉️ Meditations</motion.button>
          <motion.button onClick={() => router.push("/rooms/spirit/teachings")} className="px-8 py-6 rounded-xl text-2xl bg-orange-500 shadow-xl">📜 Teachings</motion.button>
          <motion.button onClick={() => router.push("/rooms/spirit/frequencies")} className="px-8 py-6 rounded-xl text-2xl bg-green-500 shadow-xl">🔮 Frequencies</motion.button>
          <motion.button onClick={() => router.push("/rooms/spirit/visuals")} className="px-8 py-6 rounded-xl text-2xl bg-red-500 shadow-xl">🌠 Visuals</motion.button>
        </div>
        <button onClick={() => router.push("/world")} className="mt-12 px-8 py-4 bg-gray-800 rounded-xl">⬅ Back to World</button>
      </motion.div>
    </div>
  );
}
