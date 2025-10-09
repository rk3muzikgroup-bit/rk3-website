"use client";

import { ReactNode } from "react";

interface VaultLayoutProps {
  children: ReactNode;
  title?: string;         // Optional room title
  fadeSpeed?: number;     // Transition speed
  showHeader?: boolean;   // Toggle header on/off
}

export default function VaultLayout({
  children,
  title = "Vault Room",
  fadeSpeed = 1,
  showHeader = true,
}: VaultLayoutProps) {
  return (
    <div
      className="relative h-screen w-screen overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black"
      style={{
        transition: `opacity ${fadeSpeed}s ease-in-out`,
      }}
    >
      {/* Header */}
      {showHeader && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-center z-10">
          <h1 className="text-3xl font-bold text-yellow-400 drop-shadow-lg tracking-wide">
            {title}
          </h1>
        </div>
      )}

      {/* Vault content */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        {children}
      </div>

      {/* Subtle overlay FX */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.07),transparent)]" />
    </div>
  );
}
