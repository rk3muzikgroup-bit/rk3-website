"use client";

type PresenceStats = {
  total: number;
  grounding: number;
  reflecting: number;
  resting: number;
};

export default function PresenceBar({
  stats,
}: {
  stats: PresenceStats;
}) {
  return (
    <section className="flex flex-wrap items-center gap-6 text-sm text-white/70">
      <span>🫂 {stats.total} present</span>
      <span>🌿 {stats.grounding} grounding</span>
      <span>🧘 {stats.reflecting} reflecting</span>
      <span>🌙 {stats.resting} resting</span>
    </section>
  );
}
