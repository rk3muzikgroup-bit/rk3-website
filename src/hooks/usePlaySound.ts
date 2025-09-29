"use client";
// hooks/usePlaySound.ts
"use client";

import { useCallback } from "react";

export function usePlaySound() {
  return useCallback((name: string) => {
    const audio = new Audio(`/sounds/vault/${name}.mp3`);
    audio.volume = 0.8; // adjust per your gain map
    audio.play();
  }, []);
}

export function usePlaySound(file: string) {
  const play = () => {
    try {
      const audio = new Audio(`/sounds/${file}.mp3`);
      audio.volume = 0.7; // default volume
      audio.play().catch((err) => {
        console.warn("Audio playback failed:", err);
      });
    } catch (error) {
      console.error("usePlaySound error:", error);
    }
  };

  return play;
}
