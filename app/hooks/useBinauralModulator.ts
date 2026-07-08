"use client";

import { useEffect } from "react";
import type { BreathPhase } from "@/lib/breathTypes";
import { useBinauralEngine } from "@/hooks/useBinauralEngine";

type Options = {
  enabled?: boolean;
  depth?: number; // gain modulation depth (0–1)
};

export function useBinauralModulator(
  phase?: BreathPhase,
  options: Options = {}
) {
  const engine = useBinauralEngine();
  const enabled = options.enabled ?? true;
  const depth = options.depth ?? 0.15; // SAFE, subtle

  useEffect(() => {
    if (!enabled || !phase) return;

    // We modulate gain indirectly by restarting fades
    // This preserves engine safety and avoids retuning oscillators

    switch (phase) {
      case "inhale":
        engine.fadeOut(0); // ensure clean baseline
        break;

      case "exhale":
        engine.fadeOut(0.5);
        break;

      case "hold_in":
      case "hold_out":
        // no modulation during holds
        break;
    }
  }, [phase, enabled, depth, engine]);
}
