"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePlaySound } from "@/hooks/usePlaySound";
import { useNowPlaying } from "@/context/NowPlayingContext";
import CosmicBackground from "@/components/CosmicBackground";

export default function FrequenciesPage() {
  const router = useRouter();
  const playSound = usePlaySound();
  const { setTrack } = useNowPlaying();

  useEffect(() => {
    setTrack("Healing Frequencies — Chakra & Solfeggio");
    playSound("vault/unlock");
  }, [setTrack, playSound]);

  // Placeholder frequencies (swap with your healing dumps)
  const frequencies = [
    { title: "Root Chakra — 396 Hz", file: "/dump/frequencies/root_396hz.mp3" },
    { title: "Heart Chakra — 639 Hz", file: "/dump/frequencies/heart_639hz.mp3" },
    { title: "Third Eye Chakra — 852 Hz", file: "/dump/frequencies/third_eye_852hz.mp3" },
    { title: "Solfeggio — 528 Hz (DNA Repair)", file: "/dump/frequencies/solfeggio_528hz.mp3" },
  ];

  return (
    <main className="relative h-screen w-screen overflow-hidden p-8">
      {/* Cosmic Backdrop */}
      <CosmicBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/40 to-indigo-900/40" />

      {/* Title */}
      <div className="relative z-10 text-center mb-8">
        <h1 className="text-4xl font-bold text-emerald-300 drop-shadow-xl tracking-widest">
          HEALING FREQUENCIES
        </h1>
        <p className="text-md text-yellow-200 mt-1">Chakras • Solfeggio • Binaural Beats</p>
      </div>

      {/* Frequency Grid */}
      <div className="relative z-10 grid grid-cols-2 gap-8">
        {frequencies.map((freq, i) => (
          <div
            key={i}
            className="bg-black/70 p-6 rounded-xl shadow-xl hover:scale-105 transition transform"
          >
            <h2 className="text-lg font-bold text-emerald-200 mb-3">{freq.title}</h2>
            <audio
              controls
              src={freq.file}
              className="w-full"
              onPlay={() => setTrack(freq.title)}
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
        <span className="font-mono text-sm text-emerald-200">
          🎵 Now Playing: <strong>Healing Frequencies — Chakra & Solfeggio</strong>
        </span>
      </div>
    </main>
  );
}
