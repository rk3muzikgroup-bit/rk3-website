"use client";

import CosmicBackground from "@/components/CosmicBackground";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const tools = [
  { name: "Beat Lab", path: "/vault/rooms/creators/beatlab", color: "emerald-500" },
  { name: "Lyric Forge", path: "/vault/rooms/creators/lyricforge", color: "indigo-500" },
  { name: "Visual Studio", path: "/vault/rooms/creators/visualstudio", color: "yellow-500" },
  { name: "Publishing Desk", path: "/vault/rooms/creators/publishing", color: "purple-500" },
];

export default function CreatorsChamberPage() {
  const router = useRouter();

  const enterTool = (path: string) => {
    router.push(path);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden text-white">
      <CosmicBackground />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 flex flex-col items-center justify-center z-10 p-8"
      >
        <h1 className="text-5xl font-bold mb-8">🎨 Creator’s Chamber</h1>
        <p className="max-w-2xl text-center opacity-80 mb-12">
          The sacred workspace of RK3 — build beats, write words, design visuals, and prepare for publishing.
        </p>

        <div className="grid grid-cols-2 gap-8">
          {tools.map((tool, i) => (
            <motion.button
              key={tool.name}
              onClick={() => enterTool(tool.path)}
              className={`px-8 py-6 rounded-2xl text-2xl shadow-xl bg-${tool.color} hover:scale-105 transition-transform`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.4 }}
            >
              {tool.name}
            </motion.button>
          ))}
        </div>

        <button
          onClick={() => router.push("/vault/rooms")}
          className="mt-12 px-8 py-4 bg-gray-800 rounded-xl text-lg"
        >
          ⬅ Back to Vault
        </button>
      </motion.div>
    </div>
  );
}
