"use client";

import { useRef } from "react";
import { useVideoVolume } from "@/hooks/useVideoVolume";
import { useVideoSrc } from "@/hooks/useVideoSrc";

export default function CockpitLoop() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const src = useVideoSrc("cockpit");

  // normalize cockpit volume at 0.4
  useVideoVolume(videoRef, "cockpit");

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        playsInline
        muted={false}
        className="w-full h-full object-cover"
        src={src}
      />

      {/* HUD overlay */}
      <div className="absolute top-6 left-6 bg-black/50 px-4 py-2 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold text-white tracking-wide">COCKPIT VIEW 🛸</h2>
      </div>
    </div>
  );
}
