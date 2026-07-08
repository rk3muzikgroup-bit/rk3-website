import type { SessionPayload } from "@/hooks/useSessionEngine";

const KEY = "rks3:session";
const TTL = 1000 * 60 * 60 * 24; // 24 hours

/* ───────── TYPES ───────── */

type StoredSession = {
  payload: SessionPayload;
  createdAt: number;
  lastActiveAt: number;
};

/* ───────── SAVE ───────── */

/**
 * Save active session snapshot
 */
export function saveSession(
  payload: SessionPayload
) {
  if (typeof window === "undefined") return;

  const record: StoredSession = {
    payload,
    createdAt: Date.now(),
    lastActiveAt: Date.now(),
  };

  try {
    localStorage.setItem(
      KEY,
      JSON.stringify(record)
    );
  } catch {
    // quota / private mode — fail silently
  }
}

/* ───────── LOAD ───────── */

/**
 * Load last active session (TTL-bound)
 */
export function loadSession(): SessionPayload | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as StoredSession;

    if (
      !parsed?.payload ||
      typeof parsed.createdAt !== "number"
    ) {
      return null;
    }

    // TTL check
    if (Date.now() - parsed.createdAt > TTL) {
      localStorage.removeItem(KEY);
      return null;
    }

    // touch lastActiveAt
    parsed.lastActiveAt = Date.now();
    localStorage.setItem(
      KEY,
      JSON.stringify(parsed)
    );

    return parsed.payload;
  } catch {
    return null;
  }
}

/* ───────── CLEAR ───────── */

/**
 * Clear stored session
 */
export function clearSession() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(KEY);
  } catch {}
}
