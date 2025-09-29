"use client";

import { useVideoSrc } from "@/utils/usePlayVideo";

export default function RidePage() {
  const soulRide = useVideoSrc("soul_loop"); // ✅ safe mapped key

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <video
        src={soulRide}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-auto rounded-2xl shadow-lg"
      />
      <p className="mt-4 text-lg tracking-wide">🚀 Soul Ride Test</p>
    </div>
  );
}
