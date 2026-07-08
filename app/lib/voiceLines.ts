/* ───────── VOICE LINE TYPES ───────── */

/**
 * A single spoken or captioned line.
 *
 * Used by:
 * - VoiceCaption HUD
 * - Session steps
 * - Narration / DSP routing
 *
 * Duration is always in milliseconds.
 */
export type VoiceLine = {
  text: string;
  durationMs?: number;
};
