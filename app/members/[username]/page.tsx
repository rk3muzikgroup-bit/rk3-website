"use client";

import { useParams } from "next/navigation";
import { HUDVolume } from "@/components/HUDVolume";

export default function MemberProfile() {
  const { username } = useParams();

  // Mock user profile data
  const user = {
    username,
    avatar: "/images/avatar-placeholder.png",
    tier: "platinum",
    bio: "On a journey through Street • Soul • Spirit ✨",
    theme: "soul",
  };

  // Mock shared content
  const sharedContent = [
    { title: "Healing Mix", type: "Music", saved: "2d ago" },
    { title: "Cosmic Journal Entry", type: "Journal", saved: "5d ago" },
    { title: "Vault Anthem Video", type: "Video", saved: "1w ago" },
  ];

  return (
    <div className="relative w-full h-screen bg-black text-white overflow-hidden">
      {/* Background loop */}
      <video
        src={`/videos/portals/${user.theme}_bg.mp4`}
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

      {/* Profile Header */}
      <div className="relative z-10 flex flex-col items-center pt-12">
        <img
          src={user.avatar}
          alt="avatar"
          className="w-24 h-24 rounded-full border-4 border-indigo-500 shadow-lg"
        />
        <h1 className="mt-4 text-2xl font-bold">@{user.username}</h1>
        <p className="mt-2 text-gray-300 text-center max-w-lg">{user.bio}</p>

        {/* Follow Button (future social layer) */}
        <button className="mt-4 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700">
          Follow ✨
        </button>
      </div>

      {/* Shared Content Grid */}
      <div className="relative z-10 grid grid-cols-3 gap-6 p-8 mt-8">
        {sharedContent.map((item, idx) => (
          <div
            key={idx}
            className="bg-gray-900/80 p-4 rounded-xl shadow hover:shadow-lg hover:scale-105 transition transform"
          >
            <p className="text-lg font-semibold">{item.title}</p>
            <p className="text-sm text-gray-400">{item.type} • Shared {item.saved}</p>
            <button className="mt-3 px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-sm">
              View 🔍
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
