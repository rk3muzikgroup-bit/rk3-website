"use client";

import { useCallback, useState } from "react";
import type { BuilderStep } from "./types";

function createStep(
  partial?: Partial<BuilderStep>
): BuilderStep {
  return {
    id: crypto.randomUUID(),
    duration: 3 * 60_000,
    chakra: "heart",
    ...partial,
  };
}

export function useSessionBuilder() {
  const [steps, setSteps] = useState<BuilderStep[]>([]);

  const addStep = useCallback(
    (partial?: Partial<BuilderStep>) => {
      setSteps(s => [...s, createStep(partial)]);
    },
    []
  );

  const updateStep = useCallback(
    (id: string, patch: Partial<BuilderStep>) => {
      setSteps(s =>
        s.map(step =>
          step.id === id
            ? { ...step, ...patch }
            : step
        )
      );
    },
    []
  );

  const removeStep = useCallback((id: string) => {
    setSteps(s => s.filter(step => step.id !== id));
  }, []);

  const moveStep = useCallback(
    (from: number, to: number) => {
      setSteps(s => {
        const next = [...s];
        const [item] = next.splice(from, 1);
        next.splice(to, 0, item);
        return next;
      });
    },
    []
  );

  const reset = useCallback(() => {
    setSteps([]);
  }, []);

  return {
    steps,

    addStep,
    updateStep,
    removeStep,
    moveStep,
    reset,
  };
}
