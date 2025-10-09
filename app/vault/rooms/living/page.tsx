"use client";

import CosmicBackground from "@/components/CosmicBackground";
import { useRouter } from "next/navigation";
import { usePlaySound } from "@/hooks/usePlaySound";
import { motion } from "framer-motion";

const portals = [
  { name: "Street", path: "/rooms/street", color: "emerald-500" },
  { name: "Soul", path: "/rooms/soul", color: "indigo-500" },
  { name: "Spirit", path: "/rooms/spirit", color: "yellow-500" },
  { name: "Healing Frequencies", path: "/vault/rooms/healing", color: "cyan-500" },
  { name: "Artifacts Wing", path: "/vault/rooms/artifacts", color: "purple-500" },
  { name: "Creator’s Chamber", path: "/vault/rooms/creators", color: "pink-500" },
];

export default function LivingRoomPage() {
  const router = useRouter();
  const playSound = usePlaySound();

  const goTo = (path: string) => {
    playSound("/sounds/vault/unlock.mp3");
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
        <h1 className="text-5xl font-bold mb-12">🛋️ Living Room Hub</h1>
        <p className="text-lg mb-12 max-w-2xl text-center opacity-80">
          The central nucleus of the Vault. All paths connect here.
        </p>
        <div className="grid grid-cols-2 gap-8">
          {portals.map((portal, i) => (
            <motion.button
              key={portal.name}
              onClick={() => goTo(portal.path)}
              className={`px-8 py-6 rounded-2xl text-2xl shadow-xl bg-${portal.color} hover:scale-105 transition-transform`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.3 }}
            >
              {portal.name}
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
