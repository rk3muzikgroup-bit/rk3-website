"use client";

import { createContext, useContext, useState } from "react";

type PortalSurface = string | null;

type PortalSurfaceContextValue = {
  surface: PortalSurface;
  setSurface: (s: PortalSurface) => void;
};

const PortalSurfaceContext =
  createContext<PortalSurfaceContextValue | null>(null);

export function PortalSurfaceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [surface, setSurface] = useState<PortalSurface>(null);

  return (
    <PortalSurfaceContext.Provider value={{ surface, setSurface }}>
      {children}
    </PortalSurfaceContext.Provider>
  );
}

export function usePortalSurface() {
  const ctx = useContext(PortalSurfaceContext);
  if (!ctx) {
    throw new Error(
      "usePortalSurface must be used within PortalSurfaceProvider"
    );
  }
  return ctx;
}
