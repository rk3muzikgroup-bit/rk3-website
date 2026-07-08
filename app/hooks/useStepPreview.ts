"use client";

import { useState } from "react";

export function useStepPreview() {
  const [previewStep, setPreviewStep] = useState<number | null>(null);

  return {
    previewStep,
    setPreviewStep,
    clearPreview: () => setPreviewStep(null),
  };
}
