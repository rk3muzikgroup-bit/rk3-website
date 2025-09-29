"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePlaySound } from "@/hooks/usePlaySound";
import { useNowPlaying } from "@/context/NowPlayingContext";
import CosmicBackground from "@/components/CosmicBackground";

export default function BreathworkPage() {
  const router = useRouter();
  const playSound = usePlaySound();
  const { setTrack } = useNowPlaying();

  useEffect(() => {
    setTrack("Healing Breathwork — Guided Inhale & Exhale");
    playSound("vault/unlock");
  }, [setTrack, playSound]);

  // Placeholder breath sessions (swap for your guided files later)
  const breathSessions = [
    { title: "Box Breathing — 4:4:4:4", file: "/dump/breathwork/box_4444.mp3" },
    { title: "Deep Inhale / Long Exhale — 4:8", file: "/dump/breathwork/inhale4_exhale8.mp3" },
    { title: "Wim Hof Inspired — Power Breathing", file: "/dump/breathwork/wimhof.mp3" },
  ];

  return (
    <main className="relative h-screen w-screen overflow-hidden p-8">
      {/* Cosmic Backdrop */}
      <CosmicBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-800/40 to-emerald-800/40" />

      {/* Title */}
      <div className="relative z-10 text-center mb-8">
        <h1 className="text-4xl font-bold text-indigo-300 drop-shadow-xl tracking-widest">
          BREATHWORK
        </h1>
        <p className="text-md text-emerald-200 mt-1">Guided • Rhythmic • Healing</p>
      </div>

      {/* Breathwork Grid */}
      <div className="relative z-10 grid grid-cols-3 gap-8">
        {breathSessions.map((session, i) => (
          <div
            key={i}
            className="bg-black/70 p-6 rounded-xl shadow-xl hover:scale-105 transition transform"
          >
            <h2 className="text-lg font-bold text-indigo-200 mb-3">{session.title}</h2>
            <audio
              controls
              src={session.file}
              className="w-full"
              onPlay={() => setTrack(session.title)}
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
        <span className="font-mono text-sm text-indigo-200">
          🎵 Now Playing: <strong>Healing Breathwork — Guided Inhale & Exhale</strong>
        </span>
      </div>
    </main>
  );
}

