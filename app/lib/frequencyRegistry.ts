import type { Chakra } from "@/hooks/useAudioMixer";
import type { Brainwave } from "@/hooks/useBinauralEngine";
import {
  type FrequencyEntry,
  getFrequencyById,
} from "@/lib/frequencyCatalog";

/**
 * FrequencyPortal
 * UI / navigation layer ONLY
 * (references master Frequency Catalog)
 */
export type FrequencyPortal = {
  id: string; // portal id (UI-level)
  frequencyId: string; // 🔑 references FrequencyCatalog
  label: string;
  chakra?: Chakra;
  brainwave?: Brainwave;
  audioSrc?: string; // optional preview sound
  description?: string;
};

/* ───────────── PORTAL REGISTRY ───────────── */

export const FREQUENCY_PORTALS: FrequencyPortal[] = [
  {
    id: "portal-heart-528",
    frequencyId: "pure-528",
    label: "528 Hz • Heart Repair",
    chakra: "heart",
    brainwave: "theta",
    audioSrc: "/sounds/frequencies/528hz.mp3",
  },
  {
    id: "portal-root-396",
    frequencyId: "pure-396",
    label: "396 Hz • Grounding",
    chakra: "root",
    brainwave: "delta",
    audioSrc: "/sounds/frequencies/396hz.mp3",
  },
  {
    id: "portal-crown-963",
    frequencyId: "pure-963",
    label: "963 Hz • Source",
    chakra: "crown",
    brainwave: "gamma",
    audioSrc: "/sounds/frequencies/963hz.mp3",
  },
];

/* ───────────── HELPERS ───────────── */

/**
 * Resolve portal → frequency entry
 */
export function resolvePortalFrequency(
  portal: FrequencyPortal
): FrequencyEntry | undefined {
  return getFrequencyById(portal.frequencyId);
}
