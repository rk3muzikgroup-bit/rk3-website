"use client";

import { useRouter } from "next/navigation";
import { HUDVolume } from "@/components/HUDVolume";

const portals = [
  { name: "Street", path: "/portals/street", emoji: "🛹" },
  { name: "Soul", path: "/portals/soul", emoji: "🎶" },
  { name: "Spirit", path: "/portals/spirit", emoji: "✨" },
  { name: "Healing", path: "/portals/healing", emoji: "🌀" },
  { name: "Music", path: "/portals/music", emoji: "🎧" },
  { name: "Videos", path: "/portals/videos", emoji: "🎥" },
  { name: "Books", path: "/portals/books", emoji: "📚" },
  { name: "Legacy", path: "/portals/legacy", emoji: "🏛️" },
  { name: "Journal", path: "/portals/journal", emoji: "📝" },
  { name: "Avatars", path: "/portals/avatars", emoji: "👤" },
  { name: "Merch", path: "/portals/merch", emoji: "🛒" },
];

export default function PortalsPage() {
  const router = useRouter();

  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Background */}
      <video
        src="/videos/vault/vault_bg01.mp4"
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

      {/* Portal Grid */}
      <div className="relative z-10 grid grid-cols-3 gap-6 p-10">
        {portals.map((portal, idx) => (
          <button
            key={idx}
            onClick={() => router.push(portal.path)}
            className="flex flex-col items-center justify-center w-40 h-40 
                       rounded-2xl bg-gradient-to-br from-indigo-700 to-emerald-600 
                       text-white font-bold text-lg shadow-xl hover:scale-105 
                       hover:shadow-2xl transition transform"
          >
            <span className="text-3xl mb-2">{portal.emoji}</span>
            {portal.name}
          </button>
        ))}
      </div>
    </div>
  );
}
