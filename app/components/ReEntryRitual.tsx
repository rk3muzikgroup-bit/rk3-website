"use client";

import { useEffect, useState } from "react";
import type { TimeScale } from "@/lib/scaleSession";

type SessionPayload = {
  title?: string;
  steps: any[];
};

const GENERATED_SESSION_KEY = "rks3:generatedSession";

type Props = {
  onResume: (session: SessionPayload, minutes: TimeScale) => void;
};

export default function ReEntryRitual({ onResume }: Props) {
  const [session, setSession] = useState<SessionPayload | null>(null);
  const [minutes, setMinutes] = useState<TimeScale>(7);
  const [resuming, setResuming] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(GENERATED_SESSION_KEY);
      if (!raw) return;

      const parsed = JSON.parse(raw) as SessionPayload;
      if (Array.isArray(parsed?.steps) && parsed.steps.length > 0) {
        setSession(parsed);
      }
    } catch {
      // corrupted storage → ignore silently
    }
  }, []);

  if (!session) return null;

  function handleResume() {
    if (resuming || !session) return;
    setResuming(true);
    onResume(session, minutes);
  }

  function handleDismiss() {
    setSession(null);
    // Optional but recommended: prevent repeat prompt
    localStorage.removeItem(GENERATED_SESSION_KEY);
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 backdrop-blur-md">
      <div className="w-[340px] rounded-xl border border-white/10 bg-black/90 p-6 text-center shadow-2xl">
        <div className="text-xs uppercase tracking-widest opacity-60 mb-2">
          Re-Entry Ritual
        </div>

        <div className="text-lg font-medium mb-1">
          Resume session?
        </div>

        <div className="text-sm opacity-70 mb-4">
          {session.title ?? "Custom Healing Session"}
        </div>

        {/* TIME SCALE */}
        <div className="flex justify-center gap-2 mb-4">
          {[3, 7, 11].map(m => (
            <button
              key={m}
              onClick={() => setMinutes(m as TimeScale)}
              className={`px-3 py-1 rounded text-xs transition ${
                minutes === m
                  ? "bg-emerald-400 text-black"
                  : "border border-white/20"
              }`}
            >
              {m} min
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleResume}
            disabled={resuming}
            className="flex-1 py-2 rounded bg-emerald-400 text-black text-sm font-medium disabled:opacity-60"
          >
            Begin
          </button>

          <button
            onClick={handleDismiss}
            className="flex-1 py-2 rounded border border-white/20 text-sm opacity-70 hover:opacity-100 transition"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
