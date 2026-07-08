/* ───────── SHARE SESSION (ALIAS) ───────── */

import type { SessionPayload } from "@/hooks/useSessionEngine";
import {
  createSessionCode,
  resolveSessionCode,
} from "@/lib/sessionCodes";

/**
 * Create a signed, expiring share code for a session
 * (delegates to canonical sessionCodes system)
 */
export function createShareCode(
  session: SessionPayload,
  ttlMinutes = 60
): string {
  return createSessionCode(session, ttlMinutes);
}

/**
 * Decode a share code back into a session
 */
export function decodeShareCode(
  code: string
): SessionPayload | null {
  return resolveSessionCode(code);
}
