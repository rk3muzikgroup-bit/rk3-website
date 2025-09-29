"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { usePlaySound } from "@/utils/usePlaySound";
import { useVideoSrc } from "@/utils/usePlayVideo";

export default function TransitionPage({
  videoKey,
  soundFile,
  routeTo,
  label,
}: {
  videoKey: string; // e.g. "final_close"
  soundFile?: string; // e.g. "/sounds/vault/door_close.mp3"
  routeTo: string; // e.g. "/outro"
  label: string; // e.g. "🚪 Vault Final Close"
}) {
  const router = useRouter();
  const playSound = usePlaySound();
  const videoSrc = useVideoSrc(videoKey as any);
  const [fadeOut, setFadeOut] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  // 🎶 Start sound on page load if provided
  useEffect(() => {
    if (soundFile) {
      const snd = new Audio(soundFile);
      snd.volume = 1.0;
      snd.play().catch(() => {});
      setAudio(snd);
    }
  }, [soundFile]);

  // 🎬 When video ends → fade audio + screen
  const handleEnd = () => {
    if (audio) {
      let vol = 1.0;
      const fade = setInterval(() => {
        vol = Math.max(0, vol - 0.1);
        audio.volume = vol;
        if (vol <= 0) {
          clearInterval(fade);
          audio.pause();
        }
      }, 200); // 200ms steps → ~2s fade
    }

    playSound("fade_whoosh"); // 🔊 transition sfx
    setFadeOut(true);

    setTimeout(() => {
      router.push(routeTo);
    }, 2500); // 2.5s fade before route
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <video
        src={videoSrc}
        autoPlay
        muted
        playsInline
        className="w-full h-auto rounded-2xl shadow-lg"
        onEnded={handleEnd}
      />
      <p className="mt-4 text-lg">{label}</p>

      {/* Blackout overlay */}
      {fadeOut && (
        <div className="absolute inset-0 bg-black transition-opacity duration-500"></div>
      )}
    </div>
  );
}
