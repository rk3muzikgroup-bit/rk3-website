"use client";

import SessionCard from "./SessionCard";
import { useInstalledSessions } from "@/hooks/useInstalledSessions";

export default function SessionLibrary() {
  const { installed, install } = useInstalledSessions();

  return (
    <section className="px-6 py-10">
      {/* TITLE */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">
          Marketplace
        </h2>
        <p className="text-sm text-white/60 mt-1">
          Curated healing sessions for alignment & clarity
        </p>
      </div>

      {/* GRID */}
      <div className="
        grid
        gap-6
        sm:grid-cols-2
        lg:grid-cols-3
      ">
        <SessionCard
          title="Heart Reset"
          subtitle="Coherence"
          description="A gentle heart-centered recalibration session."
          installed={installed.some(s => s.id === "heart-reset")}
          onInstall={() =>
            install({
              id: "heart-reset",
              title: "Heart Reset",
            })
          }
        />

        <SessionCard
          title="7-Day Heart Reset"
          subtitle="Daily Alignment"
          description="Daily heart work for emotional balance."
          installed={installed.some(s => s.id === "7day-heart")}
          onInstall={() =>
            install({
              id: "7day-heart",
              title: "7-Day Heart Reset",
            })
          }
        />
      </div>
    </section>
  );
}
