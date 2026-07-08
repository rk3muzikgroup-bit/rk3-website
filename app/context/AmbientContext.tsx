"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

type AmbientState = {
  isEnabled: boolean;
  setEnabled: (v: boolean) => void;
  duck: () => void;
  unduck: () => void;
};

const AmbientContext = createContext<AmbientState | null>(null);

export function AmbientProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isEnabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!audioRef.current) {
      const a = new Audio("/sounds/ambient/cosmic_pad.wav");
      a.loop = true;
      a.volume = 0.2;
      audioRef.current = a;
    }
  }, []);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    if (isEnabled) {
      a.play().catch(() => {});
    } else {
      a.pause();
    }
  }, [isEnabled]);

  function duck() {
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0.08;
  }

  function unduck() {
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0.2;
  }

  return (
    <AmbientContext.Provider value={{ isEnabled, setEnabled, duck, unduck }}>
      {children}
    </AmbientContext.Provider>
  );
}

export function useAmbient() {
  const ctx = useContext(AmbientContext);
  if (!ctx) throw new Error("useAmbient must be used inside AmbientProvider");
  return ctx;
}
