import type { SessionPayload } from "@/hooks/useSessionEngine";

const KEY = "rks3:generatedSession";

/**
 * Save a generated (one-off) session
 * Used for previews, builders, quick launches
 */
export function saveGeneratedSession(
  payload: SessionPayload
) {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(
      KEY,
      JSON.stringify(payload)
    );
  } catch {
    // quota / private mode — fail silently
  }
}

/**
 * Load last generated session
 */
export function loadGeneratedSession(): SessionPayload | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Clear generated session
 */
export function clearGeneratedSession() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(KEY);
  } catch {}
}
