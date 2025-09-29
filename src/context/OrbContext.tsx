"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type OrbContextType = {
  enabled: boolean;
  enableOrbs: () => void;
};

const OrbContext = createContext<OrbContextType | undefined>(undefined);

export function OrbProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  const enableOrbs = () => setEnabled(true);

  return (
    <OrbContext.Provider value={{ enabled, enableOrbs }}>
      {children}
    </OrbContext.Provider>
  );
}

export function useOrbs() {
  const ctx = useContext(OrbContext);
  if (!ctx) throw new Error("useOrbs must be used inside OrbProvider");
  return ctx;
}
