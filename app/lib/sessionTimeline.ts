import type { SessionPayload } from "@/hooks/useSessionEngine";

export type TimelineMarker = {
  index: number;
  label: string;
  startMs: number;
  durationMs: number;
};

export function buildTimeline(
  session: SessionPayload
): TimelineMarker[] {
  if (!session?.steps?.length) return [];

  let acc = 0;

  return session.steps.map((step, i) => {
    const marker = {
      index: i,
      label: step.caption || `Step ${i + 1}`,
      startMs: acc,
      durationMs: step.duration,
    };

    acc += step.duration;
    return marker;
  });
}
