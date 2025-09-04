import { useEffect, useRef } from "react";

export default function useAmbient(src: string, volume: number = 0.5) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0;

    const fadeIn = () => {
      let v = 0;
      const fade = setInterval(() => {
        if (v < volume) {
          v += 0.02;
          audio.volume = Math.min(v, volume);
        } else {
          clearInterval(fade);
        }
      }, 100);
    };

    const fadeOut = () => {
      if (audioRef.current) {
        let v = audioRef.current.volume;
        const fade = setInterval(() => {
          if (v > 0) {
            v -= 0.02;
            audioRef.current.volume = Math.max(v, 0);
          } else {
            clearInterval(fade);
            audioRef.current.pause();
          }
        }, 100);
      }
    };

    // Fade out old track (if playing)
    if (audioRef.current) fadeOut();

    // Play new track
    audioRef.current = audio;
    audio.play().then(() => fadeIn()).catch(err => console.log("Audio play failed:", err));

    return () => {
      fadeOut();
    };
  }, [src, volume]);
}
