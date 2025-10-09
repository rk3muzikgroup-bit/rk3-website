"use client";

import { createContext, useContext, useState } from "react";
import { allSpoken } from "@/data/tracks/spoken";

interface Track {
  title: string;
  artist: string;
  full: string;
}

interface NowPlayingContextType {
  currentTrack: Track | null;
  playTrack: (track: Track) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  saveTrack: () => void;
  saved: Track[];
}

const NowPlayingContext = createContext<NowPlayingContextType | undefined>(
  undefined
);

export function NowPlayingProvider({ children }: { children: React.ReactNode }) {
  const [trackIndex, setTrackIndex] = useState(0);
  const [saved, setSaved] = useState<Track[]>([]);

  const currentTrack = allSpoken[trackIndex] || null;

  const playTrack = (track: Track) => {
    const index = allSpoken.findIndex((t) => t.full === track.full);
    if (index !== -1) setTrackIndex(index);
  };

  const nextTrack = () => {
    setTrackIndex((prev) => (prev + 1) % allSpoken.length);
  };

  const prevTrack = () => {
    setTrackIndex((prev) =>
      prev === 0 ? allSpoken.length - 1 : prev - 1
    );
  };

  const saveTrack = () => {
    if (currentTrack && !saved.find((t) => t.full === currentTrack.full)) {
      setSaved([...saved, currentTrack]);
    }
  };

  return (
    <NowPlayingContext.Provider
      value={{ currentTrack, playTrack, nextTrack, prevTrack, saveTrack, saved }}
    >
      {children}
    </NowPlayingContext.Provider>
  );
}

export function useNowPlaying() {
  const ctx = useContext(NowPlayingContext);
  if (!ctx) throw new Error("useNowPlaying must be used inside NowPlayingProvider");
  return ctx;
}
