"use client";

import { useRef } from "react";
import { useVideoVolume } from "@/hooks/useVideoVolume";
import { useAmbient } from "@/hooks/useAmbient";

export default function VaultRoomAtmosphere() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // normalize room volume baseline (0.35 gain)
  useVideoVolume(videoRef, "room");

  // looping ambient sound (door hum, water drip, etc.)
  useAmbient("/sounds/vault/door_hum.mp3");

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        playsInline
        muted={false}
        className="w-full h-full object-cover"
        src="/videos/rooms/room_loop.mp4"
      />

      {/* Overlay haze for cinematic effect */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
    </div>
  );
}
