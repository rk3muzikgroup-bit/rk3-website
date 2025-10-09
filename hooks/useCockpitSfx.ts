// setup fade ref
const fadeInterval = useRef<NodeJS.Timeout | null>(null);

function clearFade() {
  if (fadeInterval.current) {
    clearInterval(fadeInterval.current);
    fadeInterval.current = null;
  }
}

// 🎵 play a one-shot SFX
function playSfx(file: string) {
  clearFade();
  const audio = new Audio(`/sounds/${file}`);
  audio.volume = muted ? 0 : sfxVolume * baselineGain.sfx;
  audio.play().catch(() => {});
  sfxRef.current = audio;

  if (typeof window !== "undefined") {
    (window as any).__cockpitSfx = { audio, file };
  }
}

// 🎚️ fade in and play a new SFX
function fadeIn(file: string, duration = 800) {
  clearFade();
  const audio = new Audio(`/sounds/${file}`);
  audio.volume = 0;
  audio.play().catch(() => {});
  sfxRef.current = audio;

  if (typeof window !== "undefined") {
    (window as any).__cockpitSfx = { audio, file };
  }

  const target = muted ? 0 : sfxVolume * baselineGain.sfx;
  const steps = 20;
  let step = 0;

  fadeInterval.current = setInterval(() => {
    step++;
    if (sfxRef.current) {
      sfxRef.current.volume = target * (step / steps);
    }
    if (step >= steps) clearFade();
  }, duration / steps);
}
