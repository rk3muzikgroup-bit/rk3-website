"use client";

import { useEffect, useRef } from "react";
import type { BreathPhase } from "@/lib/breathTypes";

type Options = {
  enabled?: boolean;
};

export function useBreathHaptics(
  phase?: BreathPhase,
  options: Options = {}
) {
  const lastPhase = useRef<BreathPhase | null>(null);
  const enabled = options.enabled ?? true;

  useEffect(() => {
    if (!enabled) return;
    if (!phase) return;
    if (lastPhase.current === phase) return;

    lastPhase.current = phase;

    if (
      typeof navigator === "undefined" ||
      !("vibrate" in navigator)
    ) {
      return;
    }

    let hapticsEnabled = true;

    try {
      const stored =
        localStorage.getItem("rks3:haptics");
      hapticsEnabled = stored !== "off";
    } catch {
      // storage unavailable → default on
    }

    if (!hapticsEnabled) return;

    // 🔬 Carefully tuned vibration patterns (ms)
    switch (phase) {
      case "inhale":
        navigator.vibrate(20); // gentle rise
        break;

      case "hold_in":
        navigator.vibrate([10, 20, 10]); // awareness
        break;

      case "exhale":
        navigator.vibrate(30); // release
        break;

      case "hold_out":
        navigator.vibrate(10);
        break;
    }
  }, [phase, enabled]);
}
