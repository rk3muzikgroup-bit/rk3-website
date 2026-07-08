"use client";

import { useEffect, useState, useCallback } from "react";
import type { HealingProgram } from "@/lib/programTypes";
import {
  loadProgramProgress,
  saveProgramProgress,
  ProgramProgress,
} from "@/lib/programStorage";
import { useSessionEngine } from "@/hooks/useSessionEngine";

export function useProgramEngine(program: HealingProgram) {
  const engine = useSessionEngine();
  const [progress, setProgress] =
    useState<ProgramProgress | null>(null);

  /* ───────── LOAD PROGRESS ───────── */
  useEffect(() => {
    const stored = loadProgramProgress(program.id);

    if (stored) {
      setProgress(stored);
    } else {
      const fresh: ProgramProgress = {
        programId: program.id,
        currentDay: 1,
        completedDays: [],
        startedAt: Date.now(),
      };
      setProgress(fresh);
      saveProgramProgress(fresh);
    }
  }, [program.id]);

  /* ───────── LOAD CURRENT DAY ───────── */
  useEffect(() => {
    if (!progress) return;

    const day = program.days.find(
      d => d.day === progress.currentDay
    );
    if (!day) return;

    engine.load(day.session);
  }, [progress?.currentDay, program.days, engine]);

  /* ───────── PLAY TODAY (SAFE) ───────── */
  const playToday = useCallback(() => {
    if (!progress) return;

    const day = program.days.find(
      d => d.day === progress.currentDay
    );
    if (!day) return;

    engine.load(day.session);
    engine.play();
  }, [engine, program.days, progress]);

  /* ───────── COMPLETE DAY ───────── */
  function completeDay() {
    if (!progress) return;

    const next: ProgramProgress = {
      ...progress,
      completedDays: [
        ...new Set([
          ...progress.completedDays,
          progress.currentDay,
        ]),
      ],
      currentDay: Math.min(
        progress.currentDay + 1,
        program.days.length
      ),
      lastPlayedAt: Date.now(),
    };

    setProgress(next);
    saveProgramProgress(next);
  }

  /* ───────── API ───────── */
  return {
    engine,

    program,
    progress,

    currentDay: progress?.currentDay ?? 1,
    totalDays: program.days.length,
    completedDays: progress?.completedDays ?? [],

    playToday,
    pause: engine.pause,
    stop: engine.stop,

    completeDay,
  };
}
