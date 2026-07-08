export type RecentSession = {
  id: string;
  title: string;
  minutes: 3 | 7 | 11;
  timestamp: number;
};

const KEY = "rks3:recentSessions";
const MAX = 7;

/* ───────── INTERNAL ───────── */

function safeParse(
  raw: string | null
): RecentSession[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/* ───────── PUBLIC API ───────── */

export function loadRecentSessions(): RecentSession[] {
  if (typeof window === "undefined") return [];
  return safeParse(localStorage.getItem(KEY));
}

export function saveRecentSession(
  entry: RecentSession
) {
  if (typeof window === "undefined") return;

  try {
    const existing = loadRecentSessions();

    // remove duplicates by id + minutes
    const filtered = existing.filter(
      e =>
        !(
          e.id === entry.id &&
          e.minutes === entry.minutes
        )
    );

    const next = [
      {
        ...entry,
        timestamp: entry.timestamp ?? Date.now(),
      },
      ...filtered,
    ].slice(0, MAX);

    localStorage.setItem(
      KEY,
      JSON.stringify(next)
    );
  } catch {
    // never block app
  }
}

/**
 * Optional helper: clear recent history
 */
export function clearRecentSessions() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(KEY);
  } catch {}
}
