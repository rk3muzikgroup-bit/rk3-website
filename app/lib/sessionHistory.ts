// lib/sessionHistory.ts

import type { SessionPayload } from "@/hooks/useSessionEngine";

/* ───────── TYPES ───────── */

export type SessionHistoryItem = {
  id: string;
  title?: string;
  stepsCount: number;
  durationMs: number;
  createdAt: number;
  favorite?: boolean;
};

const KEY = "rks3:sessionHistory";
const MAX = 50;

/* ───────── INTERNAL ───────── */

function read(): SessionHistoryItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(items: SessionHistoryItem[]) {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    // fail silently
  }
}

/* ───────── PUBLIC API ───────── */

/**
 * Log a completed session to history
 */
export function logSession(
  payload: Pick<
    SessionPayload,
    "id" | "title" | "steps"
  >
) {
  const items = read();

  const durationMs = payload.steps.reduce(
    (sum, step) => sum + step.duration,
    0
  );

  const next: SessionHistoryItem = {
    id: crypto.randomUUID(),
    title: payload.title ?? "Healing Session",
    stepsCount: payload.steps.length,
    durationMs,
    createdAt: Date.now(),
    favorite: false,
  };

  write([next, ...items].slice(0, MAX));
}

/**
 * Toggle favorite flag on a history item
 */
export function toggleSessionHistoryFavorite(
  id: string
) {
  const items = read().map(item =>
    item.id === id
      ? { ...item, favorite: !item.favorite }
      : item
  );

  write(items);
}

/**
 * Get full session history
 */
export function getSessionHistory(): SessionHistoryItem[] {
  return read();
}

/**
 * Optional helper: clear session history
 */
export function clearSessionHistory() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(KEY);
  } catch {}
}
