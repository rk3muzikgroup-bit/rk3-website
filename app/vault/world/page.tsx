"use client";

import CosmicBackground from "@/components/CosmicBackground";
import { useRouter } from "next/navigation";
import { usePlaySound } from "@/hooks/usePlaySound";
import { motion, AnimatePresence } from "framer-motion";
import { useProfile } from "@/context/ProfileContext";
import CockpitHUD from "@/components/cockpit/CockpitHUD";
import { useEffect, useState } from "react";

export default function WorldPage() {
  const router = useRouter();
  const playSound = usePlaySound();
  const profile = useProfile();
  const [overlayVisible, setOverlayVisible] = useState(true);

  const goTo = (path: string, sound: string) => {
    playSound(sound);
    router.push(path);
  };

  // ⏳ Auto-hide overlay after 7s w/ dissolve + chime
  useEffect(() => {
    const timer = setTimeout(() => {
      playSound("/sounds/vault/unlock_chime.mp3", { volume: 0.7 });
      setOverlayVisible(false);
    }, 7000);
    return () => clearTimeout(timer);
  }, [playSound]);

  return (
    <div className="relative h-screen w-screen overflow-hidden text-white">
      <CosmicBackground />

      {/* 🌍 Overlay intro w/ dissolve + chime */}
      <AnimatePresence>
        {overlayVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10 space-y-8"
          >
            <h1 className="text-5xl font-bold mb-10">🌍 Welcome to the World</h1>

            <div className="flex space-x-8">
              <button
                onClick={() =>
                  goTo("/rooms/street", "/sounds/ride/transition_whoosh.mp3")
                }
                className="px-8 py-4 bg-emerald-600 rounded-2xl text-xl shadow-lg hover:scale-105 transition-transform"
              >
                Street Portal
              </button>
              <button
                onClick={() =>
                  goTo("/rooms/soul", "/sounds/ride/transition_whoosh.mp3")
                }
                className="px-8 py-4 bg-indigo-600 rounded-2xl text-xl shadow-lg hover:scale-105 transition-transform"
              >
                Soul Portal
              </button>
              <button
                onClick={() =>
                  goTo("/rooms/spirit", "/sounds/ride/transition_whoosh.mp3")
                }
                className="px-8 py-4 bg-yellow-500 rounded-2xl text-xl shadow-lg hover:scale-105 transition-transform"
              >
                Spirit Portal
              </button>
            </div>

            <button
              onClick={() => goTo("/vault/rooms", "/sounds/vault/unlock.mp3")}
              className="mt-10 px-10 py-5 bg-purple-700 rounded-2xl text-2xl shadow-xl hover:scale-105 transition-transform"
            >
              🗝️ Enter Vault Rooms
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🛸 Cockpit HUD active in background */}
      <CockpitHUD key={profile.username} />

      {/* 👤 Profile overlay */}
      <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-emerald-500/40 z-20">
        <h2 className="text-xl font-bold text-emerald-300">@{profile.username}</h2>
        <p>🌌 Portal: {profile.portal}</p>
        <p>🛰️ Mileage: {profile.mileage.toLocaleString()}</p>
        <p>🎖️ Rank: {profile.rank}</p>
        <p>🎵 Now Playing: {profile.nowPlaying}</p>
      </div>
    </div>
  );
}
