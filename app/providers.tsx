"use client";

import { VolumeProvider } from "@/context/VolumeContext";
import HUDVolume from "@/components/HUDVolume";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <VolumeProvider>
      {children}
      <HUDVolume />
    </VolumeProvider>
  );
}
