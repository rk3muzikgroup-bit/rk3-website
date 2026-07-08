"use client";

import { PROGRAMS } from "@/lib/programs";

type Props = {
  activeProgramId?: string;
  onLaunchToday: () => void;
};

export default function ProgramHUD({
  activeProgramId,
  onLaunchToday,
}: Props) {
  const active = activeProgramId
    ? Object.values(PROGRAMS).find(
        (p: { id: string }) => p.id === activeProgramId
      )
    : null;

  if (!active) return null;

  return (
    <div className="fixed bottom-24 left-6 z-50 w-80 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl p-4">
      <div className="text-xs tracking-widest uppercase mb-2 opacity-70">
        Active Program
      </div>

      <div className="text-lg font-semibold mb-1">
        {active.title}
      </div>

      <button
        onClick={onLaunchToday}
        className="mt-3 w-full bg-indigo-500 text-black text-sm py-2 rounded"
      >
        Start Today
      </button>
    </div>
  );
}
