"use client";

import { createContext, useContext, useMemo } from "react";
import { useSessionEngine } from "@/hooks/useSessionEngine";

type SessionContextType = {
  load: (session: {
    id: string;
    title: string;
    realm?: string;
  }) => void;

  play: (src?: string, title?: string) => void;
  pause: () => void;
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
    return {
      load(session) {
        // 🔮 reserved for future session routing / hydration
        // no-op for now (safe)
        console.log("[Session] loaded:", session);
      },

      play(src, title) {
        engine.play(src, title);
      },

      pause() {
        engine.pause();
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
