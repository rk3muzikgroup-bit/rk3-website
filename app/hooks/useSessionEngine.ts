"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAmbient } from "@/context/AmbientContext";
import { useAudioPlayer } from "@/context/AudioPlayerContext";

export type SessionStep = {
  id: string;
  label?: string;
  chakra?: string;
  frequencyId?: string;
  brainwave?: string;
  audioSrc?: string;
  voice?: string;
  caption?: string;
  duration: number;
};

export type SessionPayload = {
  id: string;
  title: string;
  intention?: string;
  hasVoice?: boolean;
  tags?: string[];
  steps: SessionStep[];
  createdAt?: number;
};

/**
 * Session Engine
 * - Coordinates audio + ambient
 * - Supports basic audio controls
 * - Supports session load/play/pause/seek timeline state
 * - SAFE when providers are missing
 */
export function useSessionEngine() {
  let audio: ReturnType<typeof useAudioPlayer> | null = null;
  let ambient: ReturnType<typeof useAmbient> | null = null;

  try {
    audio = useAudioPlayer();
  } catch {
    audio = null;
  }

  try {
    ambient = useAmbient();
  } catch {
    ambient = null;
  }

  const duck = ambient?.duck ?? (() => {});
  const unduck = ambient?.unduck ?? (() => {});

  const [session, setSession] = useState<SessionPayload | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const totalDuration = useMemo(() => {
    return session?.steps.reduce((total, step) => total + step.duration, 0) ?? 0;
  }, [session]);

  const markers = useMemo(() => {
    if (!session?.steps?.length) return [];

    let startMs = 0;

    return session.steps.map((step, index) => {
      const marker = {
        index,
        label: step.caption || step.frequencyId || step.chakra || `Step ${index + 1}`,
        startMs,
        durationMs: step.duration,
      };

      startMs += step.duration;
      return marker;
    });
  }, [session]);

  const currentStep = useMemo(() => {
    if (!session?.steps?.length) return null;

    let startMs = 0;

    for (const step of session.steps) {
      const endMs = startMs + step.duration;

      if (elapsed >= startMs && elapsed < endMs) {
        return step;
      }

      startMs = endMs;
    }

    return session.steps[session.steps.length - 1] ?? null;
  }, [session, elapsed]);

  const load = useCallback((nextSession: SessionPayload) => {
    setSession(nextSession);
    setElapsed(0);
    setIsRunning(false);
  }, []);

  const play = useCallback(
    (src?: string, title?: string) => {
      duck();

      if (src) {
        audio?.play?.(src, title);
        setIsRunning(true);
        return;
      }

      if (currentStep?.voice) {
        audio?.play?.(currentStep.voice, session?.title);
      }

      setIsRunning(true);
    },
    [audio, currentStep, duck, session]
  );

  const pause = useCallback(() => {
    audio?.pause?.();
    setIsRunning(false);
    unduck();
  }, [audio, unduck]);

  const stop = useCallback(() => {
    audio?.stop?.();
    audio?.pause?.();
    setElapsed(0);
    setIsRunning(false);
    unduck();
  }, [audio, unduck]);

  const seek = useCallback(
    (ms: number) => {
      const nextElapsed = Math.min(Math.max(ms, 0), totalDuration || 0);
      setElapsed(nextElapsed);
    },
    [totalDuration]
  );

  const setVolume = useCallback(
    (volume: number) => {
      audio?.setVolume?.(volume);
    },
    [audio]
  );

  useEffect(() => {
    if (!isRunning || !totalDuration) return;

    const timer = window.setInterval(() => {
      setElapsed((current) => {
        const next = Math.min(current + 250, totalDuration);

        if (next >= totalDuration) {
          setIsRunning(false);
          unduck();
        }

        return next;
      });
    }, 250);

    return () => window.clearInterval(timer);
  }, [isRunning, totalDuration, unduck]);

  useEffect(() => {
    const el = audio?.audio;
    if (!el) return;

    const handleEnded = () => {
      setIsRunning(false);
      unduck();
    };

    el.addEventListener("ended", handleEnded);
    return () => {
      el.removeEventListener("ended", handleEnded);
    };
  }, [audio, unduck]);

  return {
    session,
    markers,
    currentStep,
    elapsed,
    totalDuration,
    isRunning,
    load,
    play,
    pause,
    stop,
    seek,
    setVolume,
  };
}
