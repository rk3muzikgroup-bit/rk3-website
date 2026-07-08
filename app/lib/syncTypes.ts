/* ───────── SYNC + PROFILE TYPES ───────── */

import type { AudioMode } from "@/lib/audioMode";
import type { Chakra } from "@/hooks/useAudioMixer";

/* ───────── CHAKRA STATS ───────── */

export type ChakraStat = {
  timeMs: number;
  sessions: number;
};

export type ChakraStats = Record<Chakra, ChakraStat>;

/* ───────── PROFILE STATE ───────── */

/**
 * Persisted, syncable user profile state
 * (safe for local + future cloud sync)
 */
export type RK3ProfileState = {
  chakraStats: ChakraStats;

  activeProgramId?: string;
  programStartDate?: string;

  audioMode?: AudioMode;
};

/* ───────── SYNC ENVELOPE ───────── */

/**
 * Generic sync wrapper for any payload
 */
export type SyncEnvelope<T> = {
  payload: T;
  updatedAt: number;
  deviceId: string;
};

/* ───────── SYNC MODE ───────── */

export type SyncMode = "local" | "cloud";
