"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { usePlaySound } from "@/utils/usePlaySound";
import { useVideoSrc } from "@/utils/usePlayVideo";

export default function VaultDeniedPage() {
  const router = useRouter();
  const playSound = usePlaySound();
  const videoSrc = useVideoSrc("denied");
  const [fadeOut, setFadeOut] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  // 🚨 Play denied blast when loaded
  React.useEffect(() => {
    const snd = new Audio("/sounds/vault/denied_blast.mp3");
    snd.volume = 1.0;
    snd.play().catch(() => {});
    setAudio(snd);

    return () => {
      snd.pause();
      snd.src = "";
    };
  }, []);

  // 🎬 Fade + Silent Pause → Reset
  const handleVideoEnd = () => {
    playSound("fade_whoosh");
    setFadeOut(true);

    // Fade audio down
    if (audio) {
      let vol = 1.0;
      const fade = setInterval(() => {
        vol = Math.max(0, vol - 0.1);
        audio.volume = vol;
        if (vol <= 0) {
          clearInterval(fade);
          audio.pause();
        }
      }, 200);
    }

    // 2.5s fade + 2s silent pause = 4.5s before reset
    setTimeout(() => {
      router.push("/"); // Auto-reset → Pro Page
    }, 4500);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <video
        src={videoSrc}
        autoPlay
        muted
        playsInline
        className="w-full h-auto rounded-2xl shadow-lg"
        onEnded={handleVideoEnd}
      />
      <p className="mt-4 text-lg">❌ Access Denied</p>

      {/* Blackout overlay */}
      {fadeOut && (
        <div className="absolute inset-0 bg-black transition-opacity duration-[2500ms]"></div>
      )}
    </div>
  );
}
