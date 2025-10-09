"use client";

import { useVolume } from "@/context/VolumeContext";
import { useCallback } from "react";

export function usePlaySound() {
  const { sfxVolume, muted } = useVolume();

  const playSound = useCallback(
    (src: string) => {
      if (muted) return; // no sound if muted

      const audio = new Audio(src);
      audio.volume = sfxVolume; // normalize to SFX volume
      audio.play().catch((err) => {
        console.warn("Sound playback failed:", err);
      });
    },
    [sfxVolume, muted]
  );

  return playSound;
}
