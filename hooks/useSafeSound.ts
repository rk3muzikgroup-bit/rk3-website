// src/hooks/useSafeSound.ts

const cache: Record<string, HTMLAudioElement> = {};

export default function useSafeSound() {
  return (path: string, opts: { volume?: number; loop?: boolean } = {}) => {
    try {
      const src = path.startsWith("/") ? path : `/sounds/${path}`;
      if (!cache[src]) cache[src] = new Audio(src);

      const a = cache[src];
      a.loop = !!opts.loop;
      a.volume = typeof opts.volume === "number" ? opts.volume : 0.6;
      a.currentTime = 0;
      a.play().catch(() => {}); // ✅ no crash on playback error
      return a;
    } catch (e) {
      console.warn("Sound failed:", path, e);
      return null;
    }
  };
}
