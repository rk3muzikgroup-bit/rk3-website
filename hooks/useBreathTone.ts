"use client";
import { useEffect } from "react";
import { useVolume } from "@/context/VolumeContext";

export function useBreathTone() {
  const { masterVolume, isMuted } = useVolume();

  useEffect(() => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

    // 432Hz oscillator
    const osc = audioCtx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = 432;

    const gainOsc = audioCtx.createGain();
    gainOsc.gain.value = isMuted ? 0 : masterVolume * 0.08; // very subtle

    osc.connect(gainOsc).connect(audioCtx.destination);
    osc.start();

    // Breath whoosh using noise buffer
    const bufferSize = 2 * audioCtx.sampleRate;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    const whiteNoise = audioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const noiseFilter = audioCtx.createBiquadFilter();
    noiseFilter.type = "lowpass";
    noiseFilter.frequency.value = 800;

    const gainNoise = audioCtx.createGain();
    gainNoise.gain.value = isMuted ? 0 : masterVolume * 0.12;

    whiteNoise.connect(noiseFilter).connect(gainNoise).connect(audioCtx.destination);
    whiteNoise.start();

    // Animate breath volume (in/out sync ~6s cycles)
    let t = 0;
    const interval = setInterval(() => {
      const phase = Math.sin((t / 6) * Math.PI * 2);
      gainNoise.gain.setTargetAtTime(
        (isMuted ? 0 : masterVolume * 0.12) * (0.4 + 0.6 * Math.abs(phase)),
        audioCtx.currentTime,
        0.5
      );
      t += 0.5;
    }, 500);

    return () => {
      osc.stop();
      whiteNoise.stop();
      osc.disconnect();
      whiteNoise.disconnect();
      gainOsc.disconnect();
      gainNoise.disconnect();
      clearInterval(interval);
    };
  }, [masterVolume, isMuted]);
}
