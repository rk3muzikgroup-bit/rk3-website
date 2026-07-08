"use client";

/**
 * Silent background cleanup for expired or stale session data
 * Runs once on client mount
 */

import { useEffect } from "react";

const SHARE_PREFIX = "rks3:share:";
const GENERATED_SESSION_KEY = "rks3:generatedSession";
const BUILDER_KEY = "rks3:sessionBuilder";
const DISMISS_KEY = "rks3:reentryDismissed";

const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 3; // 3 days
const DISMISS_RESET_MS = 1000 * 60 * 60 * 24; // 24h

export function useSessionCleanup() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const now = Date.now();

      /* ───────── SHARED SESSIONS ───────── */
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key) continue;

        if (key.startsWith(SHARE_PREFIX)) {
          const raw = localStorage.getItem(key);
          if (!raw) continue;

          try {
            const parsed = JSON.parse(raw);
            if (parsed?.expiresAt && now > parsed.expiresAt) {
              localStorage.removeItem(key);
            }
          } catch {
            localStorage.removeItem(key);
          }
        }
      }

      /* ───────── GENERATED SESSION ───────── */
      const rawSession =
        localStorage.getItem(GENERATED_SESSION_KEY);
      if (rawSession) {
        try {
          const parsed = JSON.parse(rawSession);
          if (
            parsed?.createdAt &&
            now - parsed.createdAt > MAX_AGE_MS
          ) {
            localStorage.removeItem(GENERATED_SESSION_KEY);
          }
        } catch {
          localStorage.removeItem(GENERATED_SESSION_KEY);
        }
      }

      /* ───────── BUILDER STATE ───────── */
      const rawBuilder =
        localStorage.getItem(BUILDER_KEY);
      if (rawBuilder) {
        try {
          const parsed = JSON.parse(rawBuilder);
          if (
            parsed?.updatedAt &&
            now - parsed.updatedAt > MAX_AGE_MS
          ) {
            localStorage.removeItem(BUILDER_KEY);
          }
        } catch {
          localStorage.removeItem(BUILDER_KEY);
        }
      }

      /* ───────── REENTRY DISMISS RESET ───────── */
      const dismissed =
        localStorage.getItem(DISMISS_KEY);
      if (dismissed) {
        try {
          const parsed = JSON.parse(dismissed);
          if (
            parsed?.dismissedAt &&
            now - parsed.dismissedAt > DISMISS_RESET_MS
          ) {
            localStorage.removeItem(DISMISS_KEY);
          }
        } catch {
          // invalid data → reset
          localStorage.removeItem(DISMISS_KEY);
        }
      }
    } catch {
      // Never block app
    }
  }, []);
}
