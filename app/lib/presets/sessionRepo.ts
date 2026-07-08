import type { Session, SessionVersion } from "./sessionTypes";

const SESSIONS_KEY = "rks3:sessions";
const VERSIONS_KEY = "rks3:sessionVersions";

/* ───────── STORAGE HELPERS ───────── */

function canUseStorage() {
  return typeof window !== "undefined" && !!window.localStorage;
}

function read<T>(key: string): T[] {
  if (!canUseStorage()) return [];
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
}

function write<T>(key: string, value: T[]) {
  if (!canUseStorage()) return;
  localStorage.setItem(key, JSON.stringify(value));
}

/* ───────── SESSION REPO ───────── */

export const sessionRepo = {
  /* -------- SESSIONS -------- */

  listSessions(): Session[] {
    return read<Session>(SESSIONS_KEY);
  },

  getSession(id: string): Session | undefined {
    return read<Session>(SESSIONS_KEY).find(s => s.id === id);
  },

  saveSession(session: Session) {
    const all = read<Session>(SESSIONS_KEY);

    // prevent duplicates
    if (all.some(s => s.id === session.id)) return;

    write(SESSIONS_KEY, [...all, session]);
  },

  updateSession(sessionId: string, patch: Partial<Session>) {
    const all = read<Session>(SESSIONS_KEY);
    write(
      SESSIONS_KEY,
      all.map(s =>
        s.id === sessionId ? { ...s, ...patch } : s
      )
    );
  },

  /* -------- VERSIONS -------- */

  addVersion(version: SessionVersion) {
    const all = read<SessionVersion>(VERSIONS_KEY);

    // prevent duplicate version ids
    if (all.some(v => v.id === version.id)) return;

    write(VERSIONS_KEY, [...all, version]);
  },

  listVersions(sessionId: string): SessionVersion[] {
    return read<SessionVersion>(VERSIONS_KEY)
      .filter(v => v.sessionId === sessionId)
      .sort((a, b) => a.version - b.version);
  },

  getActiveVersion(sessionId: string): SessionVersion | undefined {
    const session = this.getSession(sessionId);
    if (!session?.activeVersionId) return undefined;

    return read<SessionVersion>(VERSIONS_KEY).find(
      v => v.id === session.activeVersionId
    );
  },

  /* -------- PUBLISH -------- */

  publish(sessionId: string, versionId: string) {
    const all = read<Session>(SESSIONS_KEY);

    write(
      SESSIONS_KEY,
      all.map(s =>
        s.id === sessionId
          ? {
              ...s,
              activeVersionId: versionId,
              publishedAt: Date.now(),
            }
          : s
      )
    );
  },
};
