"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { resolveShareCode } from "@/lib/sessionShare";
import type { SessionPayload } from "@/hooks/useSessionEngine";

/**
 * Auto-loads a shared session from ?share=CODE
 * Runs once per page load
 */
export function useSharedSession(
  load: (session: SessionPayload) => void,
  play?: () => void
) {
  const params = useSearchParams();
  const handledRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (handledRef.current) return;

    const share = params.get("share");
    if (!share) return;

    const session = resolveShareCode(share);
    if (!session) return;

    handledRef.current = true;

    load(session);

    // small delay so engine state settles
    if (play) {
      timeoutRef.current = window.setTimeout(() => {
        play();
      }, 150);
    }

    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
    // intentionally run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

}
