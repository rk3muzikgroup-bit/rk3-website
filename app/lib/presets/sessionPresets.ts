import type {
  BuilderIntentData,
  BuilderSection,
} from "@/components/builder/BuilderRoot";

/* ───────── TYPES ───────── */

export type SessionPreset = {
  id: string;
  label: string;
  description: string;
  intent: BuilderIntentData;
  flow: BuilderSection[];
};

/* ───────── PRESETS ───────── */

export const SESSION_PRESETS: readonly SessionPreset[] = [
  {
    id: "deep-calm",
    label: "Deep Calm",
    description: "Slow, grounding, minimal voice.",
    intent: {
      title: "Deep Calm",
      intention: "calm",
      hasVoice: false,
    },
    flow: [
      {
        id: "arrival",
        label: "arrival",
        audioSrc: "/sounds/ambient/soft-pad.mp3",
      },
      {
        id: "core",
        label: "core",
        audioSrc: "/sounds/ambient/deep-field.mp3",
      },
      {
        id: "integration",
        label: "integration",
        audioSrc: "/sounds/ambient/warm-hum.mp3",
      },
      {
        id: "end",
        label: "end",
        audioSrc: "/sounds/ambient/soft-fade.mp3",
      },
    ],
  },

  {
    id: "guided-reset",
    label: "Guided Reset",
    description: "Voice-led reset with gentle music.",
    intent: {
      title: "Guided Reset",
      intention: "reset",
      hasVoice: true,
    },
    flow: [
      {
        id: "arrival",
        label: "arrival",
        voiceSrc: "/sounds/voice/arrival.mp3",
      },
      {
        id: "core",
        label: "core",
        audioSrc: "/sounds/music/reset-bed.mp3",
        voiceSrc: "/sounds/voice/core.mp3",
      },
      {
        id: "integration",
        label: "integration",
        audioSrc: "/sounds/ambient/integrate.mp3",
      },
      {
        id: "end",
        label: "end",
        voiceSrc: "/sounds/voice/close.mp3",
      },
    ],
  },

  {
    id: "sleep-drift",
    label: "Sleep Drift",
    description: "Ultra-low energy, no return cue.",
    intent: {
      title: "Sleep Drift",
      intention: "sleep",
      hasVoice: false,
    },
    flow: [
      {
        id: "arrival",
        label: "arrival",
        audioSrc: "/sounds/ambient/night-pad.mp3",
      },
      {
        id: "core",
        label: "core",
        audioSrc: "/sounds/ambient/deep-sleep.mp3",
      },
      {
        id: "integration",
        label: "integration",
        audioSrc: "/sounds/ambient/slow-breath.mp3",
      },
      {
        id: "end",
        label: "end",
        audioSrc: "/sounds/ambient/void.mp3",
      },
    ],
  },
] as const;
