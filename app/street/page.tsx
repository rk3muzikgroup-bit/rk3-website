"use client";
import SafeVideo from "@/components/SafeVideo";
"use client";

import CosmicBackgroundsHUD from "@/app/backgrounds/CosmicBackgroundsHUD";
import PortalLayout from "@/app/layouts/PortalLayout";

export default function StreetPortal() {
  return (
    <PortalLayout>
      <h1 className="text-white text-4xl font-bold">🌆 Street Portal</h1>
    </PortalLayout>
  );
}

export default function StreetPortal() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Cosmic HUD behind everything */}
      <CosmicBackgroundsHUD 
        cycle 
        duration={20000} 
        fadeOutDelay={4000} 
        fadeSpeed={0.5} 
        showCountdown="always" 
      />

      {/* Portal Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-white text-4xl font-bold">🌆 Street Portal</h1>
      </div>
    </div>
  );
}

export default function StreetPage() {
  return (
    <div className="h-screen w-screen">
      <SafeVideo src="/videos/starfield_street.mp4" />
    </div>
  );
}
