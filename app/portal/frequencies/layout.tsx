"use client";

import type { ReactNode } from "react";

export default function PortalLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      {children}
    </div>
  );
}
