"use client";

import { useCallback } from "react";
import type { BuilderSection } from "./BuilderRoot";

type Props = {
  sections: BuilderSection[];
  onChange: (sections: BuilderSection[]) => void;
  onNext: () => void;
  onBack: () => void;
};

type SectionMeta = {
  title: string;
  hint: string;
};

const SECTION_LABELS: Record<BuilderSection["label"], SectionMeta> = {
  arrival: {
    title: "Arrival",
    hint: "Ease in. Ground the listener.",
  },
  core: {
    title: "Core",
    hint: "The main experience.",
  },
  integration: {
    title: "Integration",
    hint: "Let it settle and integrate.",
  },
  end: {
    title: "End",
    hint: "Gentle return or close.",
  },
};

export default function BuilderFlow({
  sections,
  onChange,
  onNext,
  onBack,
}: Props) {
  const updateSection = useCallback(
    (id: string, patch: Partial<BuilderSection>) => {
      onChange(
        sections.map(s =>
          s.id === id ? { ...s, ...patch } : s
        )
      );
    },
    [sections, onChange]
  );

  if (!sections.length) {
    return (
      <div className="max-w-2xl text-sm text-muted">
        No sections yet. Add a section to begin shaping the flow.
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* 🧭 HEADER */}
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">Shape the flow</h2>
        <p className="text-sm text-muted">
          Think in moments, not settings.
        </p>
      </div>

      {/* 🧱 SECTIONS */}
      <div className="space-y-4">
        {sections.map(section => {
          const meta = SECTION_LABELS[section.label];

          return (
            <div
              key={section.id}
              className="rounded border p-4 space-y-3"
            >
              {/* SECTION HEADER */}
              <div className="space-y-0.5">
                <div className="font-medium">{meta.title}</div>
                <div className="text-xs text-muted">{meta.hint}</div>
              </div>

              {/* AUDIO SOURCE */}
              <div className="space-y-1">
                <label className="text-xs">Audio (optional)</label>
                <input
                  type="text"
                  placeholder="audio file path or leave empty"
                  value={section.audioSrc ?? ""}
                  onChange={e => {
                    const v = e.target.value.trim();
                    updateSection(section.id, {
                      audioSrc: v || undefined,
                    });
                  }}
                  className="w-full rounded border px-2 py-1 text-sm"
                />
              </div>

              {/* VOICE SOURCE */}
              <div className="space-y-1">
                <label className="text-xs">Voice (optional)</label>
                <input
                  type="text"
                  placeholder="voice file path or leave empty"
                  value={section.voiceSrc ?? ""}
                  onChange={e => {
                    const v = e.target.value.trim();
                    updateSection(section.id, {
                      voiceSrc: v || undefined,
                    });
                  }}
                  className="w-full rounded border px-2 py-1 text-sm"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* 🔀 NAV */}
      <div className="flex justify-between pt-2">
        <button
          onClick={onBack}
          className="text-sm px-3 py-1 rounded border"
        >
          Back
        </button>

        <button
          onClick={onNext}
          className="text-sm px-3 py-1 rounded bg-white text-black"
        >
          Next
        </button>
      </div>
    </div>
  );
}
