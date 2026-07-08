// app/lib/sessionHistory.ts

console.log("SOUL_SESSIONS:", SOUL_SESSIONS);

export type SessionHistoryItem = {
  id: string;
  title?: string;
  payload: any;
  stepsCount: number;
  durationMs: number;
  createdAt: number;
  favorite?: boolean;
};

const KEY = "rks3:sessionHistory";

/* -------------------------
   Internal helpers (safe)
-------------------------- */

function isClient() {
  return typeof window !== "undefined";
}

function read(): SessionHistoryItem[] {
  if (!isClient()) return [];

  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function write(items: SessionHistoryItem[]) {
  if (!isClient()) return;
  localStorage.setItem(KEY, JSON.stringify(items));
}

/* -------------------------
   Public API
-------------------------- */

export function logSession(payload: {
  id?: string;
  title?: string;
  steps: any[];
}) {
  if (!isClient()) return;

  const items = read();

  const durationMs = payload.steps.reduce(
    (sum, step) => sum + (step?.duration ?? 0),
    0
  );

  items.unshift({
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()}`,
    title: payload.title ?? "Healing Session",
    payload,
    stepsCount: payload.steps.length,
    durationMs,
    createdAt: Date.now(),
    favorite: false,
  });

  write(items.slice(0, 50));
}

export function toggleFavorite(id: string) {
  if (!isClient()) return;

  const items = read().map(item =>
    item.id === id
      ? { ...item, favorite: !item.favorite }
      : item
  );

  write(items);
}

export function getHistory(): SessionHistoryItem[] {
  return read();
}
