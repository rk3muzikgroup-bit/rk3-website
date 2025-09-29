"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePlaySound } from "@/hooks/usePlaySound";
import { useNowPlaying } from "@/context/NowPlayingContext";
import { useAmbient } from "@/hooks/useAmbient";
import CosmicBackground from "@/components/CosmicBackground";

export default function YinYangPage() {
  const router = useRouter();
  const playSound = usePlaySound();
  const { setTrack } = useNowPlaying();

  // Dual-tone hum on entry
  useAmbient("vault/door_hum", { loop: true, volume: 0.25 });

  useEffect(() => {
    setTrack("Yin & Yang — Balance of Forces");
    playSound("vault/unlock");
  }, [setTrack, playSound]);

  return (
    <main className="relative h-screen w-screen overflow-hidden">
      {/* Cosmic backdrop */}
      <CosmicBackground />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-white/60" />

      {/* Title */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-center z-10">
        <h1 className="text-5xl font-bold text-indigo-200 drop-shadow-xl tracking-widest">
          ☯ YIN & YANG ☯
        </h1>
        <p className="text-md text-yellow-300 mt-1">Harmony • Duality • Creation</p>
      </div>

      {/* Split Grid */}
      <div className="absolute inset-0 flex items-center justify-center z-10 gap-16">
        {/* Yin */}
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={() => {
              playSound("ride/transition_whoosh");
              router.push("/world/yinyang/yin");
            }}
            className="px-10 py-6 rounded-full bg-indigo-700/80 hover:bg-indigo-600 text-white font-bold shadow-xl transition transform hover:scale-110"
          >
            🌙 Yin Flow
          </button>
          <p className="text-indigo-200 text-sm">Calm • Soul • Introspection</p>
        </div>

        {/* Unified */}
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={() => {
              playSound("ride/transition_whoosh");
              router.push("/world/yinyang/unified");
            }}
            className="px-10 py-6 rounded-full bg-emerald-600/80 hover:bg-emerald-500 text-white font-bold shadow-xl transition transform hover:scale-110"
          >
            ☯ Unified Flow
          </button>
          <p className="text-emerald-200 text-sm">Balance • Harmony • One Flow</p>
        </div>

        {/* Yang */}
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={() => {
              playSound("ride/transition_whoosh");
              router.push("/world/yinyang/yang");
            }}
            className="px-10 py-6 rounded-full bg-yellow-600/80 hover:bg-yellow-500 text-white font-bold shadow-xl transition transform hover:scale-110"
          >
            🔥 Yang Flow
          </button>
          <p className="text-yellow-200 text-sm">Energy • Hustle • Expansion</p>
        </div>
      </div>

      {/* Back to World */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <button
          onClick={() => {
            playSound("vault/door_close");
            router.push("/world");
          }}
          className="px-8 py-4 rounded-xl bg-red-600/80 hover:bg-red-500 text-white font-bold shadow-lg transition transform hover:scale-110"
        >
          ⬅ Back to World
        </button>
      </div>

      {/* Now Playing HUD */}
      <div className="absolute bottom-4 right-6 z-10 bg-black/70 px-4 py-2 rounded-xl shadow-lg">
        <span className="font-mono text-sm text-yellow-200">
          🎵 Now Playing: <strong>Yin & Yang — Balance of Forces</strong>
        </span>
      </div>
    </main>
  );
}
