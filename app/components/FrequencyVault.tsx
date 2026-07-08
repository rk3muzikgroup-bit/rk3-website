"use client";

import { useMemo, useState } from "react";
import { SESSIONS } from "@/lib/sessions";
import type { Chakra } from "@/hooks/useAudioMixer";

/* ───────── TYPES ───────── */

export type FrequencySession = {
  id: string;
  title: string;
  tags: string[];
  steps?: unknown[];
};

type Props = {
  onSelect?: (session: FrequencySession) => void;
};

/* ───────── CONSTANTS ───────── */

const CHAKRAS: Chakra[] = [
  "root",
  "sacral",
  "solar",
  "heart",
  "throat",
  "third_eye",
  "crown",
];

/* ───────── HELPERS ───────── */

function formatChakra(chakra: string) {
  return chakra.replace("_", " ");
}

/* ───────── COMPONENT ───────── */

export default function FrequencyVault({ onSelect }: Props) {
  const [activeChakra, setActiveChakra] =
    useState<Chakra | "all">("all");

  /* Load frequency sessions once (guarded) */
  const frequencySessions = useMemo<FrequencySession[]>(() => {
    try {
      return Object.values(SESSIONS).filter(
        s =>
          Array.isArray(s.tags) &&
          s.tags.includes("realm:frequency")
      ) as FrequencySession[];
    } catch {
      return [];
    }
  }, []);

  /* Chakra filter */
  const visibleSessions = useMemo(() => {
    if (activeChakra === "all") return frequencySessions;

    return frequencySessions.filter(s =>
      s.tags.some(
        tag => tag === `chakra:${activeChakra}`
      )
    );
  }, [frequencySessions, activeChakra]);

  return (
    <div
      className="
        fixed left-6 bottom-24 z-30 w-96
        rounded-xl border border-white/10
        bg-black/80 backdrop-blur-xl p-4
        pointer-events-auto
      "
      role="region"
      aria-label="Frequency Vault"
    >
      <div className="mb-3 text-xs uppercase tracking-widest opacity-70">
        Frequency Vault
      </div>

      {/* Chakra Filter */}
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveChakra("all")}
          className={`px-3 py-1 text-xs rounded transition ${
            activeChakra === "all"
              ? "bg-white text-black"
              : "border border-white/20 hover:bg-white/5"
          }`}
        >
          All
        </button>

        {CHAKRAS.map(chakra => (
          <button
            key={chakra}
            onClick={() => setActiveChakra(chakra)}
            className={`px-3 py-1 text-xs rounded transition capitalize ${
              activeChakra === chakra
                ? "bg-emerald-400 text-black"
                : "border border-white/20 hover:bg-white/5"
            }`}
          >
            {formatChakra(chakra)}
          </button>
        ))}
      </div>

      {/* Session List */}
      <div className="max-h-64 space-y-2 overflow-y-auto">
        {visibleSessions.map(session => (
          <button
            key={session.id}
            onClick={() => onSelect?.(session)}
            className="
              w-full text-left rounded
              border border-white/10
              px-3 py-2
              hover:bg-white/5 transition
            "
          >
            <div className="text-sm font-medium leading-tight">
              {session.title}
            </div>

            <div className="text-[10px] opacity-60 mt-0.5">
              {session.tags.join(" · ")}
            </div>
          </button>
        ))}

        {visibleSessions.length === 0 && (
          <div className="text-xs italic opacity-50">
            No frequencies available for this chakra.
          </div>
        )}
      </div>
    </div>
  );
}
