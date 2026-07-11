"use client";

import type { EvidenceBadge } from "@/lib/frequencyContent";

type BadgeTone =
  | "established"
  | "emerging"
  | "theoretical"
  | "anecdotal";

type Badge = {
  id: string;
  label: string;
  tone: BadgeTone;
};

type BadgeInput = Badge | EvidenceBadge;

type Props = {
  badges: BadgeInput[];
};

const TONE_STYLES: Record<BadgeTone, string> = {
  established:
    "border-emerald-400/40 text-emerald-300 bg-emerald-400/5",
  emerging:
    "border-cyan-400/40 text-cyan-300 bg-cyan-400/5",
  theoretical:
    "border-indigo-400/40 text-indigo-300 bg-indigo-400/5",
  anecdotal:
    "border-amber-400/40 text-amber-300 bg-amber-400/5",
};

const EVIDENCE_BADGES: Record<EvidenceBadge, Badge> = {
  observed: {
    id: "observed",
    label: "Observed",
    tone: "anecdotal",
  },
  studied: {
    id: "studied",
    label: "Studied",
    tone: "established",
  },
  emerging: {
    id: "emerging",
    label: "Emerging",
    tone: "emerging",
  },
  traditional: {
    id: "traditional",
    label: "Traditional",
    tone: "theoretical",
  },
};

function normalizeBadge(badge: BadgeInput): Badge {
  if (typeof badge === "string") {
    return EVIDENCE_BADGES[badge];
  }

  return badge;
}

export default function BadgeRow({ badges }: Props) {
  if (!badges || badges.length === 0) return null;

  return (
    <section className="flex flex-wrap gap-3">
      {badges.map((input) => {
        const badge = normalizeBadge(input);

        return (
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
        );
      })}
    </section>
  );
}
