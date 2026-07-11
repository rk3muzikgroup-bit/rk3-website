"use client";

import { useRef } from "react";
import type { Chakra } from "@/hooks/useAudioMixer";

export type Brainwave =
  | "delta"
  | "theta"
  | "alpha"
  | "beta"
  | "gamma";

/* ───────── FREQUENCIES ───────── */

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
  thirdEye: 426,
  crown: 480,
};

/* ───────── HOOK ───────── */

export function useBinauralEngine() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const leftOscRef = useRef<OscillatorNode | null>(null);
  const rightOscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  /* ───────── CONTEXT ───────── */

  function getContext() {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }

    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }

    return audioCtxRef.current;
  }

  /* ───────── STOP ───────── */

  function stop() {
    try {
      leftOscRef.current?.stop();
      rightOscRef.current?.stop();
    } catch {
      // already stopped
    }

    leftOscRef.current = null;
    rightOscRef.current = null;
    gainRef.current = null;
  }

  /* ───────── START ───────── */

  function start(
    chakra: Chakra,
    brainwave: Brainwave = "theta",
    volume = 0.15
  ) {
    const audioCtx = getContext();
    stop();

    const baseFreq = CHAKRA_BASE_FREQ[chakra];
    const beatOffset = BRAINWAVE_FREQ[brainwave];

    const leftOsc = audioCtx.createOscillator();
    const rightOsc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    leftOsc.type = "sine";
    rightOsc.type = "sine";

    leftOsc.frequency.setValueAtTime(
      baseFreq,
      audioCtx.currentTime
    );
    rightOsc.frequency.setValueAtTime(
      baseFreq + beatOffset,
      audioCtx.currentTime
    );

    gain.gain.setValueAtTime(0, audioCtx.currentTime);

    const leftPan = audioCtx.createStereoPanner();
    const rightPan = audioCtx.createStereoPanner();
    leftPan.pan.value = -1;
    rightPan.pan.value = 1;

    leftOsc.connect(leftPan).connect(gain);
    rightOsc.connect(rightPan).connect(gain);
    gain.connect(audioCtx.destination);

    // Soft fade-in
    gain.gain.linearRampToValueAtTime(
      volume,
      audioCtx.currentTime + 3
    );

    leftOsc.start();
    rightOsc.start();

    leftOscRef.current = leftOsc;
    rightOscRef.current = rightOsc;
    gainRef.current = gain;
  }

  /* ───────── FADE OUT ───────── */

  function fadeOut(seconds = 3) {
    if (!gainRef.current || !audioCtxRef.current) return;

    const now = audioCtxRef.current.currentTime;

    gainRef.current.gain.linearRampToValueAtTime(
      0,
      now + seconds
    );

    setTimeout(stop, seconds * 1000);
  }

  /* ───────── API ───────── */

  return {
    start,
    stop,
    fadeOut,
  };
}
