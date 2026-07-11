"use client";

import { createContext, useContext, useMemo } from "react";
import {
  useSessionEngine,
  type SessionPayload,
  type SessionStep,
} from "@/hooks/useSessionEngine";

type SessionState = "idle" | "playing" | "paused" | "ended";

type SessionContextType = {
  session: SessionPayload | null;
  state: SessionState;
  currentStep: SessionStep | null;
  elapsed: number;
  totalDuration: number;

  load: (session: SessionPayload) => void;
  play: (src?: string, title?: string) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  setVolume: (v: number) => void;
};

const SessionContext = createContext<SessionContextType | null>(null);

export function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const engine = useSessionEngine();

  const value = useMemo<SessionContextType>(() => {
    const state: SessionState = engine.isRunning
      ? "playing"
      : engine.session
      ? "paused"
      : "idle";

    return {
      session: engine.session,
      state,
      currentStep: engine.currentStep,
      elapsed: engine.elapsed,
      totalDuration: engine.totalDuration,

      load(session) {
        engine.load(session);
      },

      play(src, title) {
        engine.play(src, title);
      },

      pause() {
        engine.pause();
      },

      resume() {
        engine.play();
      },

      stop() {
        engine.stop();
      },

      setVolume(v: number) {
        engine.setVolume(v);
      },
    };
  }, [engine]);

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) {
    throw new Error("useSession must be used within SessionProvider");
  }
  return ctx;
}
