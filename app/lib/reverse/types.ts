import type { Chakra } from "@/hooks/useAudioMixer";
import type { Brainwave } from "@/hooks/useBinauralEngine";

/* ─────────────────────────────
   SOURCE TYPES
───────────────────────────── */

export type ReVerseSource =
  | "frequency"
  | "builder"
  | "upload"
  | "external";

/* ─────────────────────────────
   CORE ASSET TYPE
───────────────────────────── */

export type ReVerseAsset = {
  id: string;
  title: string;
  source: ReVerseSource;

  /* AUDIO */
  audioUrl?: string;
  steps?: any[]; // builder / session-based remix

  /* MUSICAL META */
  durationMs?: number;
  bpm?: number;
  key?: string;

  /* ENERGY META */
  tags: string[];
  chakra?: Chakra;
  brainwave?: Brainwave;

  /* OWNERSHIP */
  creator: "rk3" | "user";
  remixable: boolean;

  /* TIMESTAMP */
  createdAt: number;
};
