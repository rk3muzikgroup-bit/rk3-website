"use client";

import { useCallback } from "react";

async function sendToAkashic(endpoint: string, data: any) {
  await fetch("/api/akashic", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ endpoint, ...data }),
  });
}

export function useAkashicLog(userId: string) {
  const startFlight = useCallback((chamber: string) => {
    sendToAkashic("startFlight", {
      userId,
      chamber,
      timestamp: new Date().toISOString(),
    });
  }, [userId]);

  const saveResonance = useCallback((label: string, type: string, path: string) => {
    sendToAkashic("saveResonance", {
      userId,
      label,
      type,
      path,
      savedAt: new Date().toISOString(),
    });
  }, [userId]);

  const engageEnergy = useCallback((label: string, type: string, path: string, duration: number) => {
    sendToAkashic("engageEnergy", {
      userId,
      label,
      type,
      path,
      duration,
      engagedAt: new Date().toISOString(),
    });
  }, [userId]);

  const endFlight = useCallback((duration: number) => {
    sendToAkashic("endFlight", {
      userId,
      duration,
      endedAt: new Date().toISOString(),
    });
  }, [userId]);

  return { startFlight, saveResonance, engageEnergy, endFlight };
}
