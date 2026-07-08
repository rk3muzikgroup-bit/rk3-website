export type BreathPhase =
  | "inhale"
  | "hold_in"
  | "exhale"
  | "hold_out";

export type BreathPattern = {
  inhale: number;   // ms
  holdIn?: number;  // ms
  exhale: number;   // ms
  holdOut?: number; // ms
};

/* ───────── PRESETS ───────── */

export const BOX_BREATH: BreathPattern = {
  inhale: 4000,
  holdIn: 4000,
  exhale: 4000,
  holdOut: 4000,
};

export const CALM_BREATH: BreathPattern = {
  inhale: 4000,
  exhale: 6000,
};
