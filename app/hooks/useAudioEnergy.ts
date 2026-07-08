"use client";

import { useEffect, useRef } from "react";

/**
 * useAudioEnergy
 * Global sound-energy pipeline (0 → 1)
 * Drives CSS via --sound-energy
 */
export function useAudioEnergy() {
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number | null>(null);

  // 🔒 Internal energy store (no React renders)
  const energyRef = useRef(0);

  /* ───────── INIT ───────── */
  function init(ctx: AudioContext) {
    if (analyserRef.current) return;

    const analyser = ctx.createAnalyser();
    analyser.fftSize = 512;
    analyser.smoothingTimeConstant = 0.8;
    analyserRef.current = analyser;
  }

  /* ───────── CONNECT AUDIO ───────── */
  function connect(audio: HTMLAudioElement, ctx: AudioContext) {
    if (!analyserRef.current) return;

    const source = ctx.createMediaElementSource(audio);
    source.connect(analyserRef.current);
    analyserRef.current.connect(ctx.destination);
  }

  /* ───────── ENERGY LOOP ───────── */
  useEffect(() => {
    function tick() {
      if (!analyserRef.current) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const buffer = new Uint8Array(
        analyserRef.current.frequencyBinCount
      );
      analyserRef.current.getByteFrequencyData(buffer);

      let sum = 0;
      for (let i = 0; i < buffer.length; i++) {
        sum += buffer[i];
      }

      const energy = Math.min(
        1,
        sum / buffer.length / 255
      );

      // 🔥 Store internally (debug / HUD safe)
      energyRef.current = energy;

      // 🌍 GLOBAL CSS PIPE
      document.documentElement.style.setProperty(
        "--sound-energy",
        energy.toFixed(3)
      );

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  /* ───────── PUBLIC API ───────── */
  return {
    init,
    connect,
    energyRef, // read-only, optional use
  };
}
