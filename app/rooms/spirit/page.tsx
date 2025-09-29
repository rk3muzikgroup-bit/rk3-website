"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePlaySound } from "@/hooks/usePlaySound";
import { motion } from "framer-motion";

export default function SpiritPage() {
  const router = useRouter();
  const playSound = usePlaySound();

  useEffect(() => {
    const stop = playSound("/sounds/rooms/spirit.mp3", { loop: true, id: "spiritLoop" });
    return () => stop && stop();
  }, [playSound]);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background Video */}
      <video
        src="/videos/ride/Spirit_Ride.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* White / Silver Aura Overlay */}
      <motion.div
        animate={{ opacity: [0.08, 0.2, 0.08] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-white/20 mix-blend-overlay"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6">
        <h1 className="text-5xl font-bold text-white drop-shadow-lg">
          ✨ Spirit Room
        </h1>
        <p className="text-gray-300 mt-4">Light as Air, Halo Glow</p>

        {/* Return Button */}
        <button
          onClick={() => router.push("/vault")}
          className="mt-10 px-6 py-3 rounded-xl bg-black/70 text-white border border-gray-300 hover:bg-black/90 transition"
        >
          ⬅ Return to Vault
        </button>
      </div>
    </div>
  );
}
