"use client";

import { HUDVolume } from "@/components/HUDVolume";
import { useRouter } from "next/navigation";

export default function MusicPortal() {
  const router = useRouter();

  // Mock content for now
  const content = [
    { title: "Healing Frequencies Mix", type: "Audio", saved: "2d ago" },
    { title: "Neo-Soul Vault Track", type: "Audio", saved: "5d ago" },
    { title: "Street Soul Spirit Anthem", type: "Audio", saved: "1w ago" },
  ];

  return (
    <div className="relative w-full h-screen bg-black text-white overflow-hidden">
      {/* Background loop */}
      <video
        src="/videos/portals/music_bg.mp4"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* HUD */}
      <div className="absolute top-4 right-4 z-20">
        <HUDVolume />
      </div>

      {/* Header */}
      <div className="relative z-10 p-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-wide">🎧 Music Portal</h1>
        <button
          onClick={() => router.push("/vault/portals")}
          className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-sm"
        >
          🔙 Back to Vault
        </button>
      </div>

      {/* Content Grid */}
      <div className="relative z-10 grid grid-cols-3 gap-6 p-8">
        {content.map((item, idx) => (
          <div
            key={idx}
            className="bg-gray-900/80 p-4 rounded-xl shadow hover:shadow-lg hover:scale-105 transition transform"
          >
            <p className="text-lg font-semibold">{item.title}</p>
            <p className="text-sm text-gray-400">{item.type} • Saved {item.saved}</p>
            <button className="mt-3 px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-sm">
              Play ▶️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
