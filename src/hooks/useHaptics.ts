// hooks/useHaptics.ts
"use client";

export function useHaptics() {
  const vibrate = (pattern: number | number[]) => {
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(pattern);
    }
  };

  return {
    soft: () => vibrate(40),         // short pulse
    double: () => vibrate([60, 40, 60]), // double thud
    sharp: () => vibrate(30),        // sharp tap
    rumble: () => vibrate([100, 50, 100, 50, 150]), // longer rumble
  };
}
