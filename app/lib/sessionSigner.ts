/* ───────── SESSION SIGNER ───────── */

/**
 * NOTE:
 * This is a LOCAL signer only.
 * Not cryptographically secure.
 * Designed for short-lived, ethical sharing.
 */

const SECRET = "rks3_local_secret_v1"; // later → env / backend

export type SignedPayload = {
  data: string;
  expiresAt: number;
  sig: string;
};

/* ───────── HELPERS ───────── */

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
 * Sign a payload with expiration
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
  sig: string
): T | null {
  try {
    const parsed = JSON.parse(data) as T;

    // NOTE: expiration is checked by caller
    const expected = signRaw(
      data,
      (parsed as any)?.expiresAt ?? 0
    );

    if (expected !== sig) return null;

    return parsed;
  } catch {
    return null;
  }
}
