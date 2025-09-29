"use client";

import { useEffect } from "react";
import { useOverlay } from "@/context/OverlayContext";
import { useRouter } from "next/navigation";

export default function StreetRidePage() {
  const { showOverlay } = useOverlay();
  const router = useRouter();

  useEffect(() => {
    showOverlay("street", 4000, true); // 🏙 street engine/music

    // after 1:11 (71s) route to vault
    const t = setTimeout(() => {
      showOverlay("granted", 2500, true); // ✅ access granted
      setTimeout(() => router.push("/vault"), 3000);
    }, 71000);

    return () => clearTimeout(t);
  }, [showOverlay, router]);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <video
        src="/videos/ride/Street_Ride.mp4"
        autoPlay
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-3xl font-bold text-white drop-shadow-md">
          🏙 Street Ride — Buckle Up
        </h1>
      </div>
    </div>
  );
}
