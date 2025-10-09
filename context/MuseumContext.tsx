"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface MuseumContextType {
  collected: number;
  total: number;
  addArtifact: () => void;
  setTotal: (n: number) => void;
}

const MuseumContext = createContext<MuseumContextType | undefined>(undefined);

export function MuseumProvider({ children }: { children: ReactNode }) {
  const [collected, setCollected] = useState(0);
  const [total, setTotal] = useState(100); // default until backend sets real total

  // Example: fetch from backend
  useEffect(() => {
    async function fetchMuseumData() {
      try {
        const res = await fetch("/api/museum");
        const data = await res.json();
        setCollected(data.collected);
        setTotal(data.total);
      } catch (err) {
        console.error("Museum data fetch failed", err);
      }
    }
    fetchMuseumData();
  }, []);

  const addArtifact = () => {
    setCollected((prev) => Math.min(prev + 1, total));
  };

  return (
    <MuseumContext.Provider value={{ collected, total, addArtifact, setTotal }}>
      {children}
    </MuseumContext.Provider>
  );
}

export function useMuseum() {
  const ctx = useContext(MuseumContext);
  if (!ctx) throw new Error("useMuseum must be used within MuseumProvider");
  return ctx;
}
