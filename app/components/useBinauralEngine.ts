"use client";

import { useRef } from "react";
import type { Chakra } from "@/hooks/useAudioMixer";

export type Brainwave =
  | "delta"
  | "theta"
  | "alpha"
  | "beta"
  | "gamma";

const BRAINWAVE_FREQ: Record<Brainwave, number> = {
  delta: 2,
  theta: 6,
  alpha: 10,
  beta: 18,
  gamma: 40,
};

const CHAKRA_BASE_FREQ: Record<Chakra, number> = {
  root: 256,
  sacral: 288,
  solar: 320,
  heart: 341,
  throat: 384,
  third_eye: 426,
  crown: 480,
};

export function useBinauralEngine(
  audioCtx?: AudioContext | null
) {
  const leftOsc = useRef<OscillatorNode | null>(null);
  const rightOsc = useRef<OscillatorNode | null>(null);
  const gain = useRef<GainNode | null>(null);

  /* ───────── SAFETY ───────── */

  function ensureContext() {
    if (!audioCtx) return null;
    if (audioCtx.state === "suspended") {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  }

  function safeStopOsc(osc?: OscillatorNode | null) {
    try {
      osc?.stop();
    } catch {
      /* already stopped */
    }
    try {
      osc?.disconnect();
    } catch {}
  }

  /* ───────── STOP ───────── */

  function stop() {
    if (gain.current && audioCtx) {
      try {
        gain.current.gain.cancelScheduledValues(audioCtx.currentTime);
        gain.current.gain.setValueAtTime(
          gain.current.gain.value,
          audioCtx.currentTime
        );
        gain.current.gain.linearRampToValueAtTime(
          0,
          audioCtx.currentTime + 0.15
        );
      } catch {}
    }

    setTimeout(() => {
      safeStopOsc(leftOsc.current);
      safeStopOsc(rightOsc.current);

      try {
        gain.current?.disconnect();
      } catch {}

      leftOsc.current = null;
      rightOsc.current = null;
      gain.current = null;
    }, 200);
  }

  /* ───────── START ───────── */

  function start(
    chakra: Chakra,
    brainwave: Brainwave,
    volume = 0.15
  ) {
    const ctx = ensureContext();
    if (!ctx) return;

    stop();

    const base = CHAKRA_BASE_FREQ[chakra];
    const beat = BRAINWAVE_FREQ[brainwave];

    const left = ctx.createOscillator();
    const right = ctx.createOscillator();
    const g = ctx.createGain();

    left.type = "sine";
    right.type = "sine";

    left.frequency.value = base;
    right.frequency.value = base + beat;

    g.gain.setValueAtTime(0, ctx.currentTime);

    const leftPan = ctx.createStereoPanner();
    const rightPan = ctx.createStereoPanner();
    leftPan.pan.value = -1;
    rightPan.pan.value = 1;

    left.connect(leftPan).connect(g);
    right.connect(rightPan).connect(g);
    g.connect(ctx.destination);

    // smooth fade-in
    g.gain.linearRampToValueAtTime(
      volume,
      ctx.currentTime + 3
    );

    left.start();
    right.start();

    leftOsc.current = left;
    rightOsc.current = right;
    gain.current = g;
  }

  /* ───────── FADE OUT ───────── */

  function fadeOut(seconds = 3) {
    if (!audioCtx || !gain.current) return;

    try {
      gain.current.gain.cancelScheduledValues(audioCtx.currentTime);
      gain.current.gain.setValueAtTime(
        gain.current.gain.value,
        audioCtx.currentTime
      );
      gain.current.gain.linearRampToValueAtTime(
        0,
        audioCtx.currentTime + seconds
      );
    } catch {}

    setTimeout(() => {
      stop();
    }, seconds * 1000);
  }

  return {
    start,
    fadeOut,
    stop,
  };
}
