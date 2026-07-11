"use client";

import { useEffect, useState } from "react";
import { loadContinuum, type ContinuumState } from "@/lib/continuum";
import { getContinuumTier } from "@/lib/continuumTier";

export function useContinuum() {
  const [continuum, setContinuum] = useState<ContinuumState | null>(null);

  useEffect(() => {
    setContinuum(loadContinuum());
  }, []);

  return continuum;
}

export function useContinuumTier() {
  const continuum = useContinuum();
  if (!continuum) return null;

  return getContinuumTier(continuum);
}
