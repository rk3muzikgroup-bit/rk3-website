"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { usePlaySound } from "@/utils/usePlaySound";
import { useVideoSrc } from "@/utils/usePlayVideo";

export default function OutroPage() {
  const router = useRouter();
  const playSound = usePlaySound();
  const videoSrc = useVideoSrc("outro_sequence");
  const [fadeOut, setFadeOut] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  // 🎶 Start Outro music
  useEffect(() => {
    const snd = new Audio("/sounds/outro.mp3");
    snd.volume = 1.0;
    snd.play().catch(() => {});
    setAudio(snd);

    return () => {
      snd.pause();
      snd.src = "";
    };
  }, []);

  // 🎬 Fade out when Outro video ends
  const handleVideoEnd = () => {
    playSound("fade_whoosh");
    setFadeOut(true);

    if (audio) {
      let vol = 1.0;
      const fade = setInterval(() => {
        vol = Math.max(0, vol - 0.1);
        audio.volume = vol;
        if (vol <= 0) {
          clearInterval(fade);
          audio.pause();
        }
      }, 200); // ~2s fade
    }

    // ⏳ Fade (2.5s) + Silent Pause (2s) = 4.5s total before reset
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
      <p className="mt-4 text-lg">🎬 Outro Sequence</p>

      {/* Blackout overlay */}
      {fadeOut && (
        <div className="absolute inset-0 bg-black transition-opacity duration-[2500ms]"></div>
      )}
    </div>
  );
}
