// lib/sessionCodes.ts

import { signPayload, verifyPayload } from "./signSession";
import type { SessionPayload } from "@/hooks/useSessionEngine";

const STORE_KEY = "rks3:sharedSessions";

/* ───────── TYPES ───────── */

type StoredCode = {
  data: string;
  sig: string;
  expiresAt: number;
};

/* ───────── HELPERS ───────── */

function loadStore(): Record<string, StoredCode> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return typeof parsed === "object" && parsed !== null
      ? parsed
      : {};
  } catch {
    return {};
  }
}

function saveStore(store: Record<string, StoredCode>) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      STORE_KEY,
      JSON.stringify(store)
    );
  } catch {
    // fail silently
  }
}

/* ───────── PUBLIC API ───────── */

/**
 * Create a short-lived share code for a session
 */
export function createSessionCode(
  session: SessionPayload,
  minutesValid = 60
): string {
  if (typeof window === "undefined") {
    throw new Error("Session codes require browser context");
  }

  const code =
    "RK3-" +
    crypto.randomUUID().slice(0, 6).toUpperCase();

  const expiresAt =
    Date.now() + minutesValid * 60 * 1000;

  const signed = signPayload(session, expiresAt);

  const store = loadStore();

  store[code] = {
    ...signed,
    expiresAt,
  };

  saveStore(store);

  return code;
}

/**
 * Resolve a share code back into a session
 * Returns null if invalid or expired
 */
export function resolveSessionCode(
  code: string
): SessionPayload | null {
  if (typeof window === "undefined") return null;

  try {
    const store = loadStore();
    const entry = store[code];

    if (!entry) return null;

    // hard expiration check
    if (Date.now() > entry.expiresAt) {
      delete store[code];
      saveStore(store);
      return null;
    }

    return verifyPayload(entry.data, entry.sig);
  } catch {
    return null;
  }
}

/**
 * Optional: clear all stored session codes
 */
export function clearSessionCodes() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORE_KEY);
  } catch {}
}
