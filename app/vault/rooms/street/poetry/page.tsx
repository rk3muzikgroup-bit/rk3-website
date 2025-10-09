"use client";

import CosmicBackground from "@/components/CosmicBackground";
import { useRouter } from "next/navigation";
import { usePlaySound } from "@/hooks/usePlaySound";
import { motion } from "framer-motion";

const poems = [
  {
    title: "After the Breakups",
    snippet: "Late night hang outs / early morning wakes / pull that thing out...",
    file: "/sounds/street/after_breakups.mp3",
  },
  {
    title: "I Work",
    snippet: "I work, I work it — grind, discipline, healing from the inside...",
    file: "/sounds/street/i_work.mp3",
  },
];

export default function StreetPoetryPage() {
  const router = useRouter();
  const playSound = usePlaySound();

  return (
    <div className="relative h-screen w-screen overflow-hidden text-white">
      <CosmicBackground />

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-8">
        <h1 className="text-5xl font-bold mb-6">📜 Street Poetry</h1>
        <p className="max-w-2xl text-center opacity-80 mb-10">
          From the block to the cosmos — raw verses, truth and rhythm.
        </p>

        <div className="space-y-6">
          {poems.map((poem, i) => (
            <motion.button
              key={poem.title}
              onClick={() => playSound(poem.file)}
              className="px-8 py-4 bg-red-600 rounded-xl text-xl shadow-lg hover:scale-105 transition-transform"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.3 }}
            >
              {poem.title} — <span className="opacity-70">{poem.snippet}</span>
            </motion.button>
          ))}
        </div>

        <button
          onClick={() => router.push("/street")}
          className="mt-12 px-8 py-4 bg-gray-800 rounded-xl text-lg hover:scale-105 transition-transform"
        >
          ⬅ Back to Street
        </button>
      </div>
    </div>
  );
}
