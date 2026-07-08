import type { Chakra } from "@/hooks/useAudioMixer";

/* ───────── TYPES ───────── */

export type FrequencyPreset = {
  id: string;
  label: string;
  hz: number;
  chakra?: Chakra;
};

export type FrequencyGroup = {
  id: string;
  title: string;
  description: string;
  presets: FrequencyPreset[];
};

/* ───────── TIER 1 — FREQUENCY VAULT ───────── */

export const FREQUENCY_VAULT: FrequencyGroup[] = [
  {
    id: "solfeggio",
    title: "Solfeggio Frequencies",
    description:
      "A foundational set of frequencies commonly explored for awareness, regulation, and internal coherence.",
    presets: [
      { id: "174", label: "174 Hz – Physical Ease", hz: 174, chakra: "root" },
      { id: "285", label: "285 Hz – Tissue Awareness", hz: 285, chakra: "sacral" },
      { id: "396", label: "396 Hz – Grounding Release", hz: 396, chakra: "root" },
      { id: "417", label: "417 Hz – Pattern Reset", hz: 417, chakra: "sacral" },
      { id: "528", label: "528 Hz – Coherence / Repair", hz: 528, chakra: "heart" },
      { id: "639", label: "639 Hz – Relational Balance", hz: 639, chakra: "heart" },
      { id: "741", label: "741 Hz – Expression Clarity", hz: 741, chakra: "throat" },
      { id: "852", label: "852 Hz – Intuitive Awareness", hz: 852, chakra: "third_eye" },
      { id: "963", label: "963 Hz – Unity / Stillness", hz: 963, chakra: "crown" },
    ],
  },
  {
    id: "pure",
    title: "Pure Frequencies",
    description:
      "Single-frequency reference tones without symbolic or energetic overlays.",
    presets: [
      { id: "432", label: "432 Hz – Harmonic Reference", hz: 432 },
      { id: "440", label: "440 Hz – Standard Tuning", hz: 440 },
      { id: "528p", label: "528 Hz – Pure Tone", hz: 528 },
    ],
  },
];
