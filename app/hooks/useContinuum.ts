"use client";

import { useContinuum } from "@/hooks/useContinuum";
import { getContinuumTier } from "@/lib/continuumTier";

export function useContinuumTier() {
  const c = useContinuum();
  if (!c) return null;
  return getContinuumTier(c);
}
