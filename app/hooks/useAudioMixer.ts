"use client";

import { useRef, useState } from "react";

/* ───────── TYPES ───────── */

/**
 * Chakra energy centers
 */
export type Chakra =
  | "root"
  | "sacral"
  | "solar"
  | "heart"
  | "throat"
  | "thirdEye"
  | "crown";

/* ───────── HOOK ───────── */

/**
 * Central Audio Mixer
 * SINGLE SOURCE OF TRUTH
 */
export function useAudioMixer() {
  const ctxRef = useRef<AudioContext | null>(null);

  const ambientRef = useRef<Record<string, HTMLAudioElement>>({});
  const fxRef = useRef<Record<string, HTMLAudioElement>>({});

  const [chakra, setChakra] = useState<Chakra>("heart");
  const [masterVolume, setMasterVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);

  /* ───────── CONTEXT ───────── */

  function ensureContext() {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    return ctxRef.current;
  }

  /* ───────── INTERNAL HELPERS ───────── */

  function applyVolume(audio: HTMLAudioElement, baseVolume: number) {
    audio.volume = muted ? 0 : baseVolume * masterVolume;
  }

  /* ───────── AMBIENT ───────── */

  function loadAmbient(id: string, src: string, baseVolume = 0.25) {
    if (ambientRef.current[id]) return;

    const audio = new Audio(src);
    audio.loop = true;
    applyVolume(audio, baseVolume);

    ambientRef.current[id] = audio;
  }

  function playAmbient(id: string) {
    ensureContext();
    ambientRef.current[id]?.play().catch(() => {});
  }

  function stopAmbient(id: string) {
    ambientRef.current[id]?.pause();
  }

  /* ───────── FX ───────── */

  function loadFX(id: string, src: string, baseVolume = 0.8) {
    if (fxRef.current[id]) return;

    const audio = new Audio(src);
    applyVolume(audio, baseVolume);

    fxRef.current[id] = audio;
  }

  function playFX(id: string) {
    ensureContext();
    const audio = fxRef.current[id];
    if (!audio) return;

    audio.currentTime = 0;
    audio.play().catch(() => {});
  }

  /* ───────── MASTER CONTROL ───────── */

  function mute() {
    setMuted(true);
    Object.values(ambientRef.current).forEach(a => (a.volume = 0));
    Object.values(fxRef.current).forEach(a => (a.volume = 0));
  }

  function unmute() {
    setMuted(false);
    Object.values(ambientRef.current).forEach(a =>
      applyVolume(a, 0.25)
    );
    Object.values(fxRef.current).forEach(a =>
      applyVolume(a, 0.8)
    );
  }

  /* ───────── RETURN ───────── */

  return {
    /* context */
    context: ctxRef,
    ensureContext,

    /* chakra */
    chakra,
    setChakra,

    /* ambient */
    loadAmbient,
    playAmbient,
    stopAmbient,

    /* fx */
    loadFX,
    playFX,

    /* master */
    masterVolume,
    setMasterVolume,
    muted,
    mute,
    unmute,
  };
}
