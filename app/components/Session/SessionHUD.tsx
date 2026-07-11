"use client";

import { createSessionCode } from "@/lib/sessionCodes";
import { useSession } from "@/context/SessionContext";

export default function SessionHUD() {
  const {
    session,
    state,
    currentStep,
    play,
    pause,
    resume,
    stop,
  } = useSession();

  if (!session || state === "ended") return null;

  function shareSession() {
    if (typeof window === "undefined") return;
    if (!session) return;

    try {
      const code = createSessionCode(session, 60);
      const url = `${window.location.origin}/healing?code=${code}`;
      navigator.clipboard?.writeText(url);
    } catch {
      // fail silently — sharing is optional
    }
  }

  return (
    <div className="fixed right-6 top-24 z-40 w-[320px] rounded-xl border border-white/10 bg-black/80 backdrop-blur-xl p-4">
      <div className="text-xs uppercase tracking-widest opacity-60 mb-1">
        Session Engine
      </div>

      <div className="text-sm font-medium mb-2">
        {session.title ?? "Guided Session"}
      </div>

      <div className="text-xs opacity-70 mb-4">
        {currentStep?.caption ?? "Preparing…"}
      </div>

      <div className="flex gap-2">
        {state === "idle" && (
          <button
            onClick={() => play()}
            className="flex-1 rounded bg-emerald-400 py-2 text-sm font-medium text-black"
          >
            Start
          </button>
        )}

        {state === "playing" && (
          <button
            onClick={pause}
            className="flex-1 rounded bg-yellow-400 py-2 text-sm font-medium text-black"
          >
            Pause
          </button>
        )}

        {state === "paused" && (
          <button
            onClick={resume}
            className="flex-1 rounded bg-emerald-400 py-2 text-sm font-medium text-black"
          >
            Resume
          </button>
        )}

        <button
          onClick={stop}
          className="rounded border border-white/20 px-3 py-2 text-sm opacity-70"
          title="Stop session"
        >
          Stop
        </button>
      </div>

      {/* SHARE */}
      <button
        onClick={shareSession}
        className="mt-3 w-full text-xs tracking-widest uppercase border border-white/20 py-2 rounded hover:bg-white/5 transition"
      >
        Share Session
      </button>
    </div>
  );
}
