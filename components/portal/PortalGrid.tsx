"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { usePlaySound } from "@/hooks/usePlaySound";

const portals = [
  { id: "street", label: "Street" },
  { id: "soul", label: "Soul" },
  { id: "spirit", label: "Spirit" },
  { id: "healing", label: "Healing Frequencies" },
  { id: "wisdom", label: "Ancient Wisdom" },
  { id: "music", label: "Music World" },
  { id: "journal", label: "Vault Journal" },
  { id: "confessions", label: "Confessions" },
  { id: "merch", label: "Merchandise" },
  { id: "games", label: "Chess & Games" },
  { id: "museum", label: "Vault Museum" },
  { id: "family", label: "RK3 Family" },
  { id: "secret", label: "Secret Portal" },
];

// Living Room nucleus
const livingRoom = { id: "living", label: "Living Room" };

export default function PortalGrid() {
  const router = useRouter();
  const playSound = usePlaySound();

  const handleClick = (id: string) => {
    playSound("vault/unlock"); // plays unlock.mp3
    router.push(`/vault/${id}`);
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Living Room nucleus */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleClick(livingRoom.id)}
        className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-green-600 text-white font-bold shadow-lg"
      >
        {livingRoom.label}
      </motion.button>

      {/* Grid of 13 portals */}
      <div className="grid grid-cols-3 gap-6">
        {portals.map((portal) => (
          <motion.button
            key={portal.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(portal.id)}
            className="p-4 rounded-2xl bg-black/60 text-white border border-indigo-400 shadow-md hover:bg-indigo-700 transition"
          >
            {portal.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
