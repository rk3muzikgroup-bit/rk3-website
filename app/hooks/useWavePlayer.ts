"use client";

import { useEffect, useRef } from "react";
import type { WavePlan, WaveStep } from "@/lib/waveGenerator";

/**
 * Plays a WavePlan with a lightweight Web Audio oscillator engine.
 * Kept independent from useAudioMixer because the mixer now handles
 * ambient/FX layers, not generated tone stacks.
 */
export function useWavePlayer(plan: WavePlan | null, active: boolean) {
  const ctxRef = useRef<AudioContext | null>(null);
  const stepIndexRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  function getContext() {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }

    if (ctxRef.current.state === "suspended") {
      ctxRef.current.resume().catch(() => undefined);
    }

    return ctxRef.current;
  }

  function stopCurrentStep() {
    oscillatorsRef.current.forEach((osc) => {
      try {
        osc.stop();
      } catch {
        // Oscillator may already be stopped.
      }
    });

    oscillatorsRef.current = [];
  }

  function playStep(step?: WaveStep) {
    if (!step) return;

    stopCurrentStep();

    const ctx = getContext();

    step.layers.forEach((layer) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const pan = ctx.createStereoPanner();

      osc.frequency.value = layer.hz;
      gain.gain.value = layer.gain ?? 0.12;
      pan.pan.value = layer.pan ?? 0;

      osc.connect(gain);
      gain.connect(pan);
      pan.connect(ctx.destination);

      osc.start();
      oscillatorsRef.current.push(osc);
    });

    if (step.durationMs) {
      timeoutRef.current = window.setTimeout(() => {
        stepIndexRef.current += 1;
        const next = plan?.steps[stepIndexRef.current];

        if (next) {
          playStep(next);
        } else {
          stopCurrentStep();
        }
      }, step.durationMs);
    }
  }

  function stop() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    stopCurrentStep();
  }

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
}
