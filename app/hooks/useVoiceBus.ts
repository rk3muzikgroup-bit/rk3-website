import { useRef, useCallback, useEffect } from "react";

type FadeTarget = {
  baseVolume: number;
};

export function useVoiceBus(targetDuck = 0.35) {
  const isDuckedRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef<FadeTarget | null>(null);

  function cancelFade() {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }

  const duck = useCallback(
    (audio: HTMLAudioElement | null, duration = 300) => {
      if (!audio || isDuckedRef.current) return;

      cancelFade();

      // capture baseline once
      targetRef.current = {
        baseVolume: audio.volume,
      };

      isDuckedRef.current = true;

      const start = performance.now();
      const startVolume = audio.volume;

      const fade = (now: number) => {
        const progress = Math.min(
          (now - start) / duration,
          1
        );

        audio.volume =
          startVolume +
          (targetDuck - startVolume) * progress;

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(fade);
        }
      };

      rafRef.current = requestAnimationFrame(fade);
    },
    [targetDuck]
  );

  const unduck = useCallback(
    (audio: HTMLAudioElement | null, duration = 500) => {
      if (
        !audio ||
        !isDuckedRef.current ||
        !targetRef.current
      )
        return;

      cancelFade();

      const targetVolume = targetRef.current.baseVolume;
      isDuckedRef.current = false;

      const start = performance.now();
      const startVolume = audio.volume;

      const fade = (now: number) => {
        const progress = Math.min(
          (now - start) / duration,
          1
        );

        audio.volume =
          startVolume +
          (targetVolume - startVolume) * progress;

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(fade);
        }
      };

      rafRef.current = requestAnimationFrame(fade);
    },
    []
  );

  // cleanup on unmount
  useEffect(() => {
    return () => cancelFade();
  }, []);

  return {
    duck,
    unduck,
    isDucked: isDuckedRef,
  };
}
