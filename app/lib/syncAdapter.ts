import type { SyncEnvelope, SyncMode } from "./syncTypes";
import { getDeviceId } from "./device";

/**
 * Sync mode selector
 * - "local": localStorage only
 * - "cloud": future remote sync
 */
const SYNC_MODE: SyncMode = "local";

/* ───────── INTERNAL ───────── */

function safeParse<T>(raw: string | null): SyncEnvelope<T> | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null
      ? (parsed as SyncEnvelope<T>)
      : null;
  } catch {
    return null;
  }
}

/* ───────── PUBLIC API ───────── */

/**
 * Save payload wrapped in a sync envelope
 */
export function saveWithSync<T>(
  key: string,
  payload: T
) {
  if (typeof window === "undefined") return;

  const envelope: SyncEnvelope<T> = {
    payload,
    updatedAt: Date.now(),
    deviceId: getDeviceId(),
  };

  try {
    localStorage.setItem(
      key,
      JSON.stringify(envelope)
    );
  } catch {
    // quota / private mode — fail silently
  }

  if (SYNC_MODE === "cloud") {
    // 🔮 future: push envelope to server
  }
}

/**
 * Load payload from sync envelope
 */
export function loadWithSync<T>(
  key: string
): T | null {
  if (typeof window === "undefined") return null;

  const env = safeParse<T>(
    localStorage.getItem(key)
  );

  return env ? env.payload : null;
}
