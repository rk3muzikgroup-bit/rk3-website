"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePlaySound } from "@/hooks/usePlaySound";
import { useNowPlaying } from "@/context/NowPlayingContext";
import CosmicBackground from "@/components/CosmicBackground";

export default function YangPage() {
  const router = useRouter();
  const playSound = usePlaySound();
  const { setTrack } = useNowPlaying();

  useEffect(() => {
    setTrack("Yang Flow — Fire & Hustle");
    playSound("vault/unlock");
  }, [setTrack, playSound]);

  const yangTracks = [
    { title: "Street Fire", file: "/dump/yinyang/yang/street_fire.mp3" },
    { title: "Hustle Anthem", file: "/dump/yinyang/yang/hustle_anthem.mp3" },
  ];

  return (
    <main className="relative h-screen w-screen overflow-hidden p-8">
      <CosmicBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-900/50 to-black/50" />

      <div className="relative z-10 text-center mb-8">
        <h1 className="text-4xl font-bold text-yellow-300">🔥 YANG FLOW</h1>
        <p className="text-md text-red-200">Energy • Hustle • Expansion</p>
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-8">
        {yangTracks.map((track, i) => (
          <div key={i} className="bg-black/70 p-6 rounded-xl shadow-lg hover:scale-105 transition">
            <h2 className="text-lg font-bold text-yellow-200 mb-3">{track.title}</h2>
            <audio controls src={track.file} className="w-full" onPlay={() => setTrack(track.title)} />
          </div>
        ))}
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <button
          onClick={() => {
            playSound("vault/door_close");
            router.push("/world/yinyang");
          }}
          className="px-8 py-4 rounded-xl bg-red-600/80 hover:bg-red-500 text-white font-bold"
        >
          ⬅ Back to Yin & Yang
        </button>
      </div>
    </main>
  );
}
