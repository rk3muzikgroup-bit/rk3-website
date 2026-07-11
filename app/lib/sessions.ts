import type { Chakra } from "@/hooks/useAudioMixer";
import type { Brainwave } from "@/hooks/useBinauralEngine";
import type {
  SessionPayload,
  SessionStep,
} from "@/hooks/useSessionEngine";
import { ALL_FREQUENCIES as FREQUENCIES } from "@/lib/frequencyCatalog";

/* ───────── CONSTANTS ───────── */

export const DEFAULT_SESSION_TIP =
  "Follow your intuition.";

/* ───────── GENERATORS ───────── */

/**
 * Single-frequency session
 */
function makeFrequencySession(
  frequencyId: string,
  chakra: Chakra,
  label: string
): SessionPayload {
  return {
    id: `freq_${frequencyId}`,
    title: `${label}`,
    tags: [
      "realm:frequency",
      "type:single",
      `frequency:${frequencyId}`,
      `chakra:${chakra}`,
    ],
    steps: [
      {
        id: crypto.randomUUID(),
        chakra,
        frequencyId,
        duration: 11 * 60 * 1000, // 11:11 base
      },
    ],
  };
}

/**
 * Multi-step frequency chain
 */
function makeFrequencyChain(params: {
  id: string;
  title: string;
  tags: string[];
  steps: {
    frequencyId: string;
    chakra: Chakra;
    brainwave?: Brainwave;
    minutes?: number;
  }[];
}): SessionPayload {
  return {
    id: params.id,
    title: params.title,
    tags: params.tags,
    steps: params.steps.map(step => ({
      id: crypto.randomUUID(),
      chakra: step.chakra,
      frequencyId: step.frequencyId,
      brainwave: step.brainwave,
      duration: (step.minutes ?? 11) * 60 * 1000,
    })),
  };
}

/* ───────── REGISTRY ───────── */

export const SESSIONS: Record<
  string,
  SessionPayload
> = {
  /* 🔥 AUTO-GENERATED SINGLE FREQUENCY SESSIONS */
  ...Object.fromEntries(
    FREQUENCIES.filter((f) => f.type === "pure").map((f) => [
      `freq_${f.id}`,
      makeFrequencySession(
        f.id,
        "heart",
        `${f.hz} Hz — ${f.label}`
      ),
    ])
  ),

  /* 🌈 FULL SOLFEGGIO HEALING SEQUENCE */
  solfeggio_healing: makeFrequencyChain({
    id: "solfeggio_healing",
    title: "Solfeggio Healing Sequence",
    tags: [
      "realm:frequency",
      "type:chain",
      "solfeggio:true",
      "journey:healing",
    ],
    steps: [
      { frequencyId: "174", chakra: "root", minutes: 5 },
      { frequencyId: "285", chakra: "sacral", minutes: 5 },
      { frequencyId: "396", chakra: "root", minutes: 6 },
      { frequencyId: "417", chakra: "sacral", minutes: 6 },
      { frequencyId: "528", chakra: "solar", minutes: 7 },
      { frequencyId: "639", chakra: "heart", minutes: 7 },
      { frequencyId: "741", chakra: "throat", minutes: 6 },
      { frequencyId: "852", chakra: "thirdEye", minutes: 6 },
      { frequencyId: "963", chakra: "crown", minutes: 8 },
    ],
  }),

  /* 🔗 7-CHAKRA ALIGNMENT */
  seven_chakra_alignment: makeFrequencyChain({
    id: "seven_chakra_alignment",
    title: "7-Chakra Frequency Alignment",
    tags: [
      "realm:frequency",
      "type:chain",
      "chakra:all",
      "journey:alignment",
    ],
    steps: [
      { frequencyId: "396", chakra: "root", minutes: 6 },
      { frequencyId: "417", chakra: "sacral", minutes: 6 },
      { frequencyId: "528", chakra: "solar", minutes: 6 },
      { frequencyId: "639", chakra: "heart", minutes: 6 },
      { frequencyId: "741", chakra: "throat", minutes: 6 },
      { frequencyId: "852", chakra: "thirdEye", minutes: 6 },
      { frequencyId: "963", chakra: "crown", minutes: 6 },
    ],
  }),

  /* 🧠 BRAINWAVE DESCENT */
  brainwave_descent: makeFrequencyChain({
    id: "brainwave_descent",
    title: "Brainwave Descent",
    tags: [
      "realm:frequency",
      "type:chain",
      "brainwave:true",
      "journey:sleep",
    ],
    steps: [
      {
        frequencyId: "432",
        chakra: "heart",
        brainwave: "alpha",
        minutes: 5,
      },
      {
        frequencyId: "432",
        chakra: "heart",
        brainwave: "theta",
        minutes: 7,
      },
      {
        frequencyId: "432",
        chakra: "heart",
        brainwave: "delta",
        minutes: 9,
      },
    ],
  }),

  /* 🧪 VOICE / HEALING */
  heart_reset: {
    id: "heart_reset",
    title: "Heart Reset",
    tags: [
      "realm:healing",
      "chakra:heart",
      "voice:true",
    ],
    steps: [
      {
        id: crypto.randomUUID(),
        chakra: "heart",
        voice: "/sounds/voice/soul_message.mp3",
        duration: 7 * 60 * 1000,
      },
    ],
  },
};
