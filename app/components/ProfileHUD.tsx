"use client";

import HUDFade from "./ui/HUDFade";
import type { ChakraStats } from "@/lib/chakraStats";

const CHAKRA_ORDER = [
  "root",
  "sacral",
  "solar",
  "heart",
  "throat",
  "thirdEye",
  "crown",
] as const;

export default function ProfileHUD({
  name,
  chakraStats,
}: {
  name: string;
  chakraStats: ChakraStats;
}) {
  const hasData = Object.values(chakraStats).some(
    c => c.sessions > 0 || c.timeMs > 0
  );

  return (
    <HUDFade show={true} delay={100}>
      <div className="fixed top-24 right-6 z-50 w-64 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl p-4">
        {/* NAME */}
        <div className="text-sm tracking-widest uppercase mb-3 opacity-70">
          {name}
        </div>

        {/* STATS */}
        {!hasData ? (
          <div className="text-xs opacity-50 italic">
            No chakra activity yet
          </div>
        ) : (
          <div className="space-y-1">
            {CHAKRA_ORDER.map(chakra => {
              const data = chakraStats[chakra];
              if (!data) return null;

              return (
                <div
                  key={chakra}
                  className="flex justify-between text-xs opacity-80"
                >
                  <span className="capitalize">
                    {chakra.replace("_", " ")}
                  </span>
                  <span>
                    {Math.round(data.timeMs / 60000)}m · {data.sessions}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </HUDFade>
  );
}
