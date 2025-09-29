"use client";
import { useVolume } from "@/context/VolumeContext";

export function useVaultReverb() {
  const { masterVolume, isMuted } = useVolume();

  return (src: string, options: { loop?: boolean; id?: string } = {}) => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const audio = new Audio(src);
    audio.loop = options.loop || false;

    // Connect audio to Web Audio API
    const track = audioCtx.createMediaElementSource(audio);

    // Master volume
    const gainNode = audioCtx.createGain();
    gainNode.gain.value = isMuted ? 0 : masterVolume;

    // Reverb (convolver)
    const convolver = audioCtx.createConvolver();

    // Simple impulse response (tiny hall-like echo)
    const length = audioCtx.sampleRate * 1.5; // 1.5s tail
    const impulse = audioCtx.createBuffer(2, length, audioCtx.sampleRate);
    for (let channel = 0; channel < 2; channel++) {
      const impulseData = impulse.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        impulseData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2);
      }
    }
    convolver.buffer = impulse;

    // Routing: track → convolver → gain → output
    track.connect(convolver);
    convolver.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    audio.play().catch(() => {});

    return () => {
      audio.pause();
      audio.currentTime = 0;
      track.disconnect();
      convolver.disconnect();
      gainNode.disconnect();
    };
  };
}
