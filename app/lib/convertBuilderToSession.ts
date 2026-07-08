import type { SessionPayload, SessionStep } from "@/hooks/useSessionEngine";
import type { BuilderStep } from "@/components/Session/SessionBuilder";

function generateSessionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `session_${Date.now()}`;
}

export function convertBuilderToSession(
  steps: BuilderStep[],
  meta?: { id?: string; title?: string }
): SessionPayload {
  const normalized: SessionStep[] = steps.map(step => ({
    id: step.id,
    voice: step.voice || undefined,
    caption: step.caption || undefined,
    duration: Math.max(1000, step.duration),
    chakra: step.chakra,
    brainwave: step.brainwave,
  }));

  return {
    id: meta?.id ?? generateSessionId(),
    title: meta?.title ?? "Custom Healing Session",
    steps: normalized,
    createdAt: Date.now(),
  };
}
