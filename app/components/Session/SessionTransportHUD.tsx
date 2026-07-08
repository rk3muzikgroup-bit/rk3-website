"use client";

import { useMemo, useRef } from "react";
import type { SessionPayload } from "@/hooks/useSessionEngine";

type Props = {
  engine: {
    state: "idle" | "playing" | "paused" | "ended";
    elapsed: number;
    totalDuration: number;
    session: SessionPayload | null;
    play: () => void;
    pause: () => void;
    seek: (ms: number) => void;
    stop: () => void;
  };
};

function format(ms: number) {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, "0")}`;
}

export default function SessionTransportHUD({ engine }: Props) {
  const barRef = useRef<HTMLDivElement>(null);

  const progress = useMemo(() => {
    if (!engine.totalDuration) return 0;
    return Math.min(
      1,
      Math.max(0, engine.elapsed / engine.totalDuration)
    );
  }, [engine.elapsed, engine.totalDuration]);

  if (!engine.session) return null;

  function seekFromClientX(clientX: number) {
    if (!barRef.current) return;

    const rect = barRef.current.getBoundingClientRect();
    const x = Math.min(
      rect.width,
      Math.max(0, clientX - rect.left)
    );

    engine.seek((x / rect.width) * engine.totalDuration);
  }

  const isPlaying = engine.state === "playing";
  const isEnded = engine.state === "ended";

  return (
    <div className="fixed bottom-6 left-1/2 z-50 w-[420px] -translate-x-1/2 rounded-xl border border-white/10 bg-black/85 backdrop-blur-xl p-4 shadow-2xl">
      {/* TITLE */}
      <div className="mb-2 text-xs uppercase tracking-widest opacity-60 text-center">
        {engine.session.title ?? "Healing Session"}
      </div>

      {/* PROGRESS BAR */}
      <div
        ref={barRef}
        className="relative mb-3 h-2 w-full cursor-pointer rounded bg-white/10"
        onMouseDown={e => seekFromClientX(e.clientX)}
        onTouchStart={e =>
          seekFromClientX(e.touches[0].clientX)
        }
      >
        <div
          className="absolute left-0 top-0 h-full rounded bg-emerald-400 transition-[width]"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* CONTROLS */}
      <div className="flex items-center justify-between text-xs opacity-80">
        <div>
          {format(engine.elapsed)} /{" "}
          {format(engine.totalDuration)}
        </div>

        <div className="flex gap-2">
          {!isPlaying ? (
            <button
              onClick={engine.play}
              className="rounded bg-emerald-400 px-3 py-1 text-black"
            >
              {isEnded ? "↻ Replay" : "▶ Play"}
            </button>
          ) : (
            <button
              onClick={engine.pause}
              className="rounded border border-white/20 px-3 py-1"
            >
              ❚❚ Pause
            </button>
          )}

          <button
            onClick={engine.stop}
            className="rounded border border-white/20 px-3 py-1"
          >
            ⏹ Stop
          </button>
        </div>
      </div>
    </div>
  );
}
