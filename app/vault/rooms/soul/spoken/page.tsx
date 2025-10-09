"use client";

import CosmicBackground from "@/components/CosmicBackground";
import { useRouter } from "next/navigation";
import { usePlaySound } from "@/hooks/usePlaySound";
import { motion } from "framer-motion";

const pieces = [
  { title: "Healing Ain’t", file: "/sounds/soul/healing_aint.mp3" },
  { title: "World is Changing", file: "/sounds/soul/world_is_changing.mp3" },
];

export default function SoulSpokenPage() {
  const router = useRouter();
  const playSound = usePlaySound();

  return (
    <div className="relative h-screen w-screen overflow-hidden text-white">
      <CosmicBackground />

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-8">
        <h1 className="text-5xl font-bold mb-10">📖 Soul Spoken Word</h1>

        <div className="space-y-6">
          {pieces.map((p, i) => (
            <motion.button
              key={p.title}
              onClick={() => playSound(p.file)}
              className="px-8 py-4 bg-indigo-600 rounded-xl text-2xl shadow-lg hover:scale-105 transition-transform"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.3 }}
            >
              {p.title}
            </motion.button>
          ))}
        </div>

        <button
          onClick={() => router.push("/soul")}
          className="mt-12 px-8 py-4 bg-gray-800 rounded-xl text-lg hover:scale-105 transition-transform"
        >
          ⬅ Back to Soul
        </button>
      </div>
    </div>
  );
}
