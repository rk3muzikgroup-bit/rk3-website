"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePlaySound } from "@/hooks/usePlaySound";
import { useNowPlaying } from "@/context/NowPlayingContext";
import { useAmbient } from "@/hooks/useAmbient";
import CosmicBackground from "@/components/CosmicBackground";

export default function HealingWorldPage() {
  const router = useRouter();
  const playSound = usePlaySound();
  const { setTrack } = useNowPlaying();

  // Gentle ambient hum on entry
  useAmbient("vault/door_hum", { loop: true, volume: 0.2 });

  useEffect(() => {
    setTrack("RKS3 Healing World — Frequencies of Peace");
    playSound("vault/unlock");
  }, [setTrack, playSound]);

  return (
    <main className="relative h-screen w-screen overflow-hidden">
      {/* Cosmic Starfield */}
      <CosmicBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/50 to-emerald-900/40" />

      {/* Title */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-center z-10">
        <h1 className="text-4xl font-bold text-emerald-300 drop-shadow-lg tracking-widest">
          HEALING WORLD
        </h1>
        <p className="text-md text-indigo-200 mt-1">
          Frequencies • Breathwork • Meditations
        </p>
      </div>

      {/* Portal Grid */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="grid grid-cols-3 gap-12">
          <button
            onClick={() => {
              playSound("ride/transition_whoosh");
              router.push("/world/healing/frequencies");
            }}
            className="px-8 py-6 rounded-xl bg-emerald-600/80 hover:bg-emerald-500 text-white font-bold shadow-lg transition transform hover:scale-110"
          >
            🎶 Frequencies
          </button>
          <button
            onClick={() => {
              playSound("ride/transition_whoosh");
              router.push("/world/healing/breathwork");
            }}
            className="px-8 py-6 rounded-xl bg-indigo-600/80 hover:bg-indigo-500 text-white font-bold shadow-lg transition transform hover:scale-110"
          >
            🌬 Breathwork
          </button>
          <button
            onClick={() => {
              playSound("ride/transition_whoosh");
              router.push("/world/healing/meditations");
            }}
            className="px-8 py-6 rounded-xl bg-yellow-600/80 hover:bg-yellow-500 text-white font-bold shadow-lg transition transform hover:scale-110"
          >
            🧘 Meditations
          </button>
          <button
            onClick={() => {
              playSound("vault/door_close");
              router.push("/world");
            }}
            className="px-8 py-6 rounded-xl bg-red-600/80 hover:bg-red-500 text-white font-bold shadow-lg transition transform hover:scale-110 col-span-3"
          >
            ⬅ Back to World
          </button>
        </div>
      </div>

      {/* Now Playing HUD */}
      <div className="absolute bottom-4 right-6 z-10 bg-black/70 px-4 py-2 rounded-xl shadow-lg">
        <span className="font-mono text-sm text-emerald-200">
          🎵 Now Playing: <strong>RKS3 Healing World — Frequencies of Peace</strong>
        </span>
      </div>
    </main>
  );
}
