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
import ReturnVaultButton from "@/components/vault/ReturnVaultButton";
import PortalOverlay from "@/components/vault/PortalOverlay";
import PortalOrbs from "@/components/vault/PortalOrbs";
import PortalAmbience from "@/components/vault/PortalAmbience";

export default function VaultStreet() {
  return (
    <div className="relative w-full h-screen bg-black text-white font-mono">
      <video
        src="/videos/ride/Street_Ride.mp4"
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />

      {/* Overlays */}
      <PortalOverlay type="street" />
      <PortalOrbs type="street" />
      <PortalAmbience type="street" />

      <ReturnVaultButton />
    </div>
  );
}
export default function VaultStreet() {
  return (
    <div className="relative w-full h-screen bg-black text-white font-mono">
      <video
        src="/videos/ride/Street_Ride.mp4"
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      <PortalOverlay type="street" />
      <ReturnVaultButton />
    </div>
  );
}

export default function VaultStreet() {
  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center text-white font-mono">
      <video
        src="/videos/ride/Street_Ride.mp4"
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
        <h1 className="text-4xl text-teal-400">🌆 Street Portal</h1>
      </div>
      <ReturnVaultButton />
    </div>
  );
}

export default function VaultStreet() {
  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center text-white font-mono">
      <video
        src="/videos/ride/Street_Ride.mp4"
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
        <h1 className="text-4xl text-teal-400">🌆 Street Portal</h1>
      </div>
    </div>
  );
}

export default function StreetPortalPage() {
  const router = useRouter();
  const playSound = usePlaySound();
  const { setTrack } = useNowPlaying();
  const streetSrc = useVideoSrc("ride/Street_Ride");
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play ambient street loop when portal loads
  useAmbient("ride/rocket_whoosh", { volume: 0.5 });

  useEffect(() => {
    setTrack("Street Ride — RK3 Experience");
    playSound("vault/unlock");
  }, [setTrack, playSound]);

  return (
    <main className="relative h-screen w-screen overflow-hidden">
      {/* Cosmic background (overlay under ride loop) */}
      <CosmicBackground />

      {/* Street Loop Video */}
      <video
        ref={videoRef}
        src={streetSrc}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-90"
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Portal Title */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-center z-10">
        <h1 className="text-4xl font-bold text-yellow-300 drop-shadow-lg tracking-widest">
          STREET PORTAL
        </h1>
        <p className="text-md text-indigo-200 mt-1">The Vibe • The Hustle • The Beat</p>
      </div>

      {/* Content Buttons */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex gap-8">
        <button
          onClick={() => {
            playSound("ride/transition_whoosh");
            router.push("/world/music");
          }}
          className="px-6 py-3 rounded-xl bg-emerald-600/80 hover:bg-emerald-500 text-white font-bold shadow-lg transition transform hover:scale-110"
        >
          🎵 Music
        </button>
        <button
          onClick={() => {
            playSound("vault/denied_blast");
            router.push("/vault");
          }}
          className="px-6 py-3 rounded-xl bg-red-600/80 hover:bg-red-500 text-white font-bold shadow-lg transition transform hover:scale-110"
        >
          ⬅ Back to Vault
        </button>
      </div>

      {/* Now Playing Overlay */}
      <div className="absolute bottom-4 right-6 z-10 bg-black/60 px-4 py-2 rounded-xl shadow-lg">
        <span className="font-mono text-sm text-emerald-200">
          🎵 Now Playing: <strong>Street Ride — RK3 Experience</strong>
        </span>
      </div>
    </main>
  );
}
