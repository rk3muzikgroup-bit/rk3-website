type BadgeType =
  | "clinical"
  | "experimental"
  | "traditional"
  | "exploratory";

const BADGE_MAP: Record<
  BadgeType,
  { label: string; color: string; tooltip: string }
> = {
  clinical: {
    label: "Clinically Observed",
    color: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
    tooltip:
      "Observed within clinical or clinical-adjacent research contexts. This is not a medical claim.",
  },
  experimental: {
    label: "Experimentally Studied",
    color: "border-cyan-400/40 bg-cyan-400/10 text-cyan-300",
    tooltip:
      "Studied in laboratory or experimental settings. Correlations observed without clinical conclusions.",
  },
  traditional: {
    label: "Traditionally Documented",
    color: "border-amber-400/40 bg-amber-400/10 text-amber-300",
    tooltip:
      "Documented use within historical or cultural practices. Not validated by modern clinical research.",
  },
  exploratory: {
    label: "Exploratory / Emerging",
    color: "border-zinc-400/40 bg-zinc-400/10 text-zinc-300",
    tooltip:
      "Early-stage exploration or user-reported observation. Evidence remains non-conclusive.",
  },
};

export function ResearchBadges({ badges }: { badges: BadgeType[] }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {badges.map((key) => {
        const b = BADGE_MAP[key];
        return (
          <div
            key={key}
            className={`relative group rounded-full border px-3 py-1 text-xs ${b.color}`}
          >
            {b.label}
            <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 w-64 -translate-x-1/2 rounded-lg bg-black/90 p-2 text-[11px] text-white opacity-0 transition group-hover:opacity-100">
              {b.tooltip}
            </div>
          </div>
        );
      })}
    </div>
  );
}
