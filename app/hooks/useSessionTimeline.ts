"use client";

import { useRef, useState, useEffect } from "react";

type Props = {
  elapsedMs: number;
  totalMs: number;
  onSeek: (ms: number) => void;
};

export default function SessionTimeline({
  elapsedMs,
  totalMs,
  onSeek,
}: Props) {
  const barRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  if (totalMs <= 0) return null;

  // 🛡️ SAFETY CLAMP — prevents NaN / overflow
  const progress =
    totalMs > 0
      ? Math.min(1, Math.max(0, elapsedMs / totalMs))
      : 0;

  function seek(clientX: number) {
    if (!barRef.current) return;
    const rect = barRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    onSeek((x / rect.width) * totalMs);
  }

  useEffect(() => {
    if (!dragging) return;

    function move(e: MouseEvent) {
      seek(e.clientX);
    }

    function up() {
      setDragging(false);
    }

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, [dragging]);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[400px]">
      <div
        ref={barRef}
        onMouseDown={e => {
          setDragging(true);
          seek(e.clientX);
        }}
        className="h-2 bg-white/10 rounded cursor-pointer"
      >
        <div
          className="h-2 bg-emerald-400 rounded"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
