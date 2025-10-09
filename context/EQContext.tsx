"use client";

import React, { createContext, useContext, useState } from "react";

interface EQContextType {
  bands: number[]; // [low, lowMid, mid, highMid, high]
  setBand: (index: number, value: number) => void;
  resetEQ: () => void;
}

const EQContext = createContext<EQContextType | undefined>(undefined);

export function EQProvider({ children }: { children: React.ReactNode }) {
  const [bands, setBands] = useState<number[]>([0, 0, 0, 0, 0]); // default flat

  const setBand = (index: number, value: number) => {
    setBands((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const resetEQ = () => setBands([0, 0, 0, 0, 0]);

  return (
    <EQContext.Provider value={{ bands, setBand, resetEQ }}>
      {children}
    </EQContext.Provider>
  );
}

export function useEQ() {
  const ctx = useContext(EQContext);
  if (!ctx) throw new Error("useEQ must be used inside EQProvider");
  return ctx;
}
