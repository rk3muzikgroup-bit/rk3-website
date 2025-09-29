"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePlaySound } from "@/hooks/usePlaySound";
import { useNowPlaying } from "@/context/NowPlayingContext";
import CosmicBackground from "@/components/CosmicBackground";

export default function VaultJourneysPage() {
  const router = useRouter();
  const playSound = usePlaySound();
  const { setTrack } = useNowPlaying();

  useEffect(() => {
    setTrack("RKS3 Vault Journeys — Cinematic Sequences");
    playSound("vault/unlock");
  }, [setTrack, playSound]);

  // Placeholder journeys (swap with your 31-sequence dump later)
  const journeys = [
    { title: "Vault Journey I — Street Flow", file: "/dump/vault/street_flow.mp3" },
    { title: "Vault Journey II — Soul Healing", file: "/dump/vault/soul_healing.mp3" },
    { title: "Vault Journey III — Spirit Ascension", file: "/dump/vault/spirit_ascension.mp3" },
  ];

  return (
    <main className="relative h-screen w-screen overflow-hidden p-8">
      {/* Background */}
      <CosmicBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-purple-900/40" />

      {/* Title */}
      <div className="relative z-10 text-center mb-8">
        <h1 className="text-4xl font-bold text-indigo-300 drop-shadow-xl tracking-widest">
          VAULT JOURNEYS
        </h1>
        <p className="text-md text-yellow-200 mt-1">
          Cinematic • Guided • 31-Track Sequences
        </p>
      </div>

      {/* Journey Grid */}
      <div className="relative z-10 grid grid-cols-3 gap-8">
        {journeys.map((journey, i) => (
          <div
            key={i}
            className="bg-black/70 p-6 rounded-xl shadow-xl hover:scale-105 transition transform"
          >
            <h2 className="text-lg font-bold text-indigo-200 mb-3">{journey.title}</h2>
            <audio
              controls
              src={journey.file}
              className="w-full"
              onPlay={() => setTrack(journey.title)}
            />
          </div>
        ))}
      </div>

      {/* Back Button */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <button
          onClick={() => {
            playSound("vault/door_close");
            router.push("/world/music");
          }}
          className="px-8 py-4 rounded-xl bg-red-600/80 hover:bg-red-500 text-white font-bold shadow-lg transition transform hover:scale-110"
        >
          ⬅ Back to Music World
        </button>
      </div>

      {/* Now Playing HUD */}
      <div className="absolute bottom-4 right-6 z-10 bg-black/70 px-4 py-2 rounded-xl shadow-lg">
        <span className="font-mono text-sm text-indigo-200">
          🎵 Now Playing: <strong>RKS3 Vault Journeys — Cinematic Sequences</strong>
        </span>
      </div>
    </main>
  );
}
