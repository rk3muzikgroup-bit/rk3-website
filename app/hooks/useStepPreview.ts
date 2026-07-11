"use client";

import { useEffect, useRef, useState } from "react";

export function useStepPreview() {
  const [previewStep, setPreviewStep] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  function stop() {
    if (!audioRef.current) {
      setPreviewStep(null);
      return;
    }

    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current = null;
    setPreviewStep(null);
  }

  function play(src: string, stepIndex?: number) {
    stop();

    const audio = new Audio(src);
    audioRef.current = audio;

    if (typeof stepIndex === "number") {
      setPreviewStep(stepIndex);
    }

    audio.play().catch(() => undefined);
  }

  useEffect(() => {
    return () => stop();
  }, []);

  return {
    previewStep,
    setPreviewStep,
    clearPreview: stop,
    play,
    stop,
  };
}
