"use client";

import { useEffect, useState, useCallback } from "react";
import {
  loadRecentSessions,
  type RecentSession,
} from "@/lib/recentSessions";

type Props = {
  onReplay: (id: string, minutes: 3 | 7 | 11) => void;
};

export default function RecentSessions({ onReplay }: Props) {
  const [sessions, setSessions] = useState<RecentSession[]>([]);

  const load = useCallback(() => {
    try {
      setSessions(loadRecentSessions());
    } catch {
      // corrupted or unavailable storage → fail silently
      setSessions([]);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (!sessions.length) return null;

  return (
    <div className="fixed left-6 bottom-24 z-40 w-80 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl p-4">
      <div className="text-xs tracking-widest uppercase opacity-60 mb-3">
        Recent Healing
      </div>

      <div className="space-y-2">
        {sessions.map(s => (
          <button
            key={`${s.id}-${s.timestamp}`}
            onClick={() => onReplay(s.id, s.minutes)}
            className="w-full text-left px-3 py-2 rounded border border-white/10 hover:bg-white/5 transition"
          >
            <div className="text-sm">{s.title}</div>
            <div className="text-[10px] opacity-60">
              {s.minutes} min ·{" "}
              {new Date(s.timestamp).toLocaleDateString()}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
