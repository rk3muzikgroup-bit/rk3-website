"use client";

import { useState } from "react";
import type { Brainwave } from "@/hooks/useBinauralEngine";

export type AudioMode = "pure" | "binaural";

export function useAudioMode() {
  const [mode, setMode] = useState<AudioMode>("pure");
  const [brainwave, setBrainwave] = useState<Brainwave>("theta");

  return {
    mode,
    setMode,
    brainwave,
    setBrainwave,
  };
}
