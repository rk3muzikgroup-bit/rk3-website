"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface PilotProfile {
  username: string;
  avatar: string;
  badgeNumber: number;
  portal: string;
  active?: boolean;
}

interface PilotContextType {
  pilot: PilotProfile | null;
  setPilot: (profile: PilotProfile | null) => void;
  logout: () => void;
  fleet: PilotProfile[];
}

const PilotContext = createContext<PilotContextType | undefined>(undefined);

export function PilotProvider({ children }: { children: ReactNode }) {
  const [pilot, setPilot] = useState<PilotProfile | null>(null);
  const [fleet, setFleet] = useState<PilotProfile[]>([]);

  // Load from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedPilot = localStorage.getItem("pilot");
      if (savedPilot) setPilot(JSON.parse(savedPilot));

      const savedFleet = localStorage.getItem("fleet");
      if (savedFleet) setFleet(JSON.parse(savedFleet));
    }
  }, []);

  // Save pilot + fleet
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (pilot) {
        localStorage.setItem("pilot", JSON.stringify(pilot));

        // ✅ Add to fleet if not already there
        setFleet((prev) => {
          const exists = prev.find((p) => p.badgeNumber === pilot.badgeNumber);
          if (!exists) {
            const updated = [...prev, { ...pilot, active: true }];
            localStorage.setItem("fleet", JSON.stringify(updated));
            return updated;
          }
          return prev;
        });
      }
    }
  }, [pilot]);

  const logout = () => {
    setPilot(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("pilot");
    }
  };

  return (
    <PilotContext.Provider value={{ pilot, setPilot, logout, fleet }}>
      {children}
    </PilotContext.Provider>
  );
}

export function usePilot() {
  const ctx = useContext(PilotContext);
  if (!ctx) throw new Error("usePilot must be used inside PilotProvider");
  return ctx;
}
