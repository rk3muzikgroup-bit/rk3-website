"use client";

import VaultDoor from "@/components/vault/VaultDoor";

export default function VaultRoomPage() {
  return (
    <div className="relative w-full h-screen bg-black text-white flex flex-col items-center justify-center">
      {/* Vault Door Experience */}
      <VaultDoor />

      {/* Demo Text / Placeholder Room */}
      <div className="absolute bottom-6 text-sm text-gray-400">
        Vault Rooms • Hollywood Experience Phase 3
      </div>
    </div>
  );
}

