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
  presets: FrequencyPreset[];
};

/* ───────── FREQUENCY VAULT (TIER 1) ───────── */

export const FREQUENCY_VAULT: readonly FrequencyGroup[] = [
  {
    id: "solfeggio",
    title: "Solfeggio Frequencies",
    presets: [
      { id: "174", label: "174 Hz – Physical Ease", hz: 174, chakra: "root" },
      { id: "285", label: "285 Hz – Tissue Awareness", hz: 285, chakra: "sacral" },
      { id: "396", label: "396 Hz – Grounding Release", hz: 396, chakra: "root" },
      { id: "417", label: "417 Hz – Pattern Reset", hz: 417, chakra: "sacral" },
      { id: "528", label: "528 Hz – Coherence / Repair", hz: 528, chakra: "heart" },
      { id: "639", label: "639 Hz – Relational Balance", hz: 639, chakra: "heart" },
      { id: "741", label: "741 Hz – Expression Clarity", hz: 741, chakra: "throat" },
      { id: "852", label: "852 Hz – Intuitive Awareness", hz: 852, chakra: "thirdEye" },
      { id: "963", label: "963 Hz – Unity / Stillness", hz: 963, chakra: "crown" },
    ],
  },
  {
    id: "pure",
    title: "Pure Frequencies",
    presets: [
      { id: "432", label: "432 Hz – Harmonic Reference", hz: 432 },
      { id: "440", label: "440 Hz – Standard Tuning", hz: 440 },
      { id: "528p", label: "528 Hz – Pure Tone", hz: 528 },
    ],
  },
];

/* ───────── HELPERS ───────── */

/** Flattened list */
export const ALL_FREQUENCIES: FrequencyPreset[] =
  FREQUENCY_VAULT.flatMap(group => group.presets);

/** Lookup by id */
export function getFrequencyById(id: string) {
  return ALL_FREQUENCIES.find(f => f.id === id);
}

/** Lookup by hz */
export function getFrequencyByHz(hz: number) {
  return ALL_FREQUENCIES.find(f => f.hz === hz);
}
