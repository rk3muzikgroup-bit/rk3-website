"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePlaySound } from "@/hooks/usePlaySound";
import { useRouter, useSearchParams } from "next/navigation";
import HUDVolume from "@/components/HUDVolume";

type Stage = "ride" | "code" | "denied" | "granted" | "door";

export default function VaultEntry() {
  const [stage, setStage] = useState<Stage>("ride");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const params = useSearchParams();
  const fromPath = params.get("from") || "/vault";

  // 🔊 Hollywood SFX
  const playUnlock = usePlaySound("/sounds/vault/unlock.mp3", 0.8);
  const playDenied = usePlaySound("/sounds/vault/denied_blast.mp3", 0.9);
  const playDoorHum = usePlaySound("/sounds/vault/door_hum.mp3", 0.25);

  const handleRideComplete = () => setStage("code");

  const handleCodeSubmit = async () => {
    const code = inputRef.current?.value?.trim() || "";
    try {
      const res = await fetch("/api/vault/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (!res.ok) {
        playDenied();
        setStage("denied");
        setTimeout(() => setStage("code"), 2500);
        return;
      }

      playUnlock();
      setStage("granted");
      setTimeout(() => setStage("door"), 1200);
      setTimeout(() => {
        playDoorHum();
        router.push(fromPath); // 🚀 go to HUD (or room they tried)
      }, 4200);
    } catch {
      playDenied();
      setStage("denied");
      setTimeout(() => setStage("code"), 2500);
    }
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      <HUDVolume />

      {/* 🚀 Ride */}
      <AnimatePresence>
        {stage === "ride" && (
          <motion.video
            key="ride"
            src="/videos/ride/Street_Ride.mp4"
            autoPlay
            muted={false}
            className="absolute w-full h-full object-cover"
            onEnded={handleRideComplete}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* 🔐 Codepad */}
      {stage === "code" && (
        <div className="z-20 flex flex-col items-center space-y-4">
          <p className="text-xl text-white font-bold">Enter Access Code</p>
          <input
            ref={inputRef}
            type="password"
            placeholder="••••"
            className="px-4 py-2 rounded-lg text-black"
            onKeyDown={(e) => e.key === "Enter" && handleCodeSubmit()}
          />
          <button
            onClick={handleCodeSubmit}
            className="px-6 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700"
          >
            Unlock
          </button>
        </div>
      )}

      {/* ❌ Denied */}
      {stage === "denied" && (
        <motion.div
          key="denied"
          className="absolute inset-0 flex items-center justify-center text-red-500 font-bold text-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          ACCESS DENIED
        </motion.div>
      )}

      {/* ✅ Door Sequence */}
      {stage === "door" && (
        <motion.div
          key="door"
          className="absolute inset-0 flex items-center justify-center bg-black overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* ✨ Rays / glow placeholders — swap with your cosmic overlays anytime */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-yellow-400/40 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          />
          <p className="text-emerald-400 text-2xl font-bold z-10">Vault Door Opening...</p>
        </motion.div>
      )}
    </div>
  );
}
