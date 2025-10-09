"use client";

import VaultLayout from "@/components/VaultLayout";
import MusicFX from "@/components/vault/MusicFX";

export default function MusicVault() {
  return (
    <VaultLayout title="🎶 Music Vault">
      {/* Background mural */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/assets/vault/music_mural.png"
          alt="Music Mural"
          className="h-full w-full object-cover opacity-40"
        />
      </div>

      {/* FX overlay */}
      <MusicFX />

      {/* Content zone */}
      <div className="relative z-10 text-white text-center space-y-6">
        <p className="text-lg">Exclusive tracks & unreleased RK3 sounds</p>

        {/* Track grid */}
        <div className="grid grid-cols-2 gap-4 max-w-3xl mx-auto">
          <div className="rounded-lg bg-white/10 p-4 hover:bg-white/20">
            <p className="font-semibold">Track 1</p>
            <audio controls className="w-full mt-2">
              <source src="/sounds/track1.mp3" type="audio/mpeg" />
            </audio>
          </div>
          <div className="rounded-lg bg-white/10 p-4 hover:bg-white/20">
            <p className="font-semibold">Track 2</p>
            <audio controls className="w-full mt-2">
              <source src="/sounds/track2.mp3" type="audio/mpeg" />
            </audio>
          </div>
        </div>
      </div>
    </VaultLayout>
  );
}
