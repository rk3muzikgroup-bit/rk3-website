"use client";

import { useEffect, useRef } from "react";
import type { WavePlan, WaveStep } from "@/lib/waveGenerator";
import { useAudioMixer } from "@/hooks/useAudioMixer";

/**
 * Plays a WavePlan through the AudioMixer
 */
export function useWavePlayer(plan: WavePlan | null, active: boolean) {
  const mixer = useAudioMixer();
  const stepIndexRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!plan || !active) {
      stop();
      return;
    }

    stepIndexRef.current = 0;
    playStep(plan.steps[0]);

    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plan?.id, active]);

  function playStep(step: WaveStep) {
    mixer.clear();

    step.layers.forEach(layer => {
      mixer.addTone({
        hz: layer.hz,
        gain: layer.gain,
        pan: layer.pan,
      });
    });

    mixer.play();

    if (step.durationMs) {
      timeoutRef.current = window.setTimeout(() => {
        stepIndexRef.current += 1;
        const next = plan?.steps[stepIndexRef.current];
        if (next) playStep(next);
      }, step.durationMs);
    }
  }

  function stop() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    mixer.stop();
    mixer.clear();
  }
}
