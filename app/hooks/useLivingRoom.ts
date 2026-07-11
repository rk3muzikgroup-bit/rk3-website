"use client";

import { useState } from "react";
import type { PresenceSnapshot, Reflection } from "@/lib/livingRoom";

export function useLivingRoom() {
  // TEMP mock state (safe)
  const [presence] = useState<PresenceSnapshot>({
    activeCount: 7,
    updatedAt: Date.now(),
  });

  const [reflections, setReflections] = useState<Reflection[]>([]);

  function submitReflection(text: string) {
    if (!text.trim()) return;

    setReflections(prev => [
      {
        id: crypto.randomUUID(),
        userId: "self",
        text,
        createdAt: Date.now(),
        expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 2, // 48h
      },
      ...prev,
    ]);
  }

  return {
    presence,
    reflections,
    submitReflection,
  };
}
