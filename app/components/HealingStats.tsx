"use client";

import { useEffect, useState } from "react";
import {
  computeHealingStats,
  HealingStats,
} from "@/lib/healingStats";

/* ───────── HELPERS ───────── */

function formatLabel(label: string) {
  return label.replace("_", " ");
}

/* ───────── COMPONENT ───────── */

export default function HealingStatsPanel() {
  const [stats, setStats] = useState<HealingStats | null>(null);

  useEffect(() => {
    try {
      const result = computeHealingStats();
      setStats(result);
    } catch {
      // fail silently — never block the UI
      setStats(null);
    }
  }, []);

  if (!stats) return null;

  const hasChakraData =
    stats.chakraCounts &&
    Object.keys(stats.chakraCounts).length > 0;

  return (
    <div
      className="
        fixed right-6 bottom-24 z-40 w-80
        bg-black/80 backdrop-blur-xl
        border border-white/10 rounded-xl p-4
      "
      role="region"
      aria-label="Healing Statistics"
    >
      <div className="text-xs tracking-widest uppercase opacity-60 mb-3">
        Healing Overview
      </div>

      {/* CORE STATS */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Total time healed</span>
          <span>{stats.totalMinutes} min</span>
        </div>

        <div className="flex justify-between">
          <span>Sessions completed</span>
          <span>{stats.sessionCount}</span>
        </div>

        {stats.topPinned && (
          <div className="mt-2 text-xs opacity-70">
            Most returned to:
            <div className="mt-1 italic">
              {stats.topPinned}
            </div>
          </div>
        )}
      </div>

      {/* CHAKRA BREAKDOWN */}
      {hasChakraData && (
        <div className="mt-4">
          <div className="text-xs uppercase opacity-60 mb-2">
            Chakra Focus
          </div>

          <div className="space-y-1 text-xs">
            {Object.entries(stats.chakraCounts).map(
              ([chakra, count]) => (
                <div
                  key={chakra}
                  className="flex justify-between"
                >
                  <span className="capitalize">
                    {formatLabel(chakra)}
                  </span>
                  <span>{count}</span>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
