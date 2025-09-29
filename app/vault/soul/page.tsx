"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useVideoSrc } from "@/hooks/useVideoSrc";
import { usePlaySound } from "@/hooks/usePlaySound";
import { useNowPlaying } from "@/context/NowPlayingContext";
import { useAmbient } from "@/hooks/useAmbient";
import CosmicBackground from "@/components/CosmicBackground";
"use client";
"use client";

import ReturnVaultButton from "@/components/vault/ReturnVaultButton";
"use client";

import ReturnVaultButton from "@/components/vault/ReturnVaultButton";
import PortalOverlay from "@/components/vault/PortalOverlay";

export default function VaultSoul() {
  return (
    <div className="relative w-full h-screen bg-black text-white font-mono">
      <video
        src="/videos/ride/Soul_Ride.mp4"
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      <PortalOverlay type="soul" />
      <ReturnVaultButton />
    </div>
  );
}

export default function VaultSoul() {
  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center text-white font-mono">
      <video
        src="/videos/ride/Soul_Ride.mp4"
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
        <h1 className="text-4xl text-pink-400">💖 Soul Portal</h1>
      </div>
      <ReturnVaultButton />
    </div>
  );
}

export default function VaultSoul() {
  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center text-white font-mono">
      <video
        src="/videos/ride/Soul_Ride.mp4"
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
        <h1 className="text-4xl text-pink-400">💖 Soul Portal</h1>
      </div>
    </div>
  );
}

export default function SoulPortalPage() {
  const router = useRouter();
  const playSound = usePlaySound();
  const { setTrack } = useNowPlaying();
  const soulSrc = useVideoSrc("ride/Soul_Ride");
  const videoRef = useRef<HTMLVideoElement>(null);

  // Smooth ambient glow on portal load
  useAmbient("ride/transition_whoosh", { volume: 0.4 });

  useEffect(() => {
    setTrack("Soul Ride — RK3 Experience");
    playSound("vault/unlock");
  }, [setTrack, playSound]);

  return (
    <main className="relative h-screen w-screen overflow-hidden">
      {/* Cosmic background underlay */}
      <CosmicBackground />

      {/* Soul Loop Video */}
      <video
        ref={videoRef}
        src={soulSrc}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-90"
      />

      {/* Dark overlay for mood */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Portal Title */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-center z-10">
        <h1 className="text-4xl font-bold text-emerald-300 drop-shadow-lg tracking-widest">
          SOUL PORTAL
        </h1>
        <p className="text-md text-yellow-200 mt-1">The Heart • The Healing • The Flow</p>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex gap-8">
        <button
          onClick={() => {
            playSound("ride/transition_whoosh");
            router.push("/world/healing");
          }}
          className="px-6 py-3 rounded-xl bg-indigo-600/80 hover:bg-indigo-500 text-white font-bold shadow-lg transition transform hover:scale-110"
        >
          🌌 Healing
        </button>
        <button
          onClick={() => {
            playSound("vault/door_close");
            router.push("/vault");
          }}
          className="px-6 py-3 rounded-xl bg-red-600/80 hover:bg-red-500 text-white font-bold shadow-lg transition transform hover:scale-110"
        >
          ⬅ Back to Vault
        </button>
      </div>

      {/* Now Playing HUD */}
      <div className="absolute bottom-4 right-6 z-10 bg-black/60 px-4 py-2 rounded-xl shadow-lg">
        <span className="font-mono text-sm text-emerald-200">
          🎵 Now Playing: <strong>Soul Ride — RK3 Experience</strong>
        </span>
      </div>
    </main>
  );
}
