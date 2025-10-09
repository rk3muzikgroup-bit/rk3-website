"use client";
import { createContext, useContext, useState } from "react";

type TransitionContextType = {
  isFading: boolean;
  color: string;
  startFade: (callback: () => void, color?: string) => void;
};

const TransitionContext = createContext<TransitionContextType | null>(null);

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const [isFading, setIsFading] = useState(false);
  const [color, setColor] = useState("black");

  const startFade = (callback: () => void, fadeColor: string = "black") => {
    setColor(fadeColor);
    setIsFading(true);

    setTimeout(() => {
      callback();
      setTimeout(() => setIsFading(false), 800);
    }, 800);
  };

  return (
    <TransitionContext.Provider value={{ isFading, color, startFade }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransitionFade() {
  return useContext(TransitionContext)!;
}
