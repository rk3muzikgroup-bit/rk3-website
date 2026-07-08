"use client";

import { useMemo } from "react";
import type { BreathPhase } from "@/lib/breathTypes";

type Config = {
  elapsedMs: number;
  cycleMs?: number; // full breath cycle
  inhalePct?: number;
  holdInPct?: number;
  holdOutPct?: number;
};

export function useBreathPhase({
  elapsedMs,
  cycleMs = 8000, // default 8s breath
  inhalePct = 0.4,
  holdInPct = 0.2,
  holdOutPct = 0.2,
}: Config) {
  return useMemo<BreathPhase>(() => {
    const t = elapsedMs % cycleMs;

    const inhaleEnd = cycleMs * inhalePct;
    const holdInEnd = inhaleEnd + cycleMs * holdInPct;
    const exhaleEnd =
      cycleMs - cycleMs * holdOutPct;

    if (t < inhaleEnd) return "inhale";
    if (t < holdInEnd) return "hold_in";
    if (t < exhaleEnd) return "exhale";
    return "hold_out";
  }, [
    elapsedMs,
    cycleMs,
    inhalePct,
    holdInPct,
    holdOutPct,
  ]);
}
