import type { Chakra } from "@/hooks/useAudioMixer";
import type { SessionPayload } from "@/hooks/useSessionEngine";

/* ───────── RUNTIME TYPES ───────── */

/**
 * Fully-resolved program day
 * (used at runtime when sessions are loaded)
 */
export type ProgramDay = {
  day: number;
  session: SessionPayload;
};

/**
 * Fully-resolved healing program
 * (runtime / playback representation)
 */
export type HealingProgram = {
  id: string;
  title: string;
  description?: string;
  days: ProgramDay[];
};

/* ───────── DEFINITION TYPES ───────── */

/**
 * Lightweight program step
 * (used in registries & generators)
 */
export type ProgramDayStep = {
  day: number;
  sessionId: string;
  chakra?: Chakra;
};

/**
 * Program definition
 * (source of truth for programs)
 */
export type Program = {
  id: string;
  title: string;
  durationDays: number;
  tags: string[];
  days: ProgramDayStep[];
};
