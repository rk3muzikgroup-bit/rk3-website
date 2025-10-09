// src/hooks/useEQ.ts
"use client";
import { useState, useEffect } from "react";

export function useEQ(audioElement: HTMLAudioElement | null) {
  const [filters, setFilters] = useState<any>(null);

  useEffect(() => {
    if (!audioElement) return;

    const ctx = new AudioContext();
    const source = ctx.createMediaElementSource(audioElement);

    // Create filters
    const bass = ctx.createBiquadFilter();
    bass.type = "lowshelf";
    bass.frequency.value = 200;

    const mid = ctx.createBiquadFilter();
    mid.type = "peaking";
    mid.frequency.value = 1000;
    mid.Q.value = 1;

    const treble = ctx.createBiquadFilter();
    treble.type = "highshelf";
    treble.frequency.value = 3000;

    // Connect chain
    source.connect(bass);
    bass.connect(mid);
    mid.connect(treble);
    treble.connect(ctx.destination);

    setFilters({ bass, mid, treble });
  }, [audioElement]);

  return filters;
}
