"use client";

import { useEffect, useRef, useState } from "react";

export function useAudioWaveform(
  audioCtx?: AudioContext,
  sourceNode?: AudioNode,
  active = false
) {
  const rafRef = useRef<number | null>(null);
  const tapRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  const [level, setLevel] = useState(0); // 0 → 1

  useEffect(() => {
    if (!audioCtx || !sourceNode || !active) {
      setLevel(0);
      return;
    }

    // Create tap (non-destructive)
    const tap = audioCtx.createGain();
    tap.gain.value = 1;

    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 512;

    sourceNode.connect(tap);
    tap.connect(analyser);

    const buffer = new Uint8Array(analyser.frequencyBinCount);

    tapRef.current = tap;
    analyserRef.current = analyser;

    function tick() {
      analyser.getByteTimeDomainData(buffer);

      let sum = 0;
      for (let i = 0; i < buffer.length; i++) {
        const v = (buffer[i] - 128) / 128;
        sum += v * v;
      }

      const rms = Math.sqrt(sum / buffer.length);
      setLevel(Math.min(1, rms * 3));

      rafRef.current = requestAnimationFrame(tick);
    }

    tick();

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }

      try {
        tap.disconnect();
        analyser.disconnect();
      } catch {
        // safe disconnect
      }

      tapRef.current = null;
      analyserRef.current = null;
    };
  }, [audioCtx, sourceNode, active]);

  return level;
}
