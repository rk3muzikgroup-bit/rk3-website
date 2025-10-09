"use client";

import { useParams } from "next/navigation";
import { useAmbient } from "@/hooks/useAmbient";
import { usePlaySound } from "@/hooks/usePlaySound";

export default function RoomPage() {
  const { portal, room } = useParams<{
    portal: "street" | "soul" | "spirit";
    room: string;
  }>();

  const playSound = usePlaySound();

  // light ambient to test rooms
  useAmbient("/sounds/vault/door_hum.mp3", 0.15);

  const getRoomConfig = () => {
    switch (room) {
      case "healing":
        return {
          title: "💎 Healing Room",
          color: "text-emerald-400",
          desc: "Resonant frequencies and soundscapes for deep balance.",
        };
      case "artifacts":
        return {
          title: "🏺 Artifact Room",
          color: "text-yellow-400",
          desc: "Explore ancient relics and timeless cosmic artifacts.",
        };
      case "media":
        return {
          title: "📺 Media Room",
          color: "text-indigo-400",
          desc: "Watch exclusive visuals and cinematic experiences.",
        };
      default:
        return {
          title: "🚪 Unknown Room",
          color: "text-gray-400",
          desc: "This chamber is still under construction.",
        };
    }
  };

  const { title, color, desc } = getRoomConfig();

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Title */}
      <h1
        className={`z-10 text-5xl md:text-6xl font-bold drop-shadow-lg mb-6 ${color}`}
      >
        {title}
      </h1>

      {/* Description */}
      <p className="z-10 text-lg max-w-xl text-center opacity-80 mb-8">
        {desc}
      </p>

      {/* Interaction */}
      <button
        onClick={() => playSound("/sounds/ride/transition_whoosh.mp3")}
        className="z-10 px-6 py-3 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-semibold"
      >
        🔊 Trigger Room Sound
      </button>
    </main>
  );
}
