"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePlaySound } from "@/hooks/usePlaySound";
import { motion } from "framer-motion";

export default function MusicPage() {
  const router = useRouter();
  const playSound = usePlaySound();

  useEffect(() => {
    const stop = playSound("/sounds/rooms/music.mp3", { loop: true, id: "musicLoop" });
    return () => stop && stop();
  }, [playSound]);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background Video Placeholder */}
      <video
        src="/videos/rooms/music_bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Golden Aura Overlay */}
      <motion.div
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-yellow-400/25 mix-blend-overlay"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6">
        <h1 className="text-5xl font-bold text-yellow-400 drop-shadow-lg">
          🎶 Music Room
        </h1>
        <p className="text-gray-300 mt-4">Golden Vibrations Unlocked</p>

        {/* Return Button */}
        <button
          onClick={() => router.push("/vault")}
          className="mt-10 px-6 py-3 rounded-xl bg-black/70 text-white border border-yellow-400 hover:bg-black/90 transition"
        >
          ⬅ Return to Vault
        </button>
      </div>
    </div>
  );
}
