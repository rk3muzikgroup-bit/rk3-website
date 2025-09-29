"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { usePlaySound } from "@/utils/usePlaySound";
import { useVideoSrc } from "@/utils/usePlayVideo";

export default function VaultIdlePage() {
  const router = useRouter();
  const playSound = usePlaySound();
  const videoSrc = useVideoSrc("door_idle");
  const [fadeOut, setFadeOut] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  // 🔊 Loop the hum when idle loads
  useEffect(() => {
    const snd = new Audio("/sounds/vault/door_hum.mp3");
    snd.loop = true;
    snd.volume = 0.6;
    snd.play().catch(() => {});
    setAudio(snd);

    return () => {
      snd.pause();
      snd.src = "";
    };
  }, []);

  // 🚪 Handle room choice with fade effect
  const handleRoom = (room: "self_love" | "healing" | "legacy") => {
    playSound("fade_whoosh");
    setFadeOut(true);

    // Fade audio (vault hum)
    if (audio) {
      let vol = audio.volume;
      const fade = setInterval(() => {
        vol = Math.max(0, vol - 0.1);
        audio.volume = vol;
        if (vol <= 0) {
          clearInterval(fade);
          audio.pause();
        }
      }, 200);
    }

    // Route after 2.5s
    setTimeout(() => {
      router.push(`/rooms/${room}`);
    }, 2500);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white space-y-6">
      <video
        src={videoSrc}
        autoPlay
        muted
        playsInline
        loop
        className="w-full h-auto rounded-2xl shadow-lg"
      />
      <p className="mt-4 text-lg">🏦 Vault Idle – Choose Your Room</p>
      <div className="flex space-x-6 mt-6">
        <button
          onClick={() => handleRoom("self_love")}
          className="px-6 py-3 bg-pink-600 rounded-xl shadow-md hover:bg-pink-500 transition"
        >
          💖 Self Love
        </button>
        <button
          onClick={() => handleRoom("healing")}
          className="px-6 py-3 bg-blue-600 rounded-xl shadow-md hover:bg-blue-500 transition"
        >
          🌊 Healing
        </button>
        <button
          onClick={() => handleRoom("legacy")}
          className="px-6 py-3 bg-green-600 rounded-xl shadow-md hover:bg-green-500 transition"
        >
          🌟 Legacy
        </button>
      </div>

      {/* Blackout overlay */}
      {fadeOut && (
        <div className="absolute inset-0 bg-black transition-opacity duration-500"></div>
      )}
    </div>
  );
}
