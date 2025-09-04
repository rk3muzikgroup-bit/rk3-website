import { useEffect, useRef } from "react";

interface AmbientScoreProps {
  src: string;
}

export default function AmbientScore({ src }: AmbientScoreProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4; // smooth low background
      audioRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <audio ref={audioRef} src={src} loop />
  );
}
