"use client";

import { ReactNode } from "react";
import Orbs from "@/components/Orbs";
import Ethers from "@/components/Ethers";
import CosmicBackgroundsHUD from "@/app/backgrounds/CosmicBackgroundsHUD";
import portalConfig from "@/utils/portalConfig";

export default function PortalLayout({
  children,
  portal = "street",
}: {
  children: ReactNode;
  portal?: keyof typeof portalConfig;
}) {
  const config = portalConfig[portal] ?? portalConfig.street;

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Cosmic HUD background + dash */}
      <CosmicBackgroundsHUD
        cycle={config.cycle}
        duration={config.duration}
        fadeOutDelay={config.fadeOutDelay}
        fadeSpeed={config.fadeSpeed}
        showCountdown={config.showCountdown}
      />

      {/* Floating FX */}
      <Ethers count={30} />
      <Orbs count={4} />

      {/* Portal content layered on top */}
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
