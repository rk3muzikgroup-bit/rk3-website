"use client";

import { ReactNode } from "react";
import { VolumeProvider } from "@/context/VolumeContext";
import HUDVolume from "@/components/HUDVolume";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  return (
    <VolumeProvider>
      <HUDVolume />
      {children}
    </VolumeProvider>
  );
}
