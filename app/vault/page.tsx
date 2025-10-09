"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import HUDVolume from "@/components/HUDVolume";

export default function VaultHUD() {
  const router = useRouter();

  const lockAndExit = async () => {
    try {
      await fetch("/api/vault/lock", { method: "POST" });
      router.replace("/vault-entry");
    } catch {}
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center">
      <HUDVolume />

      {/* ✨ Background cinematic glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-indigo-900/40 via-emerald-800/30 to-purple-900/40 blur-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />

      {/* 🌌 Cosmic backdrop placeholder */}
      <video
        src="/videos/vault/cosmic_loop.mp4"
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover opacity-40"
      />

      {/* 🔥 Vault HUD Overlay */}
      <motion.div
        className="relative z-20 flex flex-col items-center justify-center space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <h1 className="text-5xl font-extrabold text-yellow-300 drop-shadow-xl tracking-wide">
          ✨ Welcome to the RK3 Vault ✨
        </h1>
        <p className="text-white/80 text-lg">Choose your path:</p>

        <div className="flex space-x-8">
          <button
            onClick={() => router.push("/vault/rooms/street")}
            className="px-8 py-4 rounded-2xl bg-indigo-600 text-white font-bold text-xl shadow-lg hover:bg-indigo-700 hover:scale-105 transition"
          >
            Street
          </button>
          <button
            onClick={() => router.push("/vault/rooms/soul")}
            className="px-8 py-4 rounded-2xl bg-emerald-600 text-white font-bold text-xl shadow-lg hover:bg-emerald-700 hover:scale-105 transition"
          >
            Soul
          </button>
          <button
            onClick={() => router.push("/vault/rooms/spirit")}
            className="px-8 py-4 rounded-2xl bg-purple-600 text-white font-bold text-xl shadow-lg hover:bg-purple-700 hover:scale-105 transition"
          >
            Spirit
          </button>
        </div>
      </motion.div>

      {/* (Optional) tiny test control – remove for production */}
      <button
        onClick={lockAndExit}
        className="absolute bottom-4 right-4 text-xs px-3 py-2 rounded-md bg-white/10 text-white hover:bg-white/20"
        title="Lock vault & return to entry"
      >
        Lock Vault
      </button>
    </div>
  );
}
