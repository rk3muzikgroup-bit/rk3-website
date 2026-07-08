"use client";

import { useEffect, useState } from "react";

export type Reflection = {
  id: string;
  text: string;
  createdAt: number;
};

const STORAGE_KEY = "rks3:living-room:reflection";

export function useReflections() {
  const [reflection, setReflection] = useState<Reflection | null>(null);

  // Load on mount
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      setReflection(JSON.parse(raw));
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  function save(text: string) {
    const data: Reflection = {
      id: crypto.randomUUID(),
      text,
      createdAt: Date.now(),
    };

    setReflection(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function clear() {
    setReflection(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  return {
    reflection,
    save,
    clear,
  };
}
