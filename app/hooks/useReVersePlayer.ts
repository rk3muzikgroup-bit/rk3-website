"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { ReVerseAsset } from "@/lib/reverse/types";

export function useReVersePlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [asset, setAsset] = useState<ReVerseAsset | null>(null);
  const [playing, setPlaying] = useState(false);

  /* ───────── CLEANUP ───────── */
  const cleanupAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    audio.onended = null;
    audioRef.current = null;
  }, []);

  /* ───────── LOAD ASSET ───────── */
  const load = useCallback(
    (next: ReVerseAsset) => {
      cleanupAudio();
      setPlaying(false);
      setAsset(next);

      if (next.audioUrl) {
        const audio = new Audio(next.audioUrl);

        audio.onended = () => {
          setPlaying(false);
        };

        audioRef.current = audio;
      }
    },
    [cleanupAudio]
  );

  /* ───────── CONTROLS ───────── */
  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio
      .play()
      .then(() => {
        setPlaying(true);
      })
      .catch(() => {
        setPlaying(false);
      });
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setPlaying(false);
  }, []);

  const stop = useCallback(() => {
    cleanupAudio();
    setPlaying(false);
  }, [cleanupAudio]);

  /* ───────── UNMOUNT SAFETY ───────── */
  useEffect(() => {
    return () => {
      cleanupAudio();
    };
  }, [cleanupAudio]);

  return {
    asset,
    playing,
    load,
    play,
    pause,
    stop,
  };
}
