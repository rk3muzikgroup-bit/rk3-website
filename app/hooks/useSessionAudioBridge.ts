"use client";

import { useEffect, useRef } from "react";
import type { SessionStep } from "@/hooks/useSessionEngine";
import { useAudioMixer } from "@/hooks/useAudioMixer";
import { useBinauralEngine } from "@/hooks/useBinauralEngine";

type Params = {
  step?: SessionStep;
  playing: boolean;
};

export function useSessionAudioBridge({
  step,
  playing,
}: Params) {
  const mixer = useAudioMixer();
  const binaural = useBinauralEngine();

  const lastStepIdRef = useRef<string | null>(null);

  /* ───────── STEP CHANGE ───────── */
  useEffect(() => {
    if (!step) return;

    const changed = lastStepIdRef.current !== step.id;
    lastStepIdRef.current = step.id;

    if (!changed) return;

    // STOP PREVIOUS AUDIO CLEANLY
    binaural.stop();

    // START STEP AUDIO
    if (step.voice) {
      mixer.playVoiceDSP(
        step.voice,
        "healing",
        step.chakra
      );
    }

    if (step.brainwave && step.chakra) {
      binaural.start(step.chakra, step.brainwave);
    }
  }, [step, mixer, binaural]);

  /* ───────── PLAY / PAUSE ───────── */
  useEffect(() => {
    if (!step) return;

    if (!playing) {
      // Fade binaural out gently on pause
      binaural.fadeOut(0.5);
    }
    // NOTE:
    // Voice + FX are one-shot and intentionally
    // NOT resumable to preserve discipline
  }, [playing, step, binaural]);
}
