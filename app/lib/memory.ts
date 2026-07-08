const KEY = "rks3:memory";

/* ───────── TYPES ───────── */

export type AppMemory = {
  lastPortal?: string;
  lastSessionId?: string;
  volume?: number;
  resumeDismissed?: boolean;
};

/* ───────── LOAD ───────── */

export function loadMemory(): AppMemory {
  if (typeof window === "undefined") return {};

  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return typeof parsed === "object" && parsed !== null
      ? parsed
      : {};
  } catch {
    return {};
  }
}

/* ───────── SAVE ───────── */

export function saveMemory(
  update: Partial<AppMemory>
) {
  if (typeof window === "undefined") return;

  try {
    const current = loadMemory();
    const next: AppMemory = {
      ...current,
      ...update,
    };

    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // storage blocked / quota exceeded
  }
}

/* ───────── HELPERS (OPTIONAL) ───────── */

/**
 * Clear all app memory
 */
export function clearMemory() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(KEY);
  } catch {}
}
