import { usePlaySound } from "@/hooks/usePlaySound";

// 🎬 All vault SFX mapped clean for Hollywood sequencing
export const vaultSounds = {
  unlock: { file: "/sounds/vault/unlock.mp3", duration: 23000 },         // 23s
  denied: { file: "/sounds/vault/denied_blast.mp3", duration: 8000 },   // 8s
  doorClose: { file: "/sounds/vault/door_close.mp3", duration: 13000 }, // 13s
  closingLong: { file: "/sounds/vault/closing_long.mp3", duration: 60000 }, // 1m
  doorHum: { file: "/sounds/vault/door_hum.mp3", duration: 8000 },      // 8s loopable
  doorRumble: { file: "/sounds/vault/door_rumble.mp3", duration: 4000 },// 4s
  portalThud: { file: "/sounds/vault/portal_thud.mp3", duration: 1000 },// 1s
  unlockChime: { file: "/sounds/vault/unlock_chime.mp3", duration: 3000 }, // ~3s dissolve cue

  // 🎛 You can add your other 10+ special FX here
  // e.g. whispers, alarms, gears, breezes, seals, etc.
};

// 🎧 Hooked function to trigger any vault sound by name
export function useVaultSounds() {
  const playSound = usePlaySound();

  const playVaultSound = (
    key: keyof typeof vaultSounds,
    opts?: { loop?: boolean; volume?: number }
  ) => {
    const sound = vaultSounds[key];
    if (!sound) {
      console.warn(`🚨 No vault sound mapped for key: ${key}`);
      return;
    }
    playSound(sound.file, { loop: opts?.loop ?? false, volume: opts?.volume ?? 0.8 });
    return sound.duration; // handy for sequencing timers
  };

  return { playVaultSound };
}
