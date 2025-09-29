"use client";

import { useParams, useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { usePlaySound } from "@/hooks/usePlaySound";
import { HUDVolume } from "@/components/HUDVolume";

export default function RidePage() {
  const { portal } = useParams(); // "street" | "soul" | "spirit"
  const router = useRouter();
  const playSound = usePlaySound();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [blackScreen, setBlackScreen] = useState(false);

  // 🎵 Play loop for this portal
  useEffect(() => {
    if (portal) {
      playSound(`ride/${portal}_loop`, { loop: false, volume: 0.6 });
    }
  }, [portal, playSound]);

  // 🎥 Play ride video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.5; // baseline for ride videos
      videoRef.current.play().catch(() => {});
    }
  }, []);

  // 🕒 Timing flow: 59s video fade → 1:11 vault transition
  useEffect(() => {
    // Fade video out at 59s
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setBlackScreen(true), 2000); // fully black after fade
    }, 59000);

    // Route to vault at 71s (1:11)
    const routeTimer = setTimeout(() => {
      router.push("/vault/portals");
    }, 71000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(routeTimer);
    };
  }, [router]);

  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* 🌌 Starfield overlay */}
      <div className="absolute inset-0 z-0 bg-[url('/videos/starfield.gif')] bg-cover bg-center opacity-40" />

      {/* 🎥 Ride video */}
      {!blackScreen && (
        <video
          ref={videoRef}
          src={`/videos/ride/${capitalize(portal)}_Ride.mp4`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-2000 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
          muted
          playsInline
        />
      )}

      {/* 🖤 Black screen during music-only section */}
      {blackScreen && (
        <div className="absolute inset-0 bg-black transition-opacity duration-1000" />
      )}

      {/* 🎛 HUD + Exit (manual control) */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-end p-8 space-y-6">
        <HUDVolume />
        <button
          onClick={() => router.push("/vault/portals")}
          className="px-6 py-3 rounded-2xl bg-gray-700 text-white font-bold shadow-lg hover:bg-gray-800 transition"
        >
          🔙 Skip to Vault
        </button>
      </div>
    </div>
  );
}

// 🛠 Helper: capitalize first letter
function capitalize(str: string | string[] | undefined): string {
  if (!str) return "";
  if (Array.isArray(str)) str = str[0];
  return str.charAt(0).toUpperCase() + str.slice(1);
}
