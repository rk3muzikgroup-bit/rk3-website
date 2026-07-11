"use client";

type BreathWaveHUDProps = {
  phase?: string;
  level?: number;
};

export default function BreathWaveHUD({
  phase = "steady",
  level = 0.35,
}: BreathWaveHUDProps) {
  const safeLevel = Math.min(1, Math.max(0, level));
  const scale = 0.85 + safeLevel * 0.45;

  return (
    <div className="pointer-events-none fixed bottom-8 left-1/2 z-40 -translate-x-1/2">
      <div className="rounded-full border border-white/10 bg-black/50 px-5 py-3 text-center text-white/70 shadow-[0_0_40px_rgba(255,255,255,0.08)] backdrop-blur-xl">
        <div
          className="mx-auto mb-2 h-10 w-10 rounded-full bg-white/20 transition-transform duration-700"
          style={{ transform: `scale(${scale})` }}
          aria-hidden
        />
        <p className="text-[10px] uppercase tracking-[0.32em] text-white/45">
          Breath Wave
        </p>
        <p className="mt-1 text-xs capitalize text-white/70">{phase}</p>
      </div>
    </div>
  );
}
