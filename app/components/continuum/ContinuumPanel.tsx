"use client";

import { useContinuum } from "@/hooks/useContinuum";

export default function ContinuumPanel() {
  const c = useContinuum();

  if (!c) return null;

  return (
    <section
      className="
        rounded-2xl
        border border-white/10
        bg-white/[0.03]
        backdrop-blur
        p-5
        space-y-4
      "
    >
      <header className="space-y-1">
        <h3 className="text-sm tracking-wide uppercase text-white/70">
          Personal Continuum
        </h3>
        <p className="text-xs text-white/40">
          Private signal of consistency and presence.
        </p>
      </header>

      <div className="grid grid-cols-3 gap-4 text-center">
        <Metric label="Sessions" value={c.sessionsCompleted} />
        <Metric label="Days" value={c.daysVisited} />
        <Metric label="Reflections" value={c.reflectionsSaved} />
      </div>
    </section>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="space-y-1">
      <div className="text-xl font-medium">{value}</div>
      <div className="text-[11px] uppercase tracking-widest text-white/40">
        {label}
      </div>
    </div>
  );
}
