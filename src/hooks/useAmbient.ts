"use client";

import { useEffect, useRef } from "react";
import { useVolume } from "@/context/VolumeContext";

/**
 * Hook to play looping ambient sounds (hum, chimes, water, etc.)
 * Keeps volume normalized with global context.
 */
export function useAmbient(src: string) {
  const { ambientVolume, muted } = useVolume();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // stop old ambient if src changes
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    // create new ambient
    if (src) {
      const audio = new Audio(src);
      audio.loop = true;
      audio.volume = muted ? 0 : ambientVolume; // 🎚 normalized Hollywood balance
      audio.play().catch((err) => {
        console.warn("⚠️ Failed to play ambient:", src, err);
      });
      audioRef.current = audio;
    }

    // cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [src, ambientVolume, muted]);
}
