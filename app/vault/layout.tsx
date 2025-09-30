"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import HUDVolume from "@/components/HUDVolume";
import WatermarkOverlay from "@/components/WatermarkOverlay";
import { useUser } from "@/hooks/useUser"; // your real auth hook
import { usePlaySound } from "@/hooks/usePlaySound";

export default function VaultLayout({ children }: { children: ReactNode }) {
  const user = useUser();
  const playSound = usePlaySound();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // 🎥 Auto-play vault ambient on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.35; // baseline vault ambience
      videoRef.current.play().catch(() => {});
    }
    // 🎵 Optional: vault hum loop
    playSound("vault/door_hum", { loop: true, volume: 0.3 });
  }, [playSound]);

  return (
    <div className="relative w-full h-screen bg-black text-white overflow-hidden">
      {/* 🌌 Cosmic Starfield Background */}
      <div className="absolute inset-0 z-0 bg-[url('/videos/starfield.gif')] bg-cover bg-center opacity-40" />

      {/* 🎥 Vault Ambient Loop */}
      <video
        ref={videoRef}
        src="/videos/cockpit/cockpit_loop.mp4"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        muted
        loop
        playsInline
      />

      {/* 🎛 HUD Overlay */}
      <div className="absolute top-4 right-4 z-30">
        <HUDVolume />
      </div>

      {/* 📄 Page Content */}
      <div className="relative z-20 w-full h-full flex items-center justify-center p-6">
        {children}
      </div>

      {/* 💧 Watermark Overlay */}
      <WatermarkOverlay userId={user?.email ?? "VAULT-MEMBER"} />
    </div>
  );
}
