"use client";

import type { AnalyticsSnapshot } from "@/lib/analytics";

export default function AnalyticsHUD({
  data,
}: {
  data: AnalyticsSnapshot;
}) {
  return (
    <div className="fixed top-24 left-6 z-50 w-64 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl p-4">
      <div className="text-sm tracking-widest uppercase mb-2 opacity-70">
        Analytics
      </div>

      <div className="space-y-2 text-xs opacity-80">
        <div className="flex justify-between">
          <span>Total Minutes</span>
          <span>{data.totalMinutes}</span>
        </div>

        <div className="flex justify-between">
          <span>Total Sessions</span>
          <span>{data.totalSessions}</span>
        </div>

        {data.activeChakra && (
          <div className="flex justify-between">
            <span>Active Chakra</span>
            <span className="capitalize">
              {data.activeChakra.replace("_", " ")}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
