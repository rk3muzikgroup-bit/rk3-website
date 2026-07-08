// lib/sessionShare.ts

import type { SessionPayload } from "@/hooks/useSessionEngine";
import {
  createSessionCode,
  resolveSessionCode,
} from "@/lib/sessionCodes";

/**
 * Create a shareable code for a session
 * (alias to canonical sessionCodes system)
 */
export function createShareCode(
  session: SessionPayload,
  ttlMinutes = 60
): string {
  return createSessionCode(session, ttlMinutes);
}

/**
 * Resolve a share code back into a session
 */
export function resolveShareCode(
  code: string
): SessionPayload | null {
  return resolveSessionCode(code);
}
