"use client";

import { useRouter } from "next/navigation";
import React, { useRef, useEffect } from "react";
import { usePlaySound } from "@/utils/usePlaySound";
import { useVideoSrc } from "@/utils/usePlayVideo";

export default function VaultDoorOpenPage() {
  const router = useRouter();
  const playSound = usePlaySound();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoSrc = useVideoSrc("door_open");

  useEffect(() => {
    playSound("unlock"); // 🔊 play vault unlock sound
  }, [playSound]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        muted
        playsInline
        className="w-full h-auto rounded-2xl shadow-lg"
        onEnded={() => router.push("/vault/door_idle")}
      />
      <p className="mt-4 text-lg">🔓 Vault Door Opening</p>
    </div>
  );
}
