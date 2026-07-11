"use client";

import { Chakra } from "@/hooks/useAudioMixer";

/* ───────── CORE ENUM ───────── */

export type FrequencyType =
  | "pure"
  | "base-bath"
  | "binary"
  | "chain";

export type FrequencyRealm =
  | "chakra"
  | "solfeggio"
  | "cosmic"
  | "elemental"
  | "dna"
  | "astral"
  | "sleep"
  | "trauma"
  | "activation"
  | "god-mode"
  | "custom";

export type FrequencyBase = {
  id: string;
  label: string;
  type: FrequencyType;
  realms: FrequencyRealm[];
  chakra?: Chakra;
  description?: string;
};

/* ───────── SPECIALIZATIONS ───────── */

export type PureFrequency = FrequencyBase & {
  type: "pure";
  hz: number;
};

export type BaseBathFrequency = FrequencyBase & {
  type: "base-bath";
  layers: { hz: number; gain?: number; pan?: number }[];
};

export type BinaryFrequency = FrequencyBase & {
  type: "binary";
  leftHz: number;
  rightHz: number;
  carrierHz?: number;
};

export type ChainFrequency = FrequencyBase & {
  type: "chain";
  steps: { refId: string; durationMs: number }[];
};

export type FrequencyEntry =
  | PureFrequency
  | BaseBathFrequency
  | BinaryFrequency
  | ChainFrequency;

/* ───────── MASTER ───────── */

export const FREQUENCY_CATALOG = [
  {
    id: "pure-432",
    type: "pure",
    label: "432 Hz – Universal Harmony",
    realms: ["chakra", "cosmic"],
    hz: 432,
  },
  {
    id: "pure-528",
    type: "pure",
    label: "528 Hz – DNA Repair",
    realms: ["dna", "activation"],
    hz: 528,
  },
  {
    id: "bath-root-grounding",
    type: "base-bath",
    label: "Root Grounding Bath",
    realms: ["chakra", "trauma"],
    layers: [
      { hz: 174, gain: 0.6 },
      { hz: 396, gain: 0.4 },
    ],
  },
  {
    id: "binary-theta-sleep",
    type: "binary",
    label: "Theta Sleep Gate",
    realms: ["sleep", "astral"],
    leftHz: 100,
    rightHz: 106,
  },
  {
    id: "chain-chakra-ascent",
    type: "chain",
    label: "Chakra Ascent Journey",
    realms: ["chakra", "activation"],
    steps: [
      { refId: "pure-432", durationMs: 180_000 },
      { refId: "pure-528", durationMs: 180_000 },
    ],
  },
] as const satisfies readonly FrequencyEntry[];

/* ───────── HELPERS ───────── */

export const ALL_FREQUENCIES = [...FREQUENCY_CATALOG];

export function getFrequencyById(id: string) {
  return ALL_FREQUENCIES.find(f => f.id === id);
}

export function getFrequenciesByType(type: FrequencyType) {
  return ALL_FREQUENCIES.filter(f => f.type === type);
}

export function getFrequenciesByRealm(realm: FrequencyRealm) {
  return ALL_FREQUENCIES.filter(f =>
    (f.realms as readonly FrequencyRealm[]).includes(realm)
  );
}
