"use client";

import ResumePrompt from "@/components/ResumePrompt";

export default function HealingClientUI() {
  function handleResume(sessionId: string) {
    console.log("Resuming session:", sessionId);
  }

  return (
    <ResumePrompt
      portalId="healing"
      onResume={handleResume}
    />
  );
}
