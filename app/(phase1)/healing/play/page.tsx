"use client";

import { useEffect, useMemo } from "react";
import { useSessionEngine } from "@/hooks/useSessionEngine";
import { SESSIONS } from "@/lib/sessions";
import SessionTimeline from "@/components/Session/SessionTimeline";

export default function PlayPage() {
  const engine = useSessionEngine();

  // 🔑 Pick ONE session for now (hard-coded on purpose)
  const session = useMemo(
    () => SESSIONS["heart_reset"],
    []
  );

  // Load once
  useEffect(() => {
    if (!session) return;
    engine.load(session);
  }, [session]);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-semibold">
        {session.title}
      </h1>

      {/* CONTROLS */}
      <div className="flex gap-4">
        {!engine.isRunning && (
          <button
            onClick={() => engine.play()}
            className="px-6 py-2 rounded bg-emerald-500 text-black"
          >
            Play
          </button>
        )}

        {engine.isRunning && (
          <button
            onClick={engine.pause}
            className="px-6 py-2 rounded bg-white/10"
          >
            Pause
          </button>
        )}
      </div>

      {/* TIMELINE */}
      <SessionTimeline
        markers={engine.markers}
        elapsedMs={engine.elapsed}
        totalMs={engine.totalDuration}
        onSeek={engine.seek}
      />
    </main>
  );
}
