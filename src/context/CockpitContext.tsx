// src/context/CockpitContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface CockpitContextType {
  isOpen: boolean;
  toggle: () => void;
}

const CockpitContext = createContext<CockpitContextType | undefined>(undefined);

export function CockpitProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <CockpitContext.Provider value={{ isOpen, toggle }}>
      {children}
    </CockpitContext.Provider>
  );
}

export function useCockpit() {
  const ctx = useContext(CockpitContext);
  if (!ctx) throw new Error("useCockpit must be used within CockpitProvider");
  return ctx;
}
