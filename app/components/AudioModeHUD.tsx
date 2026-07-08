"use client";

import type { Brainwave } from "@/hooks/useBinauralEngine";
import type { AudioMode } from "@/hooks/useAudioMode";

const WAVES: Brainwave[] = [
  "delta",
  "theta",
  "alpha",
  "beta",
  "gamma",
];

export default function AudioModeHUD({
  mode,
  brainwave,
  setMode,
  setBrainwave,
}: {
  mode: AudioMode;
  brainwave: Brainwave;
  setMode: (m: AudioMode) => void;
  setBrainwave: (b: Brainwave) => void;
}) {
  return (
    <div className="fixed bottom-6 left-6 z-50 w-64 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl p-4">
      <div className="text-xs tracking-widest uppercase opacity-70 mb-3">
        Audio Mode
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-2 mb-3">
        {(["pure", "binaural"] as AudioMode[]).map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-3 py-1 text-xs rounded ${
              mode === m
                ? "bg-white text-black"
                : "border border-white/20"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Brainwave (only if binaural) */}
      {mode === "binaural" && (
        <div className="flex flex-wrap gap-2">
          {WAVES.map(w => (
            <button
              key={w}
              onClick={() => setBrainwave(w)}
              className={`px-2 py-1 text-[10px] rounded ${
                brainwave === w
                  ? "bg-indigo-400 text-black"
                  : "border border-white/20"
              }`}
            >
              {w}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
