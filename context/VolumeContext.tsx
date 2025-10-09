"use client";

import React, { createContext, useContext, useState } from "react";

// types for the volume state
interface VolumeContextType {
  sfxVolume: number;      // one-shots (buttons, whooshes, etc.)
  ambientVolume: number;  // background ambients (hums, loops, etc.)
  muted: boolean;
  setSfxVolume: (v: number) => void;
  setAmbientVolume: (v: number) => void;
  toggleMute: () => void;
}

// context
const VolumeContext = createContext<VolumeContextType | undefined>(undefined);

export function VolumeProvider({ children }: { children: React.ReactNode }) {
  const [sfxVolume, setSfxVolume] = useState(0.8);       // punchy SFX
  const [ambientVolume, setAmbientVolume] = useState(0.25); // 0.2–0.3 sweet spot
  const [muted, setMuted] = useState(false);

  const toggleMute = () => setMuted((prev) => !prev);

  return (
    <VolumeContext.Provider
      value={{ sfxVolume, ambientVolume, muted, setSfxVolume, setAmbientVolume, toggleMute }}
    >
      {children}
    </VolumeContext.Provider>
  );
}

export function useVolume() {
  const ctx = useContext(VolumeContext);
  if (!ctx) throw new Error("useVolume must be used inside VolumeProvider");
  return ctx;
}

