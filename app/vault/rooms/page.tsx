"use client";

import { useState } from "react";
import VaultDoor from "@/components/vault/VaultDoor";
import RidePlayer from "@/components/ride/RidePlayer";
import CockpitLoop from "@/components/cockpit/CockpitLoop";
import PathwaysHub from "@/components/vault/PathwaysHub";

export default function VaultRoomPage() {
  const [ride, setRide] = useState<"street" | "soul" | "spirit" | null>(null);
  const [phase, setPhase] = useState<"door" | "ride" | "cockpit" | "hub">("door");

  // 🚀 Cockpit phase
  if (phase === "cockpit") {
    return <CockpitLoop />;
  }

  // 🎬 Ride phase
  if (ride && phase === "ride") {
    return <RidePlayer portal={ride} onFinish={() => setPhase("cockpit")} />;
  }

  // 🌌 Pathways Hub phase (after denied)
  if (phase === "hub") {
    return (
      <PathwaysHub
        onChoose={(chosen) => {
          setRide(chosen);
          setPhase("ride");
        }}
      />
    );
  }

  // 🚪 Vault Door phase
  return (
    <div className="relative w-full h-screen bg-black text-white flex flex-col items-center justify-center">
      <VaultDoor
        onUnlock={(chosenRide) => {
          setRide(chosenRide);
          setPhase("ride");
        }}
        onDenied={() => setPhase("hub")}
      />

      <div className="absolute bottom-6 text-sm text-gray-400">
        Vault Rooms • Phase 4 Hollywood Flow
      </div>
    </div>
  );
}
