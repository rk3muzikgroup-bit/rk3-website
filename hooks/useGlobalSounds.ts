// src/hooks/useGlobalSounds.ts
"use client";

import { useSafeSound } from "@/hooks/useSafeSound";

// ✅ Vault Sounds
export function useGlobalSounds() {
  return {
    // Already locked
    vaultUnlock: useSafeSound("/sounds/vault/unlock.mp3", 0.8),
    vaultDenied: useSafeSound("/sounds/vault/denied_blast.mp3", 0.8),
    vaultClosingLong: useSafeSound("/sounds/vault/closing_long.mp3", 0.6),
    vaultDoorClose: useSafeSound("/sounds/vault/door_close.mp3", 0.7),
    vaultDoorHum: useSafeSound("/sounds/vault/door_hum.mp3", 0.3),
    vaultDoorRumble: useSafeSound("/sounds/vault/door_rumble.mp3", 0.6),
    vaultPortalThud: useSafeSound("/sounds/vault/portal_thud.mp3", 0.7),

    // Placeholders (silent until replaced)
    roomEntry: useSafeSound("/sounds/rooms/entry_silent.mp3", 0.6),
    roomExit: useSafeSound("/sounds/rooms/exit_silent.mp3", 0.6),
    roomTransition: useSafeSound("/sounds/rooms/transition_silent.mp3", 0.6),
    outroWatermark: useSafeSound("/sounds/rooms/watermark_silent.mp3", 0.6),
  };
}
