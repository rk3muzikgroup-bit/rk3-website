"use client";

import { ReactNode } from "react";

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen w-full bg-black text-white">
      {children}
    </div>
  );
}
