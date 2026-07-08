"use client";

type Badge = {
  id: string;
  label: string;
  tone: "established" | "emerging" | "theoretical" | "anecdotal";
};

type Props = {
  badges: Badge[];
};

const TONE_STYLES: Record<Badge["tone"], string> = {
  established:
    "border-emerald-400/40 text-emerald-300 bg-emerald-400/5",
  emerging:
    "border-cyan-400/40 text-cyan-300 bg-cyan-400/5",
  theoretical:
    "border-indigo-400/40 text-indigo-300 bg-indigo-400/5",
  anecdotal:
    "border-amber-400/40 text-amber-300 bg-amber-400/5",
};

export default function BadgeRow({ badges }: Props) {
  if (!badges || badges.length === 0) return null;

  return (
    <section className="flex flex-wrap gap-3">
      {badges.map(badge => (
        <div
          key={badge.id}
          className={`
            rounded-full
            border
            px-3
            py-1
            text-[11px]
            tracking-wide
            uppercase
            ${TONE_STYLES[badge.tone]}
          `}
        >
          {badge.label}
        </div>
      ))}
    </section>
  );
}
