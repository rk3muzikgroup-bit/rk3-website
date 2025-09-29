"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useVideoSrc } from "@/hooks/useVideoSrc";
import { usePlaySound } from "@/hooks/usePlaySound";
import { useNowPlaying } from "@/context/NowPlayingContext";
import { useAmbient } from "@/hooks/useAmbient";
import CosmicBackground from "@/components/CosmicBackground";

export default function MusicWorldPage() {
  const router = useRouter();
  const playSound = usePlaySound();
  const { setTrack } = useNowPlaying();
  const musicSrc = useVideoSrc("ride/Street_Ride"); // can swap to a MUSIC loop later
  const videoRef = useRef<HTMLVideoElement>(null);

  // Ambient entry vibe
  useAmbient("ride/transition_whoosh", { volume: 0.4 });

  useEffect(() => {
    setTrack("RKS3 MUSIC WORLD — Infinite Vibes");
    playSound("vault/unlock");
  }, [setTrack, playSound]);

  return (
    <main className="relative h-screen w-screen overflow-hidden">
      {/* Cosmic + Music Background */}
      <CosmicBackground />
      <video
        ref={videoRef}
        src={musicSrc}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-80"
      />

      {/* Overlay Tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-indigo-900/50" />

      {/* Title */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-center z-10">
        <h1 className="text-4xl font-bold text-yellow-300 drop-shadow-xl tracking-widest">
          MUSIC WORLD
        </h1>
        <p className="text-md text-emerald-300 mt-1">
          Beats • Tracks • Vault Journeys
        </p>
      </div>

      {/* Category Buttons */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="grid grid-cols-2 gap-12">
          <button
            onClick={() => {
              playSound("ride/transition_whoosh");
              router.push("/world/music/beats");
            }}
            className="px-8 py-6 rounded-xl bg-emerald-600/80 hover:bg-emerald-500 text-white font-bold shadow-lg transition transform hover:scale-110"
          >
            🎹 Beats
          </button>
          <button
            onClick={() => {
              playSound("ride/transition_whoosh");
              router.push("/world/music/tracks");
            }}
            className="px-8 py-6 rounded-xl bg-indigo-600/80 hover:bg-indigo-500 text-white font-bold shadow-lg transition transform hover:scale-110"
          >
            🎤 Tracks
          </button>
          <button
            onClick={() => {
              playSound("ride/transition_whoosh");
              router.push("/world/music/vault");
            }}
            className="px-8 py-6 rounded-xl bg-yellow-600/80 hover:bg-yellow-500 text-white font-bold shadow-lg transition transform hover:scale-110"
          >
            🌀 Vault Journeys
          </button>
          <button
            onClick={() => {
              playSound("vault/door_close");
              router.push("/world");
            }}
            className="px-8 py-6 rounded-xl bg-red-600/80 hover:bg-red-500 text-white font-bold shadow-lg transition transform hover:scale-110"
          >
            ⬅ Back to World
          </button>
        </div>
      </div>

      {/* Now Playing HUD */}
      <div className="absolute bottom-4 right-6 z-10 bg-black/70 px-4 py-2 rounded-xl shadow-lg">
        <span className="font-mono text-sm text-yellow-200">
          🎵 Now Playing: <strong>RKS3 MUSIC WORLD — Infinite Vibes</strong>
        </span>
      </div>
    </main>
  );
}
