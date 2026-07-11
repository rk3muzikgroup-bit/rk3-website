// app/lib/sessionPersistence.ts

import type { SessionPayload } from "@/hooks/useSessionEngine";

export const SESSION_PROGRESS_KEY = "rk3:lastSession";

export type PersistedSession = {
  session: SessionPayload;
  elapsedMs: number;
  state: "playing" | "paused";
  savedAt: number;
};

export function saveSessionProgress(data: PersistedSession) {
  try {
    localStorage.setItem(
      SESSION_PROGRESS_KEY,
      JSON.stringify(data)
    );
  } catch {}
}

export function loadSessionProgress(): PersistedSession | null {
  try {
    const raw = localStorage.getItem(SESSION_PROGRESS_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearSessionProgress() {
  try {
    localStorage.removeItem(SESSION_PROGRESS_KEY);
  } catch {}
}
