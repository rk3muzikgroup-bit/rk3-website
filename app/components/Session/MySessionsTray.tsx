"use client";

import { useInstalledSessions } from "@/hooks/useInstalledSessions";

export default function MySessionsTray() {
  const { installed } = useInstalledSessions();

  if (installed.length === 0) return null;

  return (
    <section>
      <h2 className="text-xs uppercase tracking-[0.25em] text-white/40 mb-4">
        Installed Sessions
      </h2>

      <div className="flex flex-wrap gap-3">
        {installed.map((s) => (
          <div
            key={s.id}
            className="
              rounded-full
              px-4
              py-1.5
              text-sm
              bg-white/[0.06]
              border border-white/15
            "
          >
            {s.title}
          </div>
        ))}
      </div>
    </section>
  );
}
