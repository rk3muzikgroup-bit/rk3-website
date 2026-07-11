const SALT = "rks3-healing-v1";

/* ───────── STABLE STRINGIFY ───────── */

function stableStringify(obj: any): string {
  if (obj === null || typeof obj !== "object") {
    return JSON.stringify(obj);
  }

  if (Array.isArray(obj)) {
    return `[${obj.map(stableStringify).join(",")}]`;
  }

  const keys = Object.keys(obj).sort();
  return `{${keys
    .map(k => `${JSON.stringify(k)}:${stableStringify(obj[k])}`)
    .join(",")}}`;
}

/* ───────── BASE64URL (SAFE) ───────── */

function toBase64Url(bytes: Uint8Array) {
  return btoa(
    String.fromCharCode(...bytes)
  )
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/* ───────── SIGN ───────── */

export async function signSession(payload: object) {
  const normalized = stableStringify(payload);
  const text = `${normalized}|${SALT}`;

  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", data);

  return toBase64Url(new Uint8Array(hash));
}

/* ───────── VERIFY ───────── */

function constantTimeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;

  let diff = 0;

  for (let i = 0; i < a.length; i += 1) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return diff === 0;
}

export async function verifySession(
  payload: object,
  signature: string
) {
  const expected = await signSession(payload);
  return constantTimeEqual(expected, signature);
}
