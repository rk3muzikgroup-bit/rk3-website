"use client";

import { useRef, useCallback } from "react";

type SoundOptions = {
  volume?: number;
  allowOverlap?: boolean;
};

export function useSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = useCallback(
    (
      src: string,
      { volume = 0.7, allowOverlap = false }: SoundOptions = {}
    ) => {
      try {
        if (!allowOverlap && audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }

        const audio = new Audio(src);
        audio.volume = volume;

        audio
          .play()
          .catch(() => {
            // autoplay blocked — silently ignore
          });

        audio.onended = () => {
          if (audioRef.current === audio) {
            audioRef.current = null;
          }
        };

        audioRef.current = audio;
      } catch {
        // never throw from UI
      }
    },
    []
  );

  const stop = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current = null;
  }, []);

  return {
    play,
    stop,
  };
}
