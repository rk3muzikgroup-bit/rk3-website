"use client";

import { useEffect, useRef, useState } from "react";
import type { TimelineMarker } from "@/lib/sessionTimeline";

type Props = {
  markers: TimelineMarker[];
  elapsedMs: number;
  totalMs: number;
  onSeek: (ms: number) => void;
  onScrubStart?: () => void;
  onScrubEnd?: () => void;
};

export default function SessionTimeline({
  markers,
  elapsedMs,
  totalMs,
  onSeek,
  onScrubStart,
  onScrubEnd,
}: Props) {
  const barRef = useRef<HTMLDivElement>(null);
  const seekRef = useRef(onSeek);

  const [scrubbing, setScrubbing] = useState(false);

  useEffect(() => {
    seekRef.current = onSeek;
  }, [onSeek]);

  if (!totalMs || totalMs <= 0) return null;

  const progress = Math.min(1, Math.max(0, elapsedMs / totalMs));

  function seekFromClientX(clientX: number) {
    const bar = barRef.current;
    if (!bar) return;

    const rect = bar.getBoundingClientRect();
    const x = Math.min(rect.width, Math.max(0, clientX - rect.left));
    seekRef.current((x / rect.width) * totalMs);
  }

  function extractClientX(
    e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent
  ) {
    if ("touches" in e && e.touches.length > 0) {
      return e.touches[0].clientX;
    }
    if ("changedTouches" in e && e.changedTouches.length > 0) {
      return e.changedTouches[0].clientX;
    }
    return (e as MouseEvent).clientX;
  }

  function handleDown(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault();
    setScrubbing(true);
    onScrubStart?.();
    seekFromClientX(extractClientX(e));
  }

  useEffect(() => {
    if (!scrubbing) return;

    function move(e: MouseEvent | TouchEvent) {
      e.preventDefault();
      seekFromClientX(extractClientX(e));
    }

    function up() {
      setScrubbing(false);
      onScrubEnd?.();
    }

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("touchend", up);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", up);
    };
  }, [scrubbing, onScrubEnd]);

  return (
    <div className="fixed bottom-6 left-1/2 z-40 w-[80vw] max-w-3xl -translate-x-1/2 rounded-xl border border-white/10 bg-black/80 backdrop-blur-xl px-4 py-3">
      {/* PROGRESS BAR */}
      <div
        ref={barRef}
        onMouseDown={handleDown}
        onTouchStart={handleDown}
        className="relative mb-3 h-1 cursor-pointer rounded bg-white/10"
      >
        <div
          className="absolute left-0 top-0 h-1 rounded bg-emerald-400"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* MARKERS */}
      <div className="flex gap-2 overflow-x-auto text-[10px]">
        {markers.map(m => {
          const active =
            elapsedMs >= m.startMs &&
            elapsedMs < m.startMs + m.durationMs;

          return (
            <button
              key={`${m.index}-${m.startMs}`}
              onClick={() => onSeek(m.startMs)}
              className={[
                "px-2 py-1 rounded border whitespace-nowrap transition",
                active
                  ? "bg-emerald-400 text-black border-transparent"
                  : "border-white/20 opacity-70 hover:bg-white/5",
              ].join(" ")}
            >
              {m.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
