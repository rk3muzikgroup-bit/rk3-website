"use client";
import SafeVideo from "@/components/SafeVideo";

export default function VaultClosing() {
  return (
    <div className="h-screen w-screen relative bg-black">
      {/* Placeholder video — replace vault_closing.mp4 later */}
      <SafeVideo src="/videos/vault_closing.mp4" />

      {/* Overlay text for placeholder mode */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold mb-4">🔒 Vault Closing</h1>
        <p className="text-lg opacity-80">Cinematic Placeholder Sequence</p>
      </div>
    </div>
  );
}
