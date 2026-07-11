"use client";

import { useEffect, useRef } from "react";
import type { SessionStep } from "@/hooks/useSessionEngine";
import { useAudioMixer } from "@/hooks/useAudioMixer";
import type { Chakra } from "@/hooks/useAudioMixer";
import { useBinauralEngine } from "@/hooks/useBinauralEngine";
import type { Brainwave } from "@/hooks/useBinauralEngine";

type Params = {
  step?: SessionStep;
  playing: boolean;
};

const CHAKRAS: Chakra[] = [
  "root",
  "sacral",
  "solar",
  "heart",
  "throat",
  "thirdEye",
  "crown",
];

const BRAINWAVES: Brainwave[] = [
  "delta",
  "theta",
  "alpha",
  "beta",
  "gamma",
];

function isChakra(value?: string): value is Chakra {
  return Boolean(value && CHAKRAS.includes(value as Chakra));
}

function isBrainwave(value?: string): value is Brainwave {
  return Boolean(value && BRAINWAVES.includes(value as Brainwave));
}

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
      const voiceId = `voice-${step.id}`;
      mixer.loadFX(voiceId, step.voice, 0.9);
      mixer.playFX(voiceId);
    }

    if (isChakra(step.chakra) && isBrainwave(step.brainwave)) {
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
