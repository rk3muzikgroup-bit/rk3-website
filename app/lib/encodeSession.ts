import type { SessionPayload } from "@/hooks/useSessionEngine";

/**
 * Encodes a session into a URL-safe base64 string
 * Used for share links, resume links, time intent, etc.
 */
export function encodeSession(session: SessionPayload): string {
  try {
    const json = JSON.stringify(session);
    const base64 = btoa(encodeURIComponent(json));
    return base64;
  } catch (err) {
    console.warn("Failed to encode session", err);
    return "";
  }
}

/**
 * Decodes a session from a URL-safe base64 string
 */
export function decodeSession(encoded: string): SessionPayload | null {
  try {
    const json = decodeURIComponent(atob(encoded));
    return JSON.parse(json) as SessionPayload;
  } catch (err) {
    console.warn("Failed to decode session", err);
    return null;
  }
}
