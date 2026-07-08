import type { ChakraStats } from "@/lib/chakraStats";

/* ───────── TYPES ───────── */

export type AnalyticsSnapshot = {
  totalMinutes: number;
  totalSessions: number;
  activeChakra?: keyof ChakraStats;
};

/* ───────── ANALYTICS ───────── */

export function buildAnalytics(
  chakraStats: ChakraStats
): AnalyticsSnapshot {
  let totalMs = 0;
  let totalSessions = 0;

  let topChakra:
    | { name: keyof ChakraStats; ms: number }
    | undefined;

  const entries = Object.entries(chakraStats) as [
    keyof ChakraStats,
    ChakraStats[keyof ChakraStats]
  ][];

  for (const [chakra, data] of entries) {
    totalMs += data.timeMs;
    totalSessions += data.sessions;

    if (!topChakra || data.timeMs > topChakra.ms) {
      topChakra = { name: chakra, ms: data.timeMs };
    }
  }

  return {
    totalMinutes: Math.round(totalMs / 60000),
    totalSessions,
    activeChakra: topChakra?.name,
  };
}
