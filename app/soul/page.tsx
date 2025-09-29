"use client";
import SafeVideo from "@/components/SafeVideo";
"use client";

import CosmicBackgroundsHUD from "@/app/backgrounds/CosmicBackgroundsHUD";
import PortalLayout from "@/app/layouts/PortalLayout";

export default function SoulPortal() {
  return (
    <PortalLayout showCountdown="hover" fadeSpeed={1}>
      <h1 className="text-white text-4xl font-bold">💜 Soul Portal</h1>
    </PortalLayout>
  );
}

export default function SoulPortal() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <CosmicBackgroundsHUD 
        cycle 
        duration={20000} 
        fadeOutDelay={5000} 
        fadeSpeed={1} 
        showCountdown="hover" 
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-white text-4xl font-bold">💜 Soul Portal</h1>
      </div>
    </div>
  );
}

export default function SoulPage() {
  return (
    <div className="h-screen w-screen">
      <SafeVideo src="/videos/starfield_soul.mp4" />
    </div>
  );
}
