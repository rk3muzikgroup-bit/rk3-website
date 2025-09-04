"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type AmbientContextType = {
  playAmbience: (src: string, volume?: number) => void;
  fadeOutAll: () => void;
};

const AmbientContext = createContext<AmbientContextType | null>(null);

export function AmbientProvider({ children }: { children: ReactNode }) {
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

  const playAmbience = (src: string, volume: number = 0.5) => {
    if (currentAudio && currentAudio.src.includes(src)) return; // already playing

    const newAudio = new Audio(src);
    newAudio.loop = true;
    newAudio.volume = 0;
    newAudio.play().catch(() => {});

    // fade out old ambience
    if (currentAudio) {
      const old = currentAudio;
      const fadeOut = setInterval(() => {
        if (old.volume > 0.05) {
          old.volume -= 0.05;
        } else {
          old.pause();
          clearInterval(fadeOut);
        }
      }, 200);
    }

    // fade in new ambience
    const fadeIn = setInterval(() => {
      if (newAudio.volume < volume) {
        newAudio.volume = Math.min(newAudio.volume + 0.05, volume);
      } else {
        clearInterval(fadeIn);
      }
    }, 200);

    setCurrentAudio(newAudio);
  };

  const fadeOutAll = () => {
    if (!currentAudio) return;
    const old = currentAudio;
    const fadeOut = setInterval(() => {
      if (old.volume > 0.05) {
        old.volume -= 0.05;
      } else {
        old.pause();
        clearInterval(fadeOut);
        setCurrentAudio(null);
      }
    }, 200);
  };

  return (
    <AmbientContext.Provider value={{ playAmbience, fadeOutAll }}>
      {children}
    </AmbientContext.Provider>
  );
}

export function useAmbient() {
  const context = useContext(AmbientContext);
  if (!context) throw new Error("useAmbient must be inside AmbientProvider");
  return context;
}
