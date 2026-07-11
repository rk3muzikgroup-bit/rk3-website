"use client";

import { useState } from "react";
import { vaultRepo } from "@/lib/vault/vaultRepo";
import VaultBadge from "@/components/vault/VaultBadge";
import VaultGate from "@/components/vault/VaultGate";
import SessionPreview from "./SessionPreview";
import { sessionRepo } from "@/lib/presets/sessionRepo";
import type { Session } from "@/lib/presets/sessionTypes";
import VersionList from "./VersionList";

type Props = {
  session: Session;
  onRefresh: () => void;
};

export default function SessionRow({ session, onRefresh }: Props) {
  const isPublished = Boolean(session.publishedAt);
  const [isPreviewing, setIsPreviewing] = useState(false);

  const access = vaultRepo.getAccess(session.id);

  // TEMP CONTEXT: owner controls stay enabled during local build phase.
  const isOwner = true;
  const canPublish = !isPublished && Boolean(session.activeVersionId);

  function handlePublish() {
    if (!session.activeVersionId) return;

    sessionRepo.publish(session.id, session.activeVersionId);
    onRefresh();
  }

  return (
    <div className="rounded border p-4 space-y-3">
      {/* HEADER */}
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="font-medium">{session.title}</div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted">
              {isPublished ? "Published" : "Draft"}
            </span>
            <VaultBadge access={access} />
          </div>
        </div>

        {/* OWNER CONTROLS */}
        {isOwner && (
          <div className="flex items-center gap-2">
            <button
              className="btn-secondary"
              onClick={() => setIsPreviewing((value) => !value)}
            >
              {isPreviewing ? "Hide Preview" : "Preview"}
            </button>

            <select
              className="text-xs border rounded px-2 py-1"
              value={access}
              onChange={(event) => {
                vaultRepo.setAccess(session.id, event.target.value as any);
                onRefresh();
              }}
            >
              <option value="private">Private</option>
              <option value="member">Members</option>
              <option value="public">Public</option>
            </select>

            {canPublish && (
              <button className="btn-primary" onClick={handlePublish}>
                Publish
              </button>
            )}
          </div>
        )}
      </div>

      {/* PREVIEW */}
      {isPreviewing && (
        <VaultGate access={access}>
          <SessionPreview
            sessionId={session.id}
            onClose={() => setIsPreviewing(false)}
          />
        </VaultGate>
      )}

      {/* VERSIONS */}
      <VersionList
        sessionId={session.id}
        activeVersionId={session.activeVersionId}
        onActivate={() => onRefresh()}
      />
    </div>
  );
}
