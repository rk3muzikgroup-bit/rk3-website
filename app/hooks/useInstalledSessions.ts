"use client";

import { useEffect, useState } from "react";
import type { InstalledSession } from "@/lib/installedSessions";

const KEY = "rk3:installedSessions";

export function useInstalledSessions() {
  const [installed, setInstalled] = useState<InstalledSession[]>([]);

  // 🔄 Hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setInstalled(JSON.parse(raw));
    } catch {
      // silent fail — corrupted storage should not crash app
      setInstalled([]);
    }
  }, []);

  // 💾 Install only (no playback, no engine)
  function install(session: InstalledSession) {
    setInstalled((prev) => {
      if (prev.some((s) => s.id === session.id)) return prev;

      const next = [...prev, session];
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }

  return {
    installed,
    install,
  };
}
