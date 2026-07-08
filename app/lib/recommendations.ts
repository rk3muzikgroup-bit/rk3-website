import type { ChakraStats } from "./chakraStats";

export type Recommendation = {
  id: string;
  type: "session" | "program";
  reason: string;
};

/**
 * DS-3 tuned recommendation logic
 * - ethical
 * - explainable
 * - non-addictive
 */
export function recommendNext(
  stats: ChakraStats,
  activeProgramId?: string,
  excludeId?: string
): Recommendation | null {
  if (!stats || typeof stats !== "object") return null;

  const entries = Object.entries(stats).filter(
    ([, v]) => v && typeof v.timeMs === "number"
  );

  if (!entries.length) return null;

  // Find most-used chakra (dominant energy)
  const [dominantChakra] = entries.sort(
    (a, b) => b[1].timeMs - a[1].timeMs
  )[0];

  /**
   * Counter-balance map
   * (can be expanded later or made data-driven)
   */
  const balanceMap: Record<string, string> = {
    crown: "root",
    third_eye: "root",
    throat: "sacral",
    heart: "root",
    solar: "heart",
    sacral: "root",
    root: "heart",
  };

  const suggestedChakra =
    balanceMap[dominantChakra] ?? "root";

  /**
   * Program-aware logic (non-invasive)
   * If a program is active, we avoid overriding it
   */
  if (activeProgramId) {
    return {
      id: activeProgramId,
      type: "program",
      reason:
        "Continue your active program to maintain energetic continuity.",
    };
  }

  const rec: Recommendation = {
    id: `session_${suggestedChakra}`,
    type: "session",
    reason: `To balance recent ${dominantChakra.replace(
      "_",
      " "
    )} focus, a grounding ${suggestedChakra.replace(
      "_",
      " "
    )} session may help.`,
  };

  if (excludeId && rec.id === excludeId) return null;

  return rec;
}
