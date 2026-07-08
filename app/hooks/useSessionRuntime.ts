"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Chakra } from "@/hooks/useAudioMixer";
import type { Brainwave } from "@/hooks/useBinauralEngine";

/* ───────── TYPES ───────── */

export type SessionStep = {
  voice?: string;
  caption?: string;
  duration: number; // ms
  chakra: Chakra;
  brainwave?: Brainwave;
};

export type SessionPayload = {
  id?: string;
  title?: string;
  steps: SessionStep[];
};

type RuntimeState = {
  stepIndex: number;
  elapsedMs: number;
  paused: boolean;
};

/* ───────── HOOK ───────── */

export function useSessionRuntime(opts: {
  playVoice: (src: string, chakra?: Chakra) => void;
  stopVoice: () => void;
  startBinaural: (chakra?: Chakra, brainwave?: Brainwave) => void;
  stopBinaural: () => void;
  onCaption?: (text?: string) => void;
}) {
  const {
    playVoice,
    stopVoice,
    startBinaural,
    stopBinaural,
    onCaption,
  } = opts;

  const sessionRef = useRef<SessionPayload | null>(null);
  const timerRef = useRef<number | null>(null);
  const startedAtRef = useRef<number>(0);

  const [state, setState] = useState<RuntimeState>({
    stepIndex: 0,
    elapsedMs: 0,
    paused: false,
  });

  /* ───────── INTERNAL ───────── */

  const clearTimer = () => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const stopInternal = useCallback(() => {
    clearTimer();
    stopVoice();
    stopBinaural();
    onCaption?.(undefined);
    sessionRef.current = null;
    setState({ stepIndex: 0, elapsedMs: 0, paused: false });
  }, [stopVoice, stopBinaural, onCaption]);

  const playStep = useCallback(
    (index: number, offsetMs = 0) => {
      const session = sessionRef.current;
      if (!session) return;

      const step = session.steps[index];
      if (!step) {
        stopInternal();
        return;
      }

      clearTimer();
      startedAtRef.current = Date.now() - offsetMs;

      onCaption?.(step.caption);

      if (step.voice) {
        playVoice(step.voice, step.chakra);
      }

      startBinaural(step.chakra, step.brainwave);

      const remainingMs = Math.max(step.duration - offsetMs, 0);

      timerRef.current = window.setTimeout(() => {
        setState(s => ({
          ...s,
          stepIndex: s.stepIndex + 1,
          elapsedMs: 0,
        }));
        playStep(index + 1);
      }, remainingMs);
    },
    [playVoice, startBinaural, onCaption, stopInternal]
  );

  /* ───────── PUBLIC API ───────── */

  const start = useCallback(
    (session: SessionPayload) => {
      stopInternal();
      sessionRef.current = session;
      setState({ stepIndex: 0, elapsedMs: 0, paused: false });
      playStep(0);
    },
    [playStep, stopInternal]
  );

  const pause = useCallback(() => {
    if (state.paused) return;

    clearTimer();
    stopVoice();
    stopBinaural();

    const elapsed = Date.now() - startedAtRef.current;

    setState(s => ({
      ...s,
      paused: true,
      elapsedMs: elapsed,
    }));
  }, [state.paused, stopVoice, stopBinaural]);

  const resume = useCallback(() => {
    if (!state.paused) return;
    setState(s => ({ ...s, paused: false }));
    playStep(state.stepIndex, state.elapsedMs);
  }, [state, playStep]);

  /**
   * Resume remaining steps scaled to target duration
   * (does NOT mutate original session)
   */
  const resumeScaled = useCallback(
    (minutes: 3 | 7 | 11) => {
      const session = sessionRef.current;
      if (!session) return;

      const remaining = session.steps.slice(state.stepIndex);
      const remainingMs = remaining.reduce(
        (sum, s) => sum + s.duration,
        0
      );

      if (remainingMs <= 0) {
        resume();
        return;
      }

      const targetMs = minutes * 60 * 1000;
      const ratio = targetMs / remainingMs;

      sessionRef.current = {
        ...session,
        steps: [
          ...session.steps.slice(0, state.stepIndex),
          ...remaining.map(step => ({
            ...step,
            duration: Math.max(
              1000,
              Math.round(step.duration * ratio)
            ),
          })),
        ],
      };

      resume();
    },
    [state.stepIndex, resume]
  );

  const stop = useCallback(() => {
    stopInternal();
  }, [stopInternal]);

  /* ───────── CLEANUP ───────── */

  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, []);

  return {
    start,
    pause,
    resume,
    resumeScaled,
    stop,
    state,

    activeStep:
      sessionRef.current?.steps[state.stepIndex],

    isRunning:
      !!sessionRef.current && !state.paused,

    isPaused: state.paused,
  };
}
