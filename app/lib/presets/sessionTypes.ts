import type { Chakra } from "@/hooks/useAudioMixer";

/* ─────────────────────────────
   CORE SESSION TYPES
───────────────────────────── */

export type SessionAccess = "public" | "member" | "private";

export type Session = {
  id: string;
  title: string;
  intention?: "calm" | "reset" | "focus" | "sleep" | "custom";
  hasVoice?: boolean;

  /** publishing */
  activeVersionId?: string;
  createdAt: number;
  publishedAt?: number;

  /** access */
  access?: SessionAccess;

  /** metadata */
  tags?: string[];
  guidance?: string;
};

/* ─────────────────────────────
   SESSION VERSION
───────────────────────────── */

export type SessionVersion = {
  id: string;
  sessionId: string;
  version: number;

  /** canonical flow */
  flow: SessionStep[];

  createdAt: number;
};

/* ─────────────────────────────
   SESSION STEP (ENGINE-READY)
───────────────────────────── */

export type SessionStep = {
  id: string;

  /** labels / UI */
  label?: string;
  caption?: string;

  /** audio */
  audioSrc?: string;
  voiceSrc?: string;

  /** timing */
  duration: number; // ms

  /** energetic metadata */
  chakra?: Chakra;
  brainwave?: "delta" | "theta" | "alpha" | "beta" | "gamma";
  mode?: "observer" | "healing" | "godmode" | "void";
};

/* ─────────────────────────────
   SESSION PAYLOAD (ENGINE INPUT)
───────────────────────────── */

export type SessionPayload = {
  id?: string;
  title?: string;
  steps: SessionStep[];
};
