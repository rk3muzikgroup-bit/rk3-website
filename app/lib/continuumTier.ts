import type { ContinuumState } from "@/lib/continuum";
import type { ContinuumTier } from "@/lib/continuumThresholds";

export function getContinuumTier(
  c: ContinuumState
): ContinuumTier {
  if (c.sessionsCompleted >= 120 && c.daysVisited >= 45)
    return "embodied";

  if (c.sessionsCompleted >= 60 && c.daysVisited >= 25)
    return "integrated";

  if (c.sessionsCompleted >= 25 && c.daysVisited >= 12)
    return "steady";

  if (c.sessionsCompleted >= 5)
    return "rooted";

  return "seed";
}
