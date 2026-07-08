import type { SessionPayload } from "@/hooks/useSessionEngine";

/**
 * Scales a session to a target duration (ms)
 * while preserving step proportions.
 */
export function scaleSessionToDuration(
  session: SessionPayload,
  targetMs: number
): SessionPayload {
  if (!session.steps.length) return session;

  // guard against invalid targets
  const safeTargetMs = Math.max(1000, targetMs);

  const total = session.steps.reduce(
    (sum, step) => sum + step.duration,
    0
  );

  if (total <= 0) return session;

  const ratio = safeTargetMs / total;

  const scaledSteps = session.steps.map(step => ({
    ...step,
    duration: Math.max(
      1000, // engine minimum
      Math.round(step.duration * ratio)
    ),
  }));

  const minutes = Math.round(safeTargetMs / 60000);

  return {
    ...session,
    steps: scaledSteps,
    title: session.title
      ? stripDurationSuffix(session.title) +
        ` (${minutes} min)`
      : undefined,
  };
}

/**
 * Removes existing "(X min)" suffix to prevent duplication
 */
function stripDurationSuffix(title: string) {
  return title.replace(/\s*\(\d+\s*min\)\s*$/, "");
}
