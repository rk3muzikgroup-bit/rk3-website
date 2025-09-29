"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePlaySound } from "@/hooks/usePlaySound";
import { useNowPlaying } from "@/context/NowPlayingContext";
import CosmicBackground from "@/components/CosmicBackground";

export default function MeditationsPage() {
  const router = useRouter();
  const playSound = usePlaySound();
  const { setTrack } = useNowPlaying();

  useEffect(() => {
    setTrack("Healing Meditations — Guided Journeys");
    playSound("vault/unlock");
  }, [setTrack, playSound]);

  // Placeholder meditations (swap with your guided flows later)
  const meditations = [
    { title: "Morning Alignment", file: "/dump/meditations/morning_alignment.mp3" },
    { title: "Evening Release", file: "/dump/meditations/evening_release.mp3" },
    { title: "Inner Child Healing", file: "/dump/meditations/inner_child.mp3" },
    { title: "Cosmic Journey — Starfield Drift", file: "/dump/meditations/cosmic_journey.mp3" },
  ];

  return (
    <main className="relative h-screen w-screen overflow-hidden p-8">
      {/* Cosmic Background */}
      <CosmicBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-800/40 via-indigo-800/40 to-black/50" />

      {/* Title */}
      <div className="relative z-10 text-center mb-8">
        <h1 className="text-4xl font-bold text-yellow-300 drop-shadow-xl tracking-widest">
          MEDITATIONS
        </h1>
        <p className="text-md text-indigo-200 mt-1">Guided • Spoken Word • Cosmic Journeys</p>
      </div>

      {/* Meditations Grid */}
      <div className="relative z-10 grid grid-cols-2 gap-8">
        {meditations.map((med, i) => (
          <div
            key={i}
            className="bg-black/70 p-6 rounded-xl shadow-xl hover:scale-105 transition transform"
          >
            <h2 className="text-lg font-bold text-yellow-200 mb-3">{med.title}</h2>
            <audio
              controls
              src={med.file}
              className="w-full"
              onPlay={() => setTrack(med.title)}
            />
          </div>
        ))}
      </div>

      {/* Back Button */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <button
          onClick={() => {
            playSound("vault/door_close");
            router.push("/world/healing");
          }}
          className="px-8 py-4 rounded-xl bg-red-600/80 hover:bg-red-500 text-white font-bold shadow-lg transition transform hover:scale-110"
        >
          ⬅ Back to Healing World
        </button>
      </div>

      {/* Now Playing HUD */}
      <div className="absolute bottom-4 right-6 z-10 bg-black/70 px-4 py-2 rounded-xl shadow-lg">
        <span className="font-mono text-sm text-yellow-200">
          🎵 Now Playing: <strong>Healing Meditations — Guided Journeys</strong>
        </span>
      </div>
    </main>
  );
}
