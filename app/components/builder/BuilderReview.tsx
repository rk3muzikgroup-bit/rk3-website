"use client";

import { nanoid } from "nanoid";
import { sessionRepo } from "@/lib/persist/sessionRepo";
import SessionEngine from "@/components/SessionEngine";
import type { BuilderDraftSession } from "./BuilderRoot";
import type { SessionPayload } from "@/hooks/useSessionEngine";

type Props = {
  draft: BuilderDraftSession;
  onBack: () => void;
};

export default function BuilderReview({
  draft,
  onBack,
}: Props) {
  const { intent, flow } = draft;

  if (!intent) return null;

  /* ───────── PREVIEW PAYLOAD (IN-MEMORY ONLY) ───────── */
  const previewSession: SessionPayload = {
    id: "builder-preview",
    title: intent.title,
    intention: intent.intention,
    hasVoice: intent.hasVoice,
    steps: flow.map((section, i) => ({
      id: `step-${i}`,
      label: section.label,
      audioSrc: section.audioSrc,
      voice: section.voiceSrc,
      duration: section.duration ?? 60000,
      chakra: section.chakra ?? "heart",
    })),
    createdAt: Date.now(),
  };

  /* ───────── SAVE FINAL SESSION ───────── */
  function handleSave() {
    const sessionId = nanoid();
    const versionId = nanoid();

    // 1️⃣ create session shell
    sessionRepo.saveSession({
      id: sessionId,
      title: intent.title,
      intention: intent.intention,
      hasVoice: intent.hasVoice,
      createdAt: Date.now(),
      activeVersionId: versionId,
    });

    // 2️⃣ add version
    sessionRepo.addVersion({
      id: versionId,
      sessionId,
      version: 1,
      flow,
      createdAt: Date.now(),
    });

    // 3️⃣ publish AFTER version exists
    sessionRepo.publish(sessionId, versionId);

    // Phase-safe exit (route later)
    console.log("SESSION SAVED", sessionId);
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* 🧠 HEADER */}
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">
          Review & Preview
        </h2>
        <p className="text-sm text-muted">
          This preview uses the real session engine.
        </p>
      </div>

      {/* 📋 SUMMARY */}
      <div className="rounded border p-4 space-y-2 text-sm">
        <div>
          <strong>Title:</strong> {intent.title}
        </div>
        <div>
          <strong>Intention:</strong>{" "}
          {intent.intention}
        </div>
        <div>
          <strong>Guided voice:</strong>{" "}
          {intent.hasVoice ? "On" : "Off"}
        </div>
        <div>
          <strong>Sections:</strong>{" "}
          {flow.map(s => s.label).join(" → ")}
        </div>
      </div>

      {/* ▶ PREVIEW */}
      <div className="rounded border p-4 space-y-3">
        <div className="text-sm font-medium">
          Preview
        </div>

        <div className="text-xs text-muted">
          Press play to experience the session as a listener.
        </div>

        <SessionEngine
          session={previewSession}
          timeIntentMs={null}
        />
      </div>

      {/* ACTIONS */}
      <div className="flex items-center justify-between pt-2">
        <button onClick={onBack} className="btn-secondary">
          Back
        </button>

        <button
          className="btn-primary"
          onClick={handleSave}
        >
          Save Session
        </button>
      </div>
    </div>
  );
}
