import type { Chakra } from "@/hooks/useAudioMixer";

/* ───────── TYPES ───────── */

export type Brainwave =
  | "delta"
  | "theta"
  | "alpha"
  | "beta"
  | "gamma";

export type BuilderStep = {
  id: string;
  voice?: string;
  caption?: string;
  duration: number;
  chakra: Chakra;
  brainwave: Brainwave;
};

/* ───────── BUILDER → SESSION ───────── */

export function buildSessionFromFrequency(
  steps: BuilderStep[]
) {
  return {
    id: "generated",
    title: "Custom Healing Session",
    tags: ["realm:healing", "type:custom"],
    guidance: "Let the sound do the work.",
    steps: steps.map(step => ({
      voice: step.voice,
      caption: step.caption,
      duration: step.duration,
      chakra: step.chakra,
      brainwave: step.brainwave,
    })),
  };
}
