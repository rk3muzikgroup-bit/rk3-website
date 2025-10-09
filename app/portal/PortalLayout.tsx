"use client";

import type { ReactNode } from "react";
import CosmicBackgroundsHUD from "@/app/backgrounds/CosmicBackgroundsHUD";
import Orbs from "@/components/Orbs";
import Ethers from "@/components/Ethers";
import { portalConfig } from "@/utils/portalConfig";

export default function PortalLayout({
  children,
  portal = "street", // default fallback
}: {
  children: ReactNode;
  portal?: keyof typeof portalConfig;
}) {
  const config = portalConfig[portal] ?? portalConfig.street;

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Cosmic HUD background */}
      <CosmicBackgroundsHUD
        cycle={config.cycle}
        duration={config.duration}
        fadeOutDelay={config.fadeOutDelay}
        fadeSpeed={config.fadeSpeed}
        showCountdown={config.showCountdown}
      />

      {/* FX */}
      <Ethers count={20} />
      <Orbs count={3} />

      {/* Page Content */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        {children}
      </div>
    </div>
  );
}
