"use client";

import SessionEngine from "@/components/session/SessionEngine";

type Props = {
  sessionId: string;
  onClose: () => void;
};

export default function SessionPreview({ sessionId, onClose }: Props) {
  return (
    <div className="rounded border p-4 space-y-3 bg-background">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Preview</div>
        <button className="btn-secondary" onClick={onClose}>
          Close
        </button>
      </div>

      {/* IMPORTANT:
          - timeIntentMs = null (always start at beginning)
          - No autoplay; engine stays consent-first
      */}
      <SessionEngine sessionId={sessionId} timeIntentMs={null} />
    </div>
  );
}
