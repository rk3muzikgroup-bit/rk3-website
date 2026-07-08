import type { Chakra } from "@/hooks/useAudioMixer";
import type { Brainwave } from "@/hooks/useBinauralEngine";

/* ───────────── TYPES ───────────── */

export type SessionStep = {
  id: string;
  voice: string;
  caption: string;
  duration: number; // ms
  chakra: Chakra;
  mode: "observer" | "healing" | "godmode" | "void";
  brainwave: Brainwave;
};

export type HealingSession = {
  id: string;
  title: string;
  steps: SessionStep[];

  /* optional metadata (used by UI + vaults) */
  tags?: string[];
  guidance?: string;
};

/* ───────────── SESSIONS ───────────── */

export const SESSIONS: Record<string, HealingSession> = {
  heart_reset: {
    id: "heart_reset",
    title: "Heart Reset",
    tags: [
      "realm:healing",
      "chakra:heart",
      "tone:gentle",
    ],
    guidance: "Rest your attention in the chest area.",
    steps: [
      {
        id: "ground",
        voice: "/sounds/voice/grounding.mp3",
        caption: "Feel the ground supporting you.",
        duration: 12_000,
        chakra: "root",
        mode: "healing",
        brainwave: "theta",
      },
      {
        id: "open_heart",
        voice: "/sounds/voice/open_heart.mp3",
        caption: "Let the heart soften and open.",
        duration: 15_000,
        chakra: "heart",
        mode: "healing",
        brainwave: "alpha",
      },
      {
        id: "integration",
        voice: "/sounds/voice/integration.mp3",
        caption: "Carry this feeling with you.",
        duration: 10_000,
        chakra: "crown",
        mode: "observer",
        brainwave: "alpha",
      },
    ],
  },
};
