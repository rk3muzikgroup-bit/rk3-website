"use client";

import CosmicBackground from "@/components/CosmicBackground";
import { useRouter } from "next/navigation";
import { usePlaySound } from "@/hooks/usePlaySound";
import { motion } from "framer-motion";

export default function MuseumRoomPage() {
  const router = useRouter();
  const playSound = usePlaySound();

  const exitVault = () => {
    playSound("/sounds/vault/closing_long.mp3", { volume: 0.9 });
    router.push("/vault/rooms");
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden text-white">
      <CosmicBackground />

      {/* Hollywood intro overlay */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 2.2, delay: 1 }}
        className="absolute inset-0 z-50 flex items-center justify-center bg-black"
      >
        <h1 className="text-4xl font-bold text-yellow-400 tracking-[0.25em] drop-shadow-[0_0_30px_rgba(234,179,8,1)]">
          🏺 MUSEUM ACCESSING
        </h1>
      </motion.div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, delay: 2.3 }}
        className="absolute inset-0 flex flex-col items-center justify-center z-10 p-8 space-y-10"
      >
        <h1 className="text-5xl font-extrabold mb-6 drop-shadow-[0_0_40px_rgba(234,179,8,1)]">
          🏺 Vault Museum
        </h1>
        <p className="text-lg max-w-2xl text-center opacity-80">
          Artifacts, relics, and cosmic exhibits.  
          A place where history and frequency converge.
        </p>

        {/* Exit */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={exitVault}
          className="mt-12 px-10 py-4 bg-gray-700 rounded-2xl text-xl font-semibold shadow-xl hover:shadow-[0_0_25px_rgba(156,163,175,0.9)] transition"
        >
          ⬅ Return to Vault
        </motion.button>
      </motion.div>
    </div>
  );
}
