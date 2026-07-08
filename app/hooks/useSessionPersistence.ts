"use client";

/**
 * Session persistence observer
 *
 * NOTE:
 * Core persistence + restore logic lives INSIDE useSessionEngine.
 * This hook must NEVER load, seek, or play the engine.
 */

import { useEffect } from "react";
import type { SessionPayload } from "@/hooks/useSessionEngine";

const STORAGE_KEY = "rks3:engineSnapshot";

type Snapshot = {
  sessionId?: string;
  stepIndex: number;
  elapsed: number;
  state: "playing" | "paused" | "ended";
  savedAt: number;
};

type EngineAPI = {
  session: SessionPayload | null;
  stepIndex: number;
  elapsed: number;
  state: "idle" | "playing" | "paused" | "ended";
};

export function useSessionPersistence(engine: EngineAPI) {
  useEffect(() => {
    if (!engine.session) return;
    if (engine.state === "idle") return;

    try {
      const snapshot: Snapshot = {
        sessionId: engine.session.id,
        stepIndex: engine.stepIndex,
        elapsed: engine.elapsed,
        state: engine.state,
        savedAt: Date.now(),
      };

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(snapshot)
      );
    } catch {
      // never block engine
    }
  }, [
    engine.session,
    engine.stepIndex,
    engine.elapsed,
    engine.state,
  ]);
}
