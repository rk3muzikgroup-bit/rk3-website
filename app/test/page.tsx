"use client";

import { useState } from "react";
import { usePlaySound } from "@/hooks/usePlaySound";
import { useVideoSrc } from "@/hooks/useVideoSrc";
import { useAmbient } from "@/hooks/useAmbient";

import Orbs from "@/components/Orbs";
import Ethers from "@/components/Ethers";
import CosmicBackgroundsHUD from "@/app/backgrounds/CosmicBackgroundsHUD";

export default function FullTestPage() {
  const [ride, setRide] = useState<"street" | "soul" | "spirit">("street");

  // Ambient background hum
  useAmbient("/sounds/vault/door_hum.mp3", 0.15);

  // Play sound hook
  const playSound = usePlaySound();

  // Video source
  const videoSrc = useVideoSrc(ride);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white overflow-hidden">
      {/* Background cosmic HUD */}
      <CosmicBackgroundsHUD cycle={true} duration={15000} />

      {/* Particle FX */}
      <Ethers count={40} />
      <Orbs count={7} />

      {/* Headline */}
      <h1 className="text-4xl md:text-6xl font-bold z-10 mb-6 text-indigo-300 drop-shadow-lg">
        🚀 RK3 Cosmic Test Page
      </h1>

      {/* Video Preview */}
      <video
        key={videoSrc}
        autoPlay
        loop
        muted
        className="w-2/3 rounded-xl shadow-lg border border-gray-700 z-10"
        src={videoSrc}
      />

      {/* Ride Switcher */}
      <div className="flex gap-4 mt-6 z-10">
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

      {/* Sound Trigger */}
      <button
        onClick={() => playSound("/sounds/ride/rocket_whoosh.mp3")}
        className="mt-6 px-6 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-black font-semibold z-10"
      >
        🔊 Play Rocket Sound
      </button>
    </main>
  );
}
