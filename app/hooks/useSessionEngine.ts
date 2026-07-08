"use client";

import { useEffect, useMemo } from "react";
import { useAmbient } from "@/context/AmbientContext";
import { useAudioPlayer } from "@/context/AudioPlayerContext";

/**
 * Session Engine
 * - Coordinates audio + ambient
 * - SAFE when providers are missing
 * - No hard crashes
 */
export function useSessionEngine() {
  let audio: ReturnType<typeof useAudioPlayer> | null = null;
  let ambient: ReturnType<typeof useAmbient> | null = null;

  // 🛡️ Safe hook access (prevents provider crash loops)
  try {
    audio = useAudioPlayer();
  } catch {
    audio = null;
  }

  try {
    ambient = useAmbient();
  } catch {
    ambient = null;
  }

  const duck = ambient?.duck ?? (() => {});
  const unduck = ambient?.unduck ?? (() => {});

  const engine = useMemo(() => {
    return {
      play(src?: string, title?: string) {
        if (!audio) return;
        duck();
        audio.play?.(src, title);
      },

      pause() {
        if (!audio) return;
        audio.pause?.();
        unduck();
      },

      stop() {
        if (!audio) return;
        audio.stop?.();
        audio.pause?.();
        unduck();
      },

      setVolume(volume: number) {
        audio?.setVolume?.(volume);
      },
    };
  }, [audio, duck, unduck]);

  // 🎧 Safety: unduck when audio naturally ends
  useEffect(() => {
    const el = audio?.element;
    if (!el) return;

    const handleEnded = () => {
      unduck();
    };

    el.addEventListener("ended", handleEnded);
    return () => {
      el.removeEventListener("ended", handleEnded);
    };
  }, [audio, unduck]);

  return engine;
}
