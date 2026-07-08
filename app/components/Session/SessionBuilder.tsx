"use client";

import { useEffect, useState } from "react";
import type { Chakra } from "@/hooks/useAudioMixer";
import type { Brainwave } from "@/hooks/useBinauralEngine";
import { consumeBuilderInject } from "@/lib/builderInjection";

/* ───────── TYPES (BUILDER ONLY) ───────── */

export type BuilderStep = {
  id: string;
  chakra: Chakra;
  duration: number; // ms
  brainwave?: Brainwave;
  voice?: string;
  caption?: string;
};

export type SessionPayload = {
  title: string;
  steps: BuilderStep[];
  createdAt: number;
};

/* ───────── PROPS ───────── */

type Props = {
  onPreview: (steps: BuilderStep[]) => void;
  onConvert: (session: SessionPayload) => void;
};

/* ───────── UTIL ───────── */

function createId() {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);
}

/* ───────── COMPONENT ───────── */

export default function SessionBuilder({
  onPreview,
  onConvert,
}: Props) {
  const [title, setTitle] = useState("Custom Healing Session");
  const [steps, setSteps] = useState<BuilderStep[]>([]);

  /* ───────── INJECT FROM FREQUENCY VAULT ───────── */
  useEffect(() => {
    const inject = consumeBuilderInject();
    if (!inject) return;

    setTitle(inject.title);

    setSteps([
      {
        id: createId(),
        chakra: inject.chakra ?? "heart",
        brainwave: "theta",
        duration: 10_000,
        caption: inject.title,
      },
    ]);
  }, []);

  /* ───────── STEP ACTIONS ───────── */

  function addStep() {
    setSteps(s => [
      ...s,
      {
        id: createId(),
        chakra: "heart",
        brainwave: "theta",
        duration: 10_000,
      },
    ]);
  }

  function updateStep(
    id: string,
    patch: Partial<BuilderStep>
  ) {
    setSteps(s =>
      s.map(step =>
        step.id === id ? { ...step, ...patch } : step
      )
    );
  }

  function removeStep(id: string) {
    setSteps(s => s.filter(step => step.id !== id));
  }

  /* ───────── VALIDATION ───────── */

  function isValidStep(step: BuilderStep) {
    return step.duration >= 1000 && step.duration <= 60 * 60 * 1000;
  }

  /* ───────── CONVERT ───────── */

  function convert() {
    if (!steps.length) return;
    if (!steps.every(isValidStep)) return;

    const payload: SessionPayload = {
      title: title.trim() || "Healing Session",
      steps,
      createdAt: Date.now(),
    };

    onConvert(payload);
  }

  /* ───────── UI ───────── */

  return (
    <div className="fixed top-24 left-6 z-50 w-[420px] rounded-xl border border-white/10 bg-black/85 backdrop-blur-xl p-4">
      <div className="mb-3 text-sm uppercase tracking-widest opacity-70">
        Session Builder
      </div>

      {/* TITLE */}
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="mb-3 w-full rounded border border-white/10 bg-black px-2 py-1 text-sm"
      />

      {/* STEPS */}
      <div className="max-h-[50vh] space-y-3 overflow-y-auto">
        {steps.map((step, i) => (
          <div
            key={step.id}
            className="rounded border border-white/10 p-3 space-y-2"
          >
            <div className="text-xs opacity-50">
              Step {i + 1}
            </div>

            <select
              value={step.chakra}
              onChange={e =>
                updateStep(step.id, {
                  chakra: e.target.value as Chakra,
                })
              }
              className="w-full rounded border border-white/10 bg-black px-2 py-1 text-sm"
            >
              {[
                "root",
                "sacral",
                "solar",
                "heart",
                "throat",
                "third_eye",
                "crown",
              ].map(c => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              value={step.brainwave ?? "theta"}
              onChange={e =>
                updateStep(step.id, {
                  brainwave: e.target.value as Brainwave,
                })
              }
              className="w-full rounded border border-white/10 bg-black px-2 py-1 text-sm"
            >
              {["delta", "theta", "alpha", "beta", "gamma"].map(b => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>

            <input
              type="number"
              min={1000}
              step={1000}
              value={step.duration}
              onChange={e =>
                updateStep(step.id, {
                  duration: Math.max(1000, Number(e.target.value)),
                })
              }
              className="w-full rounded border border-white/10 bg-black px-2 py-1 text-sm"
            />

            <button
              onClick={() => removeStep(step.id)}
              className="text-xs text-red-400"
            >
              Remove Step
            </button>
          </div>
        ))}
      </div>

      {/* ACTIONS */}
      <div className="mt-4 flex gap-2">
        <button
          onClick={addStep}
          className="flex-1 rounded bg-white/10 py-2 text-sm"
        >
          + Add Step
        </button>

        <button
          onClick={() => steps.length && onPreview(steps)}
          className="flex-1 rounded bg-white/20 py-2 text-sm"
        >
          Preview
        </button>

        <button
          onClick={convert}
          className="flex-1 rounded bg-emerald-500 py-2 text-sm text-black"
        >
          Convert
        </button>
      </div>
    </div>
  );
}
