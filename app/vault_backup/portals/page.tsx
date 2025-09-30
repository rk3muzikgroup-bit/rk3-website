"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { usePlaySound } from "@/hooks/usePlaySound";
import HUDVolume from "@/components/HUDVolume";

type Portal = "street" | "soul" | "spirit";

export default function PortalsPage() {
  const router = useRouter();
  const playSound = usePlaySound();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [active, setActive] = useState<Portal | null>(null);
  const [fadeOut, setFadeOut] = useState(false);

  // 🎵 Play background loop for selected portal
  useEffect(() => {
    if (active) {
      playSound(`ride/${active}_loop`, { loop: true, volume: 0.6 });
    }
  }, [active, playSound]);

  // 🚀 Handle portal click
  const enterPortal = (portal: Portal) => {
    setActive(portal);
    setFadeOut(true);

    setTimeout(() => {
      router.push(`/ride/${portal}`);
    }, 2000); // fade before routing
  };

  // 🎥 Auto-play background ambient
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.5; // baseline for ride videos
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* 🌌 Starfield ambient */}
      <div className="absolute inset-0 z-0 bg-[url('/videos/starfield.gif')] bg-cover bg-center opacity-40" />

      {/* 🎥 Placeholder background loop */}
      <video
        ref={videoRef}
        src="/videos/vault/vault_bg01.mp4"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-2000 ${
          fadeOut ? "opacity-0" : "opacity-100"
        }`}
        muted
        loop
        playsInline
      />

      {/* 🎛 HUD + Portals */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-end p-8 space-y-8">
        <HUDVolume />

        <div className="grid grid-cols-3 gap-6">
          <button
            onClick={() => enterPortal("street")}
            className="px-8 py-4 rounded-2xl bg-red-600 text-white font-bold text-xl shadow-lg hover:bg-red-700 transition"
          >
            🛹 Street
          </button>
          <button
            onClick={() => enterPortal("soul")}
            className="px-8 py-4 rounded-2xl bg-green-600 text-white font-bold text-xl shadow-lg hover:bg-green-700 transition"
          >
            🎶 Soul
          </button>
          <button
            onClick={() => enterPortal("spirit")}
            className="px-8 py-4 rounded-2xl bg-blue-600 text-white font-bold text-xl shadow-lg hover:bg-blue-700 transition"
          >
            ✨ Spirit
          </button>
        </div>
      </div>
    </div>
  );
}
