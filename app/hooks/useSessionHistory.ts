// app/hooks/useSessionHistory.ts

"use client";

import { useEffect, useState } from "react";
import {
  getHistory,
  toggleFavorite,
  SessionHistoryItem,
} from "@/lib/sessionHistory";

export function useSessionHistory() {
  const [items, setItems] =
    useState<SessionHistoryItem[]>([]);

  function refresh() {
    setItems(getHistory());
  }

  function toggle(id: string) {
    toggleFavorite(id);
    refresh();
  }

  useEffect(() => {
    refresh();
  }, []);

  return {
    items,
    refresh,
    toggleFavorite: toggle,
    favorites: items.filter(i => i.favorite),
  };
}
