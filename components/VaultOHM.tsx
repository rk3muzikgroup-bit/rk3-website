import { useEffect } from "react";

export default function VaultOHM() {
  useEffect(() => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Base OHM tone
    osc.type = "sine";
    osc.frequency.value = 136.1; // Sacred "OM" frequency (Hz)

    // Soft fade in/out
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    return () => {
      osc.stop();
      ctx.close();
    };
  }, []);

  return null;
}
