// lib/continuum.ts

export type ContinuumState = {
  sessionsCompleted: number;
  daysVisited: number;
  reflectionsSaved: number;
  lastActiveAt: number;
};

const KEY = "rk3:continuum";

const EMPTY: ContinuumState = {
  sessionsCompleted: 0,
  daysVisited: 0,
  reflectionsSaved: 0,
  lastActiveAt: 0,
};

/* ───────── LOAD / SAVE ───────── */

export function loadContinuum(): ContinuumState {
  if (typeof window === "undefined") return EMPTY;

  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...EMPTY, ...JSON.parse(raw) } : EMPTY;
  } catch {
    return EMPTY;
  }
}

function save(state: ContinuumState) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

/* ───────── HELPERS ───────── */

function isNewDay(last: number) {
  if (!last) return true;

  const a = new Date(last);
  const b = new Date();

  return (
    a.getFullYear() !== b.getFullYear() ||
    a.getMonth() !== b.getMonth() ||
    a.getDate() !== b.getDate()
  );
}

/* ───────── SIGNALS ───────── */

export function signalSessionComplete() {
  const s = loadContinuum();

  const updated: ContinuumState = {
    ...s,
    sessionsCompleted: s.sessionsCompleted + 1,
    daysVisited:
      s.lastActiveAt && !isNewDay(s.lastActiveAt)
        ? s.daysVisited
        : s.daysVisited + 1,
    lastActiveAt: Date.now(),
  };

  save(updated);
}

export function signalReflectionSaved() {
  const s = loadContinuum();

  const updated: ContinuumState = {
    ...s,
    reflectionsSaved: s.reflectionsSaved + 1,
    lastActiveAt: Date.now(),
  };

  save(updated);
}
