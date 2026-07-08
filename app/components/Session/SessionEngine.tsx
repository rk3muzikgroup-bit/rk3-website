"use client";

import { useEffect, useMemo } from "react";
import { useSession } from "@/hooks/useSessionEngine";
import { buildTimeline } from "@/lib/sessionTimeline";

/* ───────── UI ───────── */
import SessionControls from "./SessionControls";
import SessionTimeline from "./SessionTimeline";

/**
 * Props for central engine
 */
type Props = {
  sessionId?: string;
  session?: any; // loose UI-layer typing intentional
  timeIntentMs: number | null;
};

export default function SessionEngine({
  sessionId,
  session,
  timeIntentMs,
}: Props) {
  const engine = useSession();

  /* ───────────── LOAD SESSION ───────────── */
  useEffect(() => {
    if (session) {
      engine.load(session);
    } else if (sessionId) {
      engine.load(sessionId);
    }
  }, [sessionId, session, engine]);

  /* ───────────── APPLY TIME INTENT ───────────── */
  useEffect(() => {
    if (!engine.session) return;
    if (timeIntentMs === null || timeIntentMs < 0) return;
    if (engine.timeIntentApplied) return;

    engine.seek(timeIntentMs);
    engine.pause();

    // modern API – trace already shows this pattern
    engine.markTimeIntentApplied();
  }, [engine.session?.id, timeIntentMs, engine.timeIntentApplied, engine]);

  /* ───────────── MARKERS ───────────── */
  const markers = useMemo(() => {
    return engine.session ? buildTimeline(engine.session) : [];
  }, [engine.session]);

  /* ───────────── RENDER ───────────── */
  if (!engine.session) return null;

  return (
    <div className="session-engine">
      <SessionControls
        state={engine.state}
        elapsedMs={engine.elapsed}
        session={engine.session}
        onPlay={engine.play}
        onPause={engine.pause}
      />

      <SessionTimeline
        markers={markers}
        elapsedMs={engine.elapsed}
        totalMs={engine.totalDuration}
        onSeek={engine.seek}
      />
    </div>
  );
}
