"use client";

import { useState } from "react";
import { SESSION_PRESETS } from "@/lib/presets/sessionPresets";

import BuilderPresetPicker from "./BuilderPresetPicker";
import BuilderIntent from "./BuilderIntent";
import BuilderFlow from "./BuilderFlow";
import BuilderReview from "./BuilderReview";
import BuilderProgress from "./BuilderProgress";

/* ---------------------------------------------
   Types (builder-only, no engine coupling)
--------------------------------------------- */

export type BuilderIntentData = {
  title: string;
  intention:
    | "calm"
    | "reset"
    | "focus"
    | "sleep"
    | "custom";
  hasVoice: boolean;
};

export type BuilderSection = {
  id: string;
  label: "arrival" | "core" | "integration" | "end";
  audioSrc?: string;
  voiceSrc?: string;
  duration?: number;
  chakra?: any;
};

export type BuilderDraftSession = {
  intent: BuilderIntentData | null;
  flow: BuilderSection[];
};

/* ---------------------------------------------
   Builder Root
--------------------------------------------- */

type Stage = 0 | 1 | 2 | 3;
// 0 = Preset
// 1 = Intent
// 2 = Flow
// 3 = Review

export default function BuilderRoot() {
  const [stage, setStage] = useState<Stage>(0);

  const [draft, setDraft] = useState<BuilderDraftSession>({
    intent: null,
    flow: [
      { id: "arrival", label: "arrival" },
      { id: "core", label: "core" },
      { id: "integration", label: "integration" },
      { id: "end", label: "end" },
    ],
  });

  /* ---------------------------------------------
     Preset handling
  --------------------------------------------- */

  function applyPreset(presetId: string | null) {
    if (!presetId) {
      setStage(1); // go to Intent
      return;
    }

    const preset = SESSION_PRESETS.find(p => p.id === presetId);
    if (!preset) return;

    setDraft({
      intent: preset.intent,
      flow: preset.flow,
    });

    setStage(2); // jump to Flow
  }

  /* ---------------------------------------------
     Render stage
  --------------------------------------------- */

  function renderStage() {
    switch (stage) {
      case 0:
        return <BuilderPresetPicker onSelect={applyPreset} />;

      case 1:
        return (
          <BuilderIntent
            value={draft.intent}
            onChange={intent =>
              setDraft(d => ({ ...d, intent }))
            }
            onNext={() => setStage(2)}
          />
        );

      case 2:
        return (
          <BuilderFlow
            sections={draft.flow}
            onChange={flow =>
              setDraft(d => ({ ...d, flow }))
            }
            onNext={() => setStage(3)}
            onBack={() => setStage(1)}
          />
        );

      case 3:
        return (
          <BuilderReview
            draft={draft}
            onBack={() => setStage(2)}
          />
        );

      default:
        return null;
    }
  }

  /* ---------------------------------------------
     Progress mapping (Intent / Flow / Review)
  --------------------------------------------- */

  const progressStep =
    stage === 0 ? 0 : Math.min(stage - 1, 2);

  /* ---------------------------------------------
     Render
  --------------------------------------------- */

  return (
    <div className="builder-root space-y-6">
      {stage > 0 && (
        <BuilderProgress step={progressStep as 0 | 1 | 2} />
      )}

      <div className="builder-stage">{renderStage()}</div>
    </div>
  );
}
