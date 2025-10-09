"use client";

import { useEffect, useRef } from "react";
import { useVolume } from "@/context/VolumeContext";

export function useAmbient(src: string) {
  const { ambientVolume, muted } = useVolume();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(src);
      audioRef.current.loop = true;
      audioRef.current.autoplay = true;
      audioRef.current.volume = ambientVolume;
      audioRef.current.play().catch((err) => {
        console.warn("Ambient playback failed:", err);
      });
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [src]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : ambientVolume;
    }
  }, [ambientVolume, muted]);

  return audioRef;
}
