const PROGRAM_PROGRESS_KEY = "rks3:programProgress";

/* ───────── TYPES ───────── */

export type ProgramProgress = {
  programId: string;
  currentDay: number;
  completedDays: number[];
  startedAt: number;
  lastPlayedAt?: number;
};

/* ───────── INTERNAL ───────── */

function loadAllProgress(): Record<string, ProgramProgress> {
  if (typeof window === "undefined") return {};

  try {
    const raw = localStorage.getItem(PROGRAM_PROGRESS_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return typeof parsed === "object" && parsed !== null
      ? parsed
      : {};
  } catch {
    return {};
  }
}

function saveAllProgress(
  all: Record<string, ProgramProgress>
) {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(
      PROGRAM_PROGRESS_KEY,
      JSON.stringify(all)
    );
  } catch {
    // quota / private mode — fail silently
  }
}

/* ───────── PUBLIC API ───────── */

export function loadProgramProgress(
  programId: string
): ProgramProgress | null {
  const all = loadAllProgress();
  return all[programId] ?? null;
}

export function saveProgramProgress(
  progress: ProgramProgress
) {
  const all = loadAllProgress();

  all[progress.programId] = {
    ...progress,
    lastPlayedAt: Date.now(),
  };

  saveAllProgress(all);
}

/**
 * Optional helper: clear a single program's progress
 */
export function clearProgramProgress(
  programId: string
) {
  const all = loadAllProgress();
  delete all[programId];
  saveAllProgress(all);
}

/**
 * Optional helper: clear all program progress
 */
export function clearAllProgramProgress() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(PROGRAM_PROGRESS_KEY);
  } catch {}
}
