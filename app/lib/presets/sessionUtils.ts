import type {
  Session,
  SessionStep,
  SessionPayload,
} from "./sessionTypes";

/* ─────────────────────────────
   TIME HELPERS
───────────────────────────── */

export function getSessionDuration(steps: SessionStep[]): number {
  return steps.reduce(
    (total, step) => total + (step.duration ?? 0),
    0
  );
}

export function formatMs(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

/* ─────────────────────────────
   SESSION DERIVERS
───────────────────────────── */

export function buildSessionPayload(
  session: Session,
  steps: SessionStep[]
): SessionPayload {
  return {
    id: session.id,
    title: session.title,
    steps,
  };
}

export function cloneSteps(
  steps: SessionStep[]
): SessionStep[] {
  return steps.map(step => ({
    ...step,
    id: crypto.randomUUID(),
  }));
}

/* ─────────────────────────────
   VALIDATION (SOFT, UI-SAFE)
───────────────────────────── */

export function isValidSessionPayload(
  payload: any
): payload is SessionPayload {
  if (!payload) return false;
  if (!Array.isArray(payload.steps)) return false;

  return payload.steps.every(
    (s: any) =>
      typeof s.duration === "number" &&
      s.duration > 0
  );
}

/* ─────────────────────────────
   METADATA HELPERS
───────────────────────────── */

export function extractChakras(
  steps: SessionStep[]
) {
  return Array.from(
    new Set(
      steps
        .map(s => s.chakra)
        .filter(Boolean)
    )
  );
}

export function extractBrainwaves(
  steps: SessionStep[]
) {
  return Array.from(
    new Set(
      steps
        .map(s => s.brainwave)
        .filter(Boolean)
    )
  );
}

/* ─────────────────────────────
   STEP POSITION HELPERS
───────────────────────────── */

export function getStepAtTime(
  steps: SessionStep[],
  elapsedMs: number
) {
  let acc = 0;

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    acc += step.duration;

    if (elapsedMs < acc) {
      return {
        step,
        index: i,
        stepElapsed:
          elapsedMs - (acc - step.duration),
      };
    }
  }

  return null;
}
