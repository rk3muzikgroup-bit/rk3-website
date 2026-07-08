"use client";

import { useEffect, useState, useCallback } from "react";
import {
  loadFavorites,
  FavoriteSession,
} from "@/lib/favoriteSessions";

type Props = {
  onReplay: (id: string, minutes: 3 | 7 | 11) => void;
};

export default function FavoriteSessions({ onReplay }: Props) {
  const [favorites, setFavorites] = useState<FavoriteSession[]>([]);

  const refresh = useCallback(() => {
    try {
      const data = loadFavorites();
      setFavorites(Array.isArray(data) ? data : []);
    } catch {
      setFavorites([]);
    }
  }, []);

  /* ───────── LOAD + SYNC ───────── */
  useEffect(() => {
    refresh();

    // Sync across tabs / updates
    const onStorage = (e: StorageEvent) => {
      if (e.key?.startsWith("rks3:favorites")) {
        refresh();
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [refresh]);

  if (!favorites.length) return null;

  return (
    <div
      className="
        fixed left-6 bottom-52 z-40 w-80
        bg-black/85 backdrop-blur-xl
        border border-white/10 rounded-xl p-4
        pointer-events-auto
      "
      role="region"
      aria-label="Pinned rituals"
    >
      <div className="text-xs tracking-widest uppercase opacity-60 mb-3">
        Pinned Rituals
      </div>

      <div className="space-y-2">
        {favorites.map(f => (
          <button
            key={`${f.id}-${f.minutes}`}
            onClick={() => onReplay(f.id, f.minutes)}
            className="
              w-full text-left px-3 py-2 rounded
              border border-white/10
              hover:bg-white/5 transition
            "
          >
            <div className="text-sm leading-tight">
              {f.title}
            </div>
            <div className="text-[10px] opacity-60 mt-0.5">
              {f.minutes} min · pinned
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
