"use client";

import { useEffect, useState } from "react";
import { loadMemory, saveMemory } from "@/lib/memory";

type Props = {
  onResume: (sessionId: string) => void;
  portalId: string;
};

export default function ResumePrompt({ onResume, portalId }: Props) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const memory = loadMemory();

    // Prompt only if:
    // - user is returning to same portal
    // - there is a remembered session
    // - user has not dismissed resume
    if (
      memory.lastPortal === portalId &&
      typeof memory.lastSessionId === "string" &&
      memory.resumeDismissed !== true
    ) {
      setSessionId(memory.lastSessionId);
      setVisible(true);
    }
  }, [portalId]);

  if (!visible || !sessionId) return null;

  function handleResume() {
    // Mark prompt as handled for this visit
    saveMemory({ resumeDismissed: true });
    setVisible(false);
    onResume(sessionId);
  }

  function handleStartFresh() {
    // User explicitly declines resume
    saveMemory({ resumeDismissed: true });
    setVisible(false);
  }

  return (
    <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2">
      <div className="session-card max-w-md">
        <div className="session-title glow">
          Continue where you left off?
        </div>

        <div className="session-guidance mt-2">
          Your last session is ready when you are.
        </div>

        <div className="mt-4 flex gap-3">
          <button
            className="session-start glow-border"
            onClick={handleResume}
          >
            Resume
          </button>

          <button
            className="session-start"
            onClick={handleStartFresh}
          >
            Start Fresh
          </button>
        </div>
      </div>
    </div>
  );
}
