"use client";

import { useCallback } from "react";
import { SESSION_PRESETS } from "@/lib/presets/sessionPresets";

type Props = {
  onSelect: (presetId: string | null) => void;
};

export default function BuilderPresetPicker({
  onSelect,
}: Props) {
  const handleSelect = useCallback(
    (id: string | null) => {
      onSelect(id);
    },
    [onSelect]
  );

  return (
    <div className="space-y-4 max-w-2xl">
      <h2 className="text-xl font-semibold">
        Start with a preset
      </h2>

      {SESSION_PRESETS.length === 0 ? (
        <div className="text-sm text-muted">
          No presets available yet.
        </div>
      ) : (
        <div className="grid gap-3">
          {SESSION_PRESETS.map(preset => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handleSelect(preset.id)}
              className="rounded border p-4 text-left transition hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <div className="font-medium">
                {preset.label}
              </div>
              <div className="text-sm text-muted">
                {preset.description}
              </div>
            </button>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => handleSelect(null)}
        className="btn-secondary"
      >
        Start from scratch
      </button>
    </div>
  );
}
