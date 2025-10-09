"use client";

import { useRef, useEffect } from "react";
import { useVideoVolume } from "@/hooks/useVideoVolume";
import { usePlaySound } from "@/hooks/usePlaySound";
import { useVideoSrc } from "@/hooks/useVideoSrc";

export default function RidePlayer({ portal }: { portal: "street" | "soul" | "spirit" }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const src = useVideoSrc("ride", portal);
  const playSound = usePlaySound();

  // normalize ride volume (0.5 baseline)
  useVideoVolume(videoRef, "ride");

  useEffect(() => {
    // fire rocket whoosh once video starts
    playSound("/sounds/ride/rocket_whoosh.mp3");
  }, [playSound]);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        loop={false}
        muted={false}
        className="w-full h-full object-cover"
        src={src}
      />

      {/* HUD overlay */}
      <div className="absolute top-6 left-6 bg-black/50 px-4 py-2 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold text-white tracking-wide">
          {portal.toUpperCase()} RIDE 🚀
        </h2>
      </div>
    </div>
  );
}
