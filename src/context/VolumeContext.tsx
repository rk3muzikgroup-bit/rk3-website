"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type VolumeContextType = {
  muted: boolean;
  toggleMute: () => void;
};

const VolumeContext = createContext<VolumeContextType | undefined>(undefined);

export function VolumeProvider({ children }: { children: ReactNode }) {
  const [muted, setMuted] = useState(false);

  const toggleMute = () => setMuted((prev) => !prev);

  return (
    <VolumeContext.Provider value={{ muted, toggleMute }}>
      {children}
    </VolumeContext.Provider>
  );
}

export function useVolume() {
  const context = useContext(VolumeContext);
  if (!context) throw new Error("useVolume must be inside VolumeProvider");
  return context;
}
