"use client";

import { useEffect } from "react";
import { useReVersePlayer } from "@/hooks/useReVersePlayer";

export default function ReVersePlayer() {
  const { asset, playing, play, pause, stop } = useReVersePlayer();

  // Ensure audio is stopped if HUD unmounts
  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  if (!asset) return null;

  return (
    <div className="fixed right-6 bottom-6 z-40 w-[320px] rounded-xl border border-white/10 bg-black/80 backdrop-blur-xl p-4">
      <div className="text-xs uppercase tracking-widest opacity-60 mb-1">
        ReVerse Player
      </div>

      <div className="text-sm font-medium mb-3 truncate">
        {asset.title}
      </div>

      <div className="flex gap-2">
        {!playing ? (
          <button
            onClick={play}
            className="flex-1 rounded bg-emerald-400 py-2 text-sm font-medium text-black transition hover:brightness-105"
          >
            Play
          </button>
        ) : (
          <button
            onClick={pause}
            className="flex-1 rounded bg-yellow-400 py-2 text-sm font-medium text-black transition hover:brightness-105"
          >
            Pause
          </button>
        )}

        <button
          onClick={stop}
          className="rounded border border-white/20 px-3 py-2 text-sm opacity-70 hover:opacity-100 transition"
        >
          Stop
        </button>
      </div>
    </div>
  );
}
