"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type EQContextType = {
  bass: number;
  mid: number;
  treble: number;
  setBass: (v: number) => void;
  setMid: (v: number) => void;
  setTreble: (v: number) => void;
};

const EQContext = createContext<EQContextType | null>(null);

export function EQProvider({ children }: { children: ReactNode }) {
  const [bass, setBass] = useState(0);
  const [mid, setMid] = useState(0);
  const [treble, setTreble] = useState(0);

  return (
    <EQContext.Provider value={{ bass, setBass, mid, setMid, treble, setTreble }}>
      {children}
    </EQContext.Provider>
  );
}

export function useEQ() {
  const ctx = useContext(EQContext);
  if (!ctx) throw new Error("useEQ must be used inside EQProvider");
  return ctx;
}
