"use client";

import { useEffect, useState, useCallback } from "react";
import type { BuilderIntentData } from "./BuilderRoot";

type Props = {
  value: BuilderIntentData | null;
  onChange: (intent: BuilderIntentData) => void;
  onNext: () => void;
};

const INTENTIONS = [
  "calm",
  "reset",
  "focus",
  "sleep",
  "custom",
] as const;

export default function BuilderIntent({
  value,
  onChange,
  onNext,
}: Props) {
  const [title, setTitle] = useState("");
  const [intention, setIntention] =
    useState<BuilderIntentData["intention"]>(
      "calm"
    );
  const [hasVoice, setHasVoice] = useState(true);

  // 🔁 resync when parent value changes
  useEffect(() => {
    if (!value) return;
    setTitle(value.title ?? "");
    setIntention(value.intention ?? "calm");
    setHasVoice(value.hasVoice ?? true);
  }, [value]);

  const handleContinue = useCallback(() => {
    const cleanTitle = title.trim();
    if (!cleanTitle) return;

    onChange({
      title: cleanTitle,
      intention,
      hasVoice,
    });

    onNext();
  }, [title, intention, hasVoice, onChange, onNext]);

  return (
    <div className="space-y-6 max-w-xl">
      {/* 🧠 HEADER */}
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">
          What is this session for?
        </h2>
        <p className="text-sm text-muted">
          Set the intention. The system handles the rest.
        </p>
      </div>

      {/* 🏷 SESSION TITLE */}
      <div className="space-y-1">
        <label className="text-sm">Session name</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") {
              handleContinue();
            }
          }}
          placeholder="e.g. Evening Reset"
          className="w-full rounded border px-3 py-2"
        />
      </div>

      {/* 🎯 INTENTION */}
      <div className="space-y-2">
        <label className="text-sm">Primary intention</label>

        <div className="grid grid-cols-2 gap-2">
          {INTENTIONS.map(opt => (
            <button
              key={opt}
              type="button"
              onClick={() => setIntention(opt)}
              className={`rounded px-3 py-2 text-sm border transition ${
                intention === opt
                  ? "bg-primary text-white"
                  : "bg-transparent"
              }`}
            >
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* 🎙 VOICE TOGGLE */}
      <div className="flex items-center justify-between rounded border px-3 py-2">
        <div>
          <div className="text-sm font-medium">
            Guided voice
          </div>
          <div className="text-xs text-muted">
            Includes spoken guidance when available
          </div>
        </div>

        <button
          type="button"
          onClick={() => setHasVoice(v => !v)}
          className={`px-3 py-1 rounded text-sm transition ${
            hasVoice
              ? "bg-primary text-white"
              : "bg-muted"
          }`}
        >
          {hasVoice ? "On" : "Off"}
        </button>
      </div>

      {/* ➡ CONTINUE */}
      <div className="pt-2">
        <button
          onClick={handleContinue}
          disabled={!title.trim()}
          className="btn-primary"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
