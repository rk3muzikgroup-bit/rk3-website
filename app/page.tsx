"use client";

import CockpitMileage from "@/components/cockpit/CockpitMileage";
import CockpitBadgeCelebration from "@/components/cockpit/CockpitBadgeCelebration";

export default function CockpitPage() {
  return (
    <div className="relative w-full h-full bg-black">
      {/* Cockpit HUD elements */}
      <div className="absolute top-4 right-4">
        <CockpitMileage />
      </div>

      {/* Badge celebration overlay */}
      <CockpitBadgeCelebration />
    </div>
  );
}
