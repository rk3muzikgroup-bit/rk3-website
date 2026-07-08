"use client";

import { useEffect, useRef, useState } from "react";
import type { BreathPattern, BreathPhase } from "@/lib/breathTypes";

/* ───────── TYPES ───────── */

type BreathState = {
  phase: BreathPhase;
  remainingMs: number;
};

type BreathQueueItem = {
  phase: BreathPhase;
  duration: number;
};

/* ───────── HOOK ───────── */

export function useBreathEngine(
  pattern?: BreathPattern,
  active = false
) {
  const [state, setState] =
    useState<BreathState | null>(null);

  const timerRef = useRef<number | null>(null);
  const phaseQueue = useRef<BreathQueueItem[]>([]);

  function clear() {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  function buildQueue(p: BreathPattern): BreathQueueItem[] {
    const q: BreathQueueItem[] = [];

    q.push({ phase: "inhale", duration: p.inhale });

    if (p.holdIn) {
      q.push({ phase: "hold_in", duration: p.holdIn });
    }

    q.push({ phase: "exhale", duration: p.exhale });

    if (p.holdOut) {
      q.push({ phase: "hold_out", duration: p.holdOut });
    }

    return q;
  }

  function run(index = 0) {
    const queue = phaseQueue.current;
    if (!queue.length) return;

    const item = queue[index % queue.length];

    setState({
      phase: item.phase,
      remainingMs: item.duration,
    });

    timerRef.current = window.setTimeout(() => {
      run(index + 1);
    }, item.duration);
  }

  useEffect(() => {
    clear();

    if (!active || !pattern) {
      setState(null);
      return;
    }

    phaseQueue.current = buildQueue(pattern);
    run(0);

    return clear;
  }, [active, pattern]);

  return {
    breath: state,
  };
}
