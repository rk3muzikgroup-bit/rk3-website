"use client";

import ReturnVaultButton from "@/components/vault/ReturnVaultButton";

export default function VaultFinal() {
  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center text-white font-mono">
      {/* Background video */}
      <video
        src="/videos/cockpit/cockpit_loop.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
        <h1 className="text-4xl text-yellow-400">🚪 The Final Room</h1>
      </div>

      {/* Return button */}
      <ReturnVaultButton />
    </div>
  );
}
