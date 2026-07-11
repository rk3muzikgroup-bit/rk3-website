"use client";

import { useEffect, useMemo, useState } from "react";
import { useSessionEngine, type SessionPayload } from "@/hooks/useSessionEngine";
import { sessionRepo } from "@/lib/presets/sessionRepo";

/* ───────── UI ───────── */
import SessionControls from "./SessionControls";
import SessionTimeline from "./SessionTimeline";

/**
 * Props for central engine
 */
type Props = {
  sessionId?: string;
  session?: SessionPayload;
  timeIntentMs: number | null;
};

export default function SessionEngine({
  sessionId,
  session,
  timeIntentMs,
}: Props) {
  const engine = useSessionEngine();
  const [timeIntentApplied, setTimeIntentApplied] = useState(false);

  const resolvedSession = useMemo<SessionPayload | null>(() => {
    if (session) return session;

    if (!sessionId) return null;

    const savedSession = sessionRepo.getSession(sessionId);
    const activeVersion = sessionRepo.getActiveVersion(sessionId);

    if (!savedSession || !activeVersion) return null;

    return {
      id: savedSession.id,
      title: savedSession.title,
      intention: savedSession.intention,
      hasVoice: savedSession.hasVoice,
      tags: savedSession.tags,
      steps: activeVersion.flow,
      createdAt: savedSession.createdAt,
    };
  }, [sessionId, session]);

  /* ───────────── LOAD SESSION ───────────── */
  useEffect(() => {
    if (!resolvedSession) return;

    engine.load(resolvedSession);
    setTimeIntentApplied(false);
  }, [resolvedSession, engine.load]);

  /* ───────────── APPLY TIME INTENT ───────────── */
  useEffect(() => {
    if (!engine.session) return;
    if (timeIntentMs === null || timeIntentMs < 0) return;
    if (timeIntentApplied) return;

    engine.seek(timeIntentMs);
    engine.pause();
    setTimeIntentApplied(true);
  }, [
    engine.session,
    timeIntentMs,
    timeIntentApplied,
    engine.seek,
    engine.pause,
  ]);

  /* ───────────── RENDER ───────────── */
  if (!engine.session) return null;

  const state = engine.isRunning ? "playing" : "paused";

  return (
    <div className="session-engine">
      <SessionControls
        state={state}
        elapsedMs={engine.elapsed}
        session={engine.session}
        onPlay={() => engine.play()}
        onPause={engine.pause}
      />

      <SessionTimeline
        markers={engine.markers}
        elapsedMs={engine.elapsed}
        totalMs={engine.totalDuration}
        onSeek={engine.seek}
      />
    </div>
  );
}
