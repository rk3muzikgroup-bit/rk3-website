"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type NowPlayingContextType = {
  track: string;
  setTrack: (t: string) => void;
  duration: number;
  setDuration: (d: number) => void;
  currentTime: number;
  setCurrentTime: (t: number) => void;
  seekTo: (t: number) => void;
};

const NowPlayingContext = createContext<NowPlayingContextType | null>(null);

export function NowPlayingProvider({ children }: { children: ReactNode }) {
  const [track, setTrack] = useState("No Track Loaded");
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const seekTo = (time: number) => {
    setCurrentTime(time);
  };

  return (
    <NowPlayingContext.Provider
      value={{ track, setTrack, duration, setDuration, currentTime, setCurrentTime, seekTo }}
    >
      {children}
    </NowPlayingContext.Provider>
  );
}

export function useNowPlaying() {
  const ctx = useContext(NowPlayingContext);
  if (!ctx) throw new Error("useNowPlaying must be inside NowPlayingProvider");
  return ctx;
}
