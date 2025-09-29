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

export default function VaultSpirit() {
  return (
    <div className="relative w-full h-screen bg-black text-white font-mono">
      <video
        src="/videos/ride/Spirit_Ride.mp4"
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      <PortalOverlay type="spirit" />
      <ReturnVaultButton />
    </div>
  );
}

export default function VaultSpirit() {
  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center text-white font-mono">
      <video
        src="/videos/ride/Spirit_Ride.mp4"
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
        <h1 className="text-4xl text-indigo-400">🌌 Spirit Portal</h1>
      </div>
      <ReturnVaultButton />
    </div>
  );
}

export default function VaultSpirit() {
  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center text-white font-mono">
      <video
        src="/videos/ride/Spirit_Ride.mp4"
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
        <h1 className="text-4xl text-indigo-400">🌌 Spirit Portal</h1>
      </div>
    </div>
  );
}

export default function SpiritPortalPage() {
  const router = useRouter();
  const playSound = usePlaySound();
  const { setTrack } = useNowPlaying();
  const spiritSrc = useVideoSrc("ride/Spirit_Ride");
  const videoRef = useRef<HTMLVideoElement>(null);

  // Spirit entry ambient: long hum on entry
  useAmbient("vault/door_hum", { loop: true, volume: 0.25 });

  useEffect(() => {
    setTrack("Spirit Ride — RK3 Experience");
    playSound("vault/unlock");
  }, [setTrack, playSound]);

  return (
    <main className="relative h-screen w-screen overflow-hidden">
      {/* Cosmic starfield backdrop */}
      <CosmicBackground />

      {/* Spirit Ride Video */}
      <video
        ref={videoRef}
        src={spiritSrc}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-90"
      />

      {/* Indigo-Gold overlay aura */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/60 via-black/40 to-yellow-900/40" />

      {/* Portal Title */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-center z-10">
        <h1 className="text-4xl font-bold text-indigo-300 drop-shadow-xl tracking-widest">
          SPIRIT PORTAL
        </h1>
        <p className="text-md text-yellow-200 mt-1">The Light • The Wisdom • The Beyond</p>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex gap-8">
        <button
          onClick={() => {
            playSound("ride/transition_whoosh");
            router.push("/world/journal");
          }}
          className="px-6 py-3 rounded-xl bg-indigo-700/80 hover:bg-indigo-600 text-white font-bold shadow-lg transition transform hover:scale-110"
        >
          📖 Journal
        </button>
        <button
          onClick={() => {
            playSound("vault/closing_long");
            router.push("/vault");
          }}
          className="px-6 py-3 rounded-xl bg-red-700/80 hover:bg-red-600 text-white font-bold shadow-lg transition transform hover:scale-110"
        >
          ⬅ Back to Vault
        </button>
      </div>

      {/* Now Playing HUD */}
      <div className="absolute bottom-4 right-6 z-10 bg-black/70 px-4 py-2 rounded-xl shadow-lg">
        <span className="font-mono text-sm text-yellow-200">
          🎵 Now Playing: <strong>Spirit Ride — RK3 Experience</strong>
        </span>
      </div>
    </main>
  );
}
