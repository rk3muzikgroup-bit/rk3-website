"use client";

type Props = {
  state: "idle" | "playing" | "paused" | "ended";
  stepIndex: number;
  totalSteps: number;
  elapsedMs: number;
  stepDurationMs?: number;
};

export default function StepProgressHUD({
  state,
  stepIndex,
  totalSteps,
  elapsedMs,
  stepDurationMs,
}: Props) {
  if (state !== "playing" && state !== "paused") return null;
  if (!stepDurationMs || stepDurationMs <= 0) return null;

  // ───────── CONFIG ─────────
  const RADIUS = 18;
  const STROKE = 4;
  const SIZE = 44;

  // ───────── SAFE CLAMPING ─────────
  const clampedElapsed = Math.min(
    Math.max(elapsedMs, 0),
    stepDurationMs
  );

  const progress = clampedElapsed / stepDurationMs;
  const circumference = 2 * Math.PI * RADIUS;
  const offset = circumference * (1 - progress);

  const remainingSec = Math.ceil(
    (stepDurationMs - clampedElapsed) / 1000
  );

  return (
    <div className="fixed bottom-6 left-6 z-[80] flex items-center gap-3 rounded-full border border-white/10 bg-black/80 px-3 py-2 backdrop-blur-xl shadow-lg">
      {/* Progress Ring */}
      <svg
        width={SIZE}
        height={SIZE}
        aria-hidden
      >
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          stroke="rgba(255,255,255,0.15)"
          strokeWidth={STROKE}
          fill="none"
        />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          stroke="rgb(52,211,153)" // emerald-400
          strokeWidth={STROKE}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
        />
      </svg>

      {/* Meta */}
      <div className="text-xs leading-tight">
        <div className="opacity-70">
          Step {stepIndex + 1} / {totalSteps}
        </div>
        <div className="font-medium">
          {remainingSec}s left
        </div>
      </div>
    </div>
  );
}
