"use client";

import { sessionRepo } from "@/lib/presets/sessionRepo";
import type { SessionVersion } from "@/lib/presets/sessionTypes";

type Props = {
  sessionId: string;
  activeVersionId?: string;
  onActivate: () => void;
};

export default function VersionList({
  sessionId,
  activeVersionId,
  onActivate,
}: Props) {
  const versions = sessionRepo.listVersions(sessionId);

  return (
    <div className="space-y-1">
      {versions.map(v => (
        <div
          key={v.id}
          className="flex items-center justify-between text-sm"
        >
          <div>
            v{v.version}
            {v.id === activeVersionId && (
              <span className="ml-2 text-xs text-primary">
                active
              </span>
            )}
          </div>

          {v.id !== activeVersionId && (
            <button
              className="btn-secondary"
              onClick={() => {
                sessionRepo.publish(sessionId, v.id);
                onActivate();
              }}
            >
              Make Active
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
