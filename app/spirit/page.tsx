"use client";
import SafeVideo from "@/components/SafeVideo";
"use client";

import CosmicBackgroundsHUD from "@/app/backgrounds/CosmicBackgroundsHUD";
import PortalLayout from "@/app/layouts/PortalLayout";

export default function SpiritPortal() {
  return (
    <PortalLayout duration={15000} showCountdown="off">
      <h1 className="text-white text-4xl font-bold">🌌 Spirit Portal</h1>
    </PortalLayout>
  );
}

export default function SpiritPortal() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <CosmicBackgroundsHUD 
        cycle 
        duration={15000} 
        fadeOutDelay={3000} 
        fadeSpeed={0.8} 
        showCountdown="off" 
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-white text-4xl font-bold">🌌 Spirit Portal</h1>
      </div>
    </div>
  );
}

export default function SpiritPage() {
  return (
    <div className="h-screen w-screen">
      <SafeVideo src="/videos/starfield_spirit.mp4" />
    </div>
  );
}
