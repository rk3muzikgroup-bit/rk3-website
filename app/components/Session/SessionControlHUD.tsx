"use client";

import { Pause, Play, Square } from "lucide-react";

type Props = {
  state: "idle" | "playing" | "paused" | "ended";
  onPlay: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
};

export default function SessionControlsHUD({
  state,
  onPlay,
  onPause,
  onResume,
  onStop,
}: Props) {
  // No controls when nothing is active
  if (state === "idle" || state === "ended") return null;

  return (
    <div className="fixed bottom-6 right-6 z-[80] flex items-center gap-2 rounded-full border border-white/10 bg-black/80 px-4 py-2 backdrop-blur-xl shadow-lg">
      {/* PAUSE */}
      {state === "playing" && (
        <button
          onClick={onPause}
          aria-label="Pause session"
          title="Pause"
          className="rounded-full p-2 hover:bg-white/10 transition"
        >
          <Pause size={18} />
        </button>
      )}

      {/* RESUME */}
      {state === "paused" && (
        <button
          onClick={onResume}
          aria-label="Resume session"
          title="Resume"
          className="rounded-full p-2 hover:bg-white/10 transition"
        >
          <Play size={18} />
        </button>
      )}

      {/* STOP */}
      {(state === "playing" || state === "paused") && (
        <button
          onClick={onStop}
          aria-label="Stop session"
          title="Stop"
          className="rounded-full p-2 hover:bg-white/10 opacity-70 transition"
        >
          <Square size={18} />
        </button>
      )}
    </div>
  );
}
