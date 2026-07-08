// lib/signSession.ts

/**
 * LOCAL SESSION SIGNER
 * --------------------
 * Deterministic, synchronous, non-cryptographic.
 * Used for short-lived, ethical sharing only.
 *
 * ⚠️ Not intended for security-critical use.
 * Later replace with server-backed signing if needed.
 */

const SECRET = "rk3-session-secret-v1"; // move to env / backend later

/* ───────── TYPES ───────── */

export type SignedPayload = {
  data: string;
  expiresAt: number;
  sig: string;
};

/* ───────── INTERNAL ───────── */

function hash(input: string): string {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = Math.imul(31, h) + input.charCodeAt(i);
  }
  return Math.abs(h).toString(36);
}

function signRaw(
  data: string,
  expiresAt: number
) {
  return hash(`${data}.${expiresAt}.${SECRET}`);
}

/* ───────── PUBLIC API ───────── */

/**
 * Sign a payload with an expiration timestamp
 */
export function signPayload<T>(
  payload: T,
  expiresAt: number
): SignedPayload {
  const data = JSON.stringify(payload);
  const sig = signRaw(data, expiresAt);

  return {
    data,
    expiresAt,
    sig,
  };
}

/**
 * Verify and decode a signed payload
 */
export function verifyPayload<T>(
  data: string,
  sig: string,
  expiresAt?: number
): T | null {
  try {
    if (
      typeof expiresAt === "number" &&
      Date.now() > expiresAt
    ) {
      return null;
    }

    const expected = signRaw(
      data,
      expiresAt ?? 0
    );

    if (expected !== sig) return null;

    return JSON.parse(data) as T;
  } catch {
    return null;
  }
}
