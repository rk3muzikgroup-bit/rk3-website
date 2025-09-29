// src/hooks/usePlaySound.ts
"use client";

import { useCallback } from "react";

/**
 * Hook to play a sound by filename.
 * Usage:
 *   const playUnlock = usePlaySound("vault/unlock");
 *   playUnlock();
 */
export function usePlaySound(file: string) {
  return useCallback(() => {
    try {
      const audio = new Audio(`/sounds/${file}.mp3`);
      audio.volume = 0.8; // adjust per your gain map
      audio.play();
    } catch (e) {
      console.error("Failed to play sound:", e);
    }
  }, [file]);
}
