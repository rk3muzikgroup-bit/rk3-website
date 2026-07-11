import type { Chakra } from "@/hooks/useAudioMixer";

/* ───────── TYPES ───────── */

export type ChakraStats = Record<
  Chakra,
  {
    timeMs: number;
    sessions: number;
  }
>;

/* ───────── FACTORY ───────── */

export function emptyChakraStats(): ChakraStats {
  return {
    root: { timeMs: 0, sessions: 0 },
    sacral: { timeMs: 0, sessions: 0 },
    solar: { timeMs: 0, sessions: 0 },
    heart: { timeMs: 0, sessions: 0 },
    throat: { timeMs: 0, sessions: 0 },
    thirdEye: { timeMs: 0, sessions: 0 },
    crown: { timeMs: 0, sessions: 0 },
  };
}

/* ───────── MUTATION (IMMUTABLE) ───────── */

export function addChakraTime(
  stats: ChakraStats,
  chakra: Chakra,
  durationMs: number
): ChakraStats {
  return {
    ...stats,
    [chakra]: {
      timeMs: stats[chakra].timeMs + durationMs,
      sessions: stats[chakra].sessions + 1,
    },
  };
}
