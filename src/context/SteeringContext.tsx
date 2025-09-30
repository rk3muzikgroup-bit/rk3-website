"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type SteeringContextType = {
  x: number;
  y: number;
  setSteering: (x: number, y: number) => void;
};

const SteeringContext = createContext<SteeringContextType | null>(null);

export function useSteering() {
  const ctx = useContext(SteeringContext);
  if (!ctx) throw new Error("useSteering must be inside SteeringProvider");
  return ctx;
}

export function SteeringProvider({ children }: { children: ReactNode }) {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const setSteering = (newX: number, newY: number) => {
    setX(newX);
    setY(newY);
  };

  return (
    <SteeringContext.Provider value={{ x, y, setSteering }}>
      {children}
    </SteeringContext.Provider>
  );
}
