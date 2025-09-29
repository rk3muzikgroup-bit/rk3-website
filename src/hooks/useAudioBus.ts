"use client";

import { useRef } from "react";

// Simple 2-deck audio bus with crossfade
export function useAudioBus() {
  const aRef = useRef<HTMLAudioElement | null>(null);
  const bRef = useRef<HTMLAudioElement | null>(null);
  const active = useRef<"a" | "b">("a");

  const ensure = () => {
    if (!aRef.current) aRef.current = new Audio();
    if (!bRef.current) bRef.current = new Audio();
    aRef.current!.loop = true;
    bRef.current!.loop = true;
    aRef.current!.volume = 0;
    bRef.current!.volume = 0;
  };

  const playLoop = async (url: string, volume = 1) => {
    ensure();
    const deck = active.current === "a" ? aRef.current! : bRef.current!;
    deck.src = url;
    deck.currentTime = 0;
    deck.volume = volume;
    try { await deck.play(); } catch {}
  };

  // Crossfade from current deck to new URL over `durationSec`
  const crossfadeTo = async (url: string, durationSec = 2.5, targetVol = 1) => {
    ensure();
    const from = active.current === "a" ? aRef.current! : bRef.current!;
    const to   = active.current === "a" ? bRef.current! : aRef.current!;
    to.src = url;
    to.currentTime = 0;
    to.volume = 0;
    try { await to.play(); } catch {}
    const steps = Math.max(1, Math.round((durationSec * 1000) / 50));
    let i = 0;
    const iv = setInterval(() => {
      i++;
      const t = i / steps;
      to.volume = targetVol * t;
      from.volume = Math.max(0, from.volume * (1 - t));
      if (i >= steps) {
        clearInterval(iv);
        from.pause();
        from.currentTime = 0;
        from.volume = 0;
        active.current = active.current === "a" ? "b" : "a";
      }
    }, 50);
  };

  const stopAll = () => {
    ensure();
    aRef.current!.pause(); bRef.current!.pause();
    aRef.current!.currentTime = 0; bRef.current!.currentTime = 0;
    aRef.current!.volume = 0; bRef.current!.volume = 0;
  };

  return { playLoop, crossfadeTo, stopAll };
}
