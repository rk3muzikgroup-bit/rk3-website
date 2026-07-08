"use client";

import { createContext, useContext, useState } from "react";

type ReVerseContextValue = {
  enabled: boolean;
  setEnabled: (v: boolean) => void;
};

const ReVerseContext =
  createContext<ReVerseContextValue | null>(null);

export function ReVerseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [enabled, setEnabled] = useState(false);

  return (
    <ReVerseContext.Provider value={{ enabled, setEnabled }}>
      {children}
    </ReVerseContext.Provider>
  );
}

export function useReVerse() {
  const ctx = useContext(ReVerseContext);
  if (!ctx) {
    throw new Error("useReVerse must be used within ReVerseProvider");
  }
  return ctx;
}
