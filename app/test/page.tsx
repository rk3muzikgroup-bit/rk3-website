"use client";

import { useState } from "react";
import { useVideoSrc } from "@/hooks/useVideoSrc";
import { useAmbient } from "@/hooks/useAmbient";
import { usePlaySound } from "@/hooks/usePlaySound";

export default function TestPage() {
  const [ride, setRide] = useState<"street" | "soul" | "spirit">("street");

  // ambient hum in the background
  useAmbient("/sounds/vault/door_hum.mp3", 0.15);

  // playSound hook
  const playSound = usePlaySound();

  // pick video based on ride state
  const videoSrc = useVideoSrc(ride);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white gap-6">
      <h1 className="text-3xl font-bold">🚀 Hook Test Page</h1>

      {/* Video preview */}
      <video
        key={videoSrc}
        autoPlay
        loop
        muted
        className="w-2/3 rounded-xl shadow-lg border border-gray-700"
        src={videoSrc}
      />

      {/* Ride switcher */}
      <div className="flex gap-4">
        <button
          onClick={() => setRide("street")}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700"
        >
          Street
        </button>
        <button
          onClick={() => setRide("soul")}
          className="px-4 py-2 rounded-lg bg-pink-600 hover:bg-pink-700"
        >
          Soul
        </button>
        <button
          onClick={() => setRide("spirit")}
          className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700"
        >
          Spirit
        </button>
      </div>

      {/* Sound trigger */}
      <button
        onClick={() => playSound("/sounds/ride/rocket_whoosh.mp3")}
        className="px-6 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
      >
        🔊 Play Rocket Sound
      </button>
    </div>
  );
}
