"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePlaySound } from "@/hooks/usePlaySound";
import { motion } from "framer-motion";

export default function LegacyPage() {
  const router = useRouter();
  const playSound = usePlaySound();

  useEffect(() => {
    const stop = playSound("/sounds/rooms/legacy.mp3", { loop: true, id: "legacyLoop" });
    return () => stop && stop();
  }, [playSound]);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background Video Placeholder */}
      <video
        src="/videos/rooms/legacy_bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Royal Blue Aura Overlay */}
      <motion.div
        animate={{ opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-blue-500/25 mix-blend-overlay"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6">
        <h1 className="text-5xl font-bold text-blue-400 drop-shadow-lg">
          📜 Legacy Room
        </h1>
        <p className="text-gray-300 mt-4">Timeless Royal Flow</p>

        {/* Return Button */}
        <button
          onClick={() => router.push("/vault")}
          className="mt-10 px-6 py-3 rounded-xl bg-black/70 text-white border border-blue-400 hover:bg-black/90 transition"
        >
          ⬅ Return to Vault
        </button>
      </div>
    </div>
  );
}
