import { loadRecentSessions } from "@/lib/recentSessions";
import { loadFavorites } from "@/lib/favoriteSessions";
import type { Chakra } from "@/hooks/useAudioMixer";

export type HealingStats = {
  totalMinutes: number;
  sessionCount: number;
  chakraCounts: Partial<Record<Chakra, number>>;
  topPinned?: string;
};

/**
 * Compute aggregate healing usage stats
 * Safe, backward-compatible, future-ready
 */
export function computeHealingStats(): HealingStats {
  const recent = loadRecentSessions();
  const favorites = loadFavorites();

  let totalMinutes = 0;
  const chakraCounts: Partial<Record<Chakra, number>> = {};

  recent.forEach(session => {
    totalMinutes += session.minutes ?? 0;

    /**
     * CURRENT STRATEGY:
     * - Infer chakra from title (legacy)
     * FUTURE:
     * - Pull from session.steps[].chakra
     */
    const match = session.title
      ?.toLowerCase()
      ?.match(
        /(root|sacral|solar|heart|throat|third_eye|crown)/
      );

    if (match) {
      const chakra = match[1] as Chakra;
      chakraCounts[chakra] =
        (chakraCounts[chakra] ?? 0) + 1;
    }
  });

  return {
    totalMinutes,
    sessionCount: recent.length,
    chakraCounts,
    topPinned: favorites[0]?.title,
  };
}
