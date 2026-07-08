"use client";
import { vaultRepo } from "@/lib/vault/vaultRepo";
import VaultBadge from "@/components/vault/VaultBadge";
import VaultGate from "@/components/vault/VaultGate";

import { useState } from "react";
import SessionPreview from "./SessionPreview";

import { sessionRepo } from "@/lib/persist/sessionRepo";
import type { Session } from "@/lib/persist/sessionTypes";
import VersionList from "./VersionList";

type Props = {
  session: Session;
  onRefresh: () => void;
};

export default function SessionRow({ session, onRefresh }: Props) {
  const isPublished = Boolean(session.publishedAt);
  const [isPreviewing, setIsPreviewing] = useState(false);
const access = vaultRepo.getAccess(session.id);

// TEMP CONTEXT (owner = true for now)
const isOwner = true;
const isMember = false;

  return (
    <div className="rounded border p-4 space-y-3">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium">{session.title}</div>
          <div className="text-xs text-muted">
            {isPublished ? "Published" : "Draft"}
          </div>
        </div>
<div className="flex items-center justify-between">
  <div className="space-y-1">
    <div className="font-medium">{session.title}</div>
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted">
        {isPublished ? "Published" : "Draft"}
      </span>
      <VaultBadge access={access} />
    </div>
  </div>
<VaultGate access={access} isOwner={isOwner} isMember={isMember}>
  <SessionEngine sessionId={id} timeIntentMs={null} />
</VaultGate>

  {/* OWNER CONTROLS */}
  {isOwner && (
    <div className="flex items-center gap-2">
      <select
        className="text-xs border rounded px-2 py-1"
        value={access}
        onChange={e => {
          vaultRepo.setAccess(session.id, e.target.value as any);
          onRefresh();
        }}
      >
        <option value="private">Private</option>
        <option value="member">Members</option>
        <option value="public">Public</option>
      </select>

      {!isPublished && (
        <button
          className="btn-primary"
          onClick={() => {
            sessionRepo.publish(session.id, session.activeVersionId);
            onRefresh();
          }}
        >
          Publish
        </button>
      )}
    </div>
  )}
</div>

        {!isPublished && (
          <button
            className="btn-primary"
            onClick={() => {
              sessionRepo.publish(
                session.id,
                session.activeVersionId
              );
              onRefresh();
              <div className="flex items-center gap-2">
  <button
    className="btn-secondary"
    onClick={() => setIsPreviewing(v => !v)}
  >
    {isPreviewing ? "Hide Preview" : "Preview"}
  </button>

  {!isPublished && (
    <button
      className="btn-primary"
      onClick={() => {
        sessionRepo.publish(session.id, session.activeVersionId);
        onRefresh();
      }}
    >
      Publish
    </button>
  )}
</div>

            }}
          >
            Publish
          </button>
        )}
      </div>

      {/* VERSIONS */}
      <VersionList
        sessionId={session.id}
        activeVersionId={session.activeVersionId}
        onActivate={() => onRefresh()}
      />
    </div>
  );
}
{isPreviewing && (
  <VaultGate access={access} isOwner={isOwner} isMember={isMember}>
    <SessionPreview
      sessionId={session.id}
      onClose={() => setIsPreviewing(false)}
    />
  </VaultGate>
)}
