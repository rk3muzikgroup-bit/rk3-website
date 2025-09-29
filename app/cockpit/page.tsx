"use client";

import { useState } from "react";
import CockpitSteeringWheel from "@/components/cockpit/CockpitSteeringWheel";
import CockpitDashboard from "@/components/cockpit/CockpitDashboard";
import CockpitHUD from "@/components/cockpit/CockpitHUD";
import CockpitRide from "@/components/cockpit/CockpitRide";
import CockpitImmersion from "@/components/cockpit/CockpitImmersion";
import EnterVaultButton from "@/components/cockpit/EnterVaultButton";

export default function CockpitPage() {
  const [ride, setRide] = useState("/videos/ride/Street_Ride.mp4");

  return (
    <div className="relative w-full h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Ride Video */}
      <CockpitRide src={ride} />

      {/* Immersion Effects */}
      <CockpitImmersion />

      {/* HUD Overlay */}
      <CockpitHUD />

      {/* Foreground Cockpit */}
      <div className="z-10 flex flex-col md:flex-row items-center gap-8">
        <CockpitSteeringWheel />
        <CockpitDashboard />
      </div>

      {/* Ride Switch Controls */}
      <div className="absolute bottom-20 flex gap-4 z-20">
        <button
          onClick={() => setRide("/videos/ride/Street_Ride.mp4")}
          className={`px-4 py-2 rounded-lg font-mono text-sm ${
            ride.includes("Street")
              ? "bg-teal-600 text-white"
              : "bg-gray-700 text-teal-300"
          }`}
        >
          STREET
        </button>
        <button
          onClick={() => setRide("/videos/ride/Soul_Ride.mp4")}
          className={`px-4 py-2 rounded-lg font-mono text-sm ${
            ride.includes("Soul")
              ? "bg-teal-600 text-white"
              : "bg-gray-700 text-teal-300"
          }`}
        >
          SOUL
        </button>
        <button
          onClick={() => setRide("/videos/ride/Spirit_Ride.mp4")}
          className={`px-4 py-2 rounded-lg font-mono text-sm ${
            ride.includes("Spirit")
              ? "bg-teal-600 text-white"
              : "bg-gray-700 text-teal-300"
          }`}
        >
          SPIRIT
        </button>
      </div>

      {/* Vault Button */}
      <div className="absolute bottom-6 z-20">
        <EnterVaultButton />
      </div>
    </div>
  );
}
