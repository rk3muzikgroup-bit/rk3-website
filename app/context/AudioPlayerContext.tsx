"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";

type AudioContextType = {
  audio: HTMLAudioElement | null;
  play: (src?: string, title?: string) => void;
  pause: () => void;
  toggle: () => void;
  stop: () => void;
  setVolume: (v: number) => void;
  isPlaying: boolean;
  currentTitle?: string;
  volume: number;
  hasPlayed: boolean;
};

const STORAGE_KEY = "rk3:audio:last";
const AudioPlayerContext = createContext<AudioContextType | null>(null);

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTitle, setCurrentTitle] = useState<string | undefined>();
  const [volume, setVolumeState] = useState(0.7);
  const [hasPlayed, setHasPlayed] = useState(false);

  /* CREATE AUDIO */
  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.preload = "auto";
      audio.volume = volume;

      audio.onplay = () => setIsPlaying(true);
      audio.onpause = () => setIsPlaying(false);
      audio.onended = () => setIsPlaying(false);

      audioRef.current = audio;
    }
  }, []);

  /* RESTORE STATE */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);

      if (typeof saved.volume === "number") {
        setVolumeState(saved.volume);
        audio.volume = saved.volume;
      }

      if (typeof saved.src === "string") {
        audio.src = saved.src;
        setCurrentTitle(saved.title);
        setHasPlayed(true);
      }
    } catch {}
  }, []);

  /* SYNC VOLUME */
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  /* CONTROLS */
  function play(src?: string, title?: string) {
    const audio = audioRef.current;
    if (!audio) return;

    if (src && audio.src !== src) {
      audio.src = src;
      audio.currentTime = 0;
      setCurrentTitle(title);
    }

    if (!audio.src) return;

    audio.play().then(() => {
      setHasPlayed(true);
      setIsPlaying(true);
    }).catch(() => {});
  }

  function pause() {
    audioRef.current?.pause();
  }

  function toggle() {
    const audio = audioRef.current;
    if (!audio || !audio.src) return;
    audio.paused ? audio.play().catch(() => {}) : audio.pause();
  }

  function stop() {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;

    setIsPlaying(false);
    setHasPlayed(false);
    setCurrentTitle(undefined);

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }

  function setVolume(v: number) {
    setVolumeState(Math.min(1, Math.max(0, v)));
  }

  return (
    <AudioPlayerContext.Provider
      value={{
        audio: audioRef.current,
        play,
        pause,
        toggle,
        stop,
        setVolume,
        isPlaying,
        currentTitle,
        volume,
        hasPlayed,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  const ctx = useContext(AudioPlayerContext);
  if (!ctx) {
    throw new Error("useAudioPlayer must be used inside AudioPlayerProvider");
  }
  return ctx;
}
