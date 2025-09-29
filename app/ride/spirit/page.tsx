"use client";

import { useEffect } from "react";
import { useOverlay } from "@/context/OverlayContext";
import { useRouter } from "next/navigation";

export default function SpiritRidePage() {
  const { showOverlay } = useOverlay();
  const router = useRouter();

  useEffect(() => {
    showOverlay("spirit", 4000, true); // 🌌 spirit engine/music

    const t = setTimeout(() => {
      showOverlay("granted", 2500, true);
      setTimeout(() => router.push("/vault"), 3000);
    }, 71000);

    return () => clearTimeout(t);
  }, [showOverlay, router]);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <video
        src="/videos/ride/Spirit_Ride.mp4"
        autoPlay
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-3xl font-bold text-yellow-400 drop-shadow-md">
          🌌 Spirit Ride — Enter the Unknown
        </h1>
      </div>
    </div>
  );
}
