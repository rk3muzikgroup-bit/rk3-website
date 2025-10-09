"use client";

import HUDVolume from "@/components/HUDVolume";
import { useRouter } from "next/navigation";

export default function LivingRoom() {
  const router = useRouter();

  // Mock posts for now
  const posts = [
    {
      user: "@soulseeker",
      avatar: "/images/avatar-placeholder.png",
      title: "Healing Frequencies Mix",
      type: "Music",
      shared: "2h ago",
    },
    {
      user: "@cosmicjourney",
      avatar: "/images/avatar-placeholder.png",
      title: "Journal: Vision from Meditation",
      type: "Journal",
      shared: "5h ago",
    },
    {
      user: "@rk3fan",
      avatar: "/images/avatar-placeholder.png",
      title: "Street Soul Spirit Anthem (Live)",
      type: "Video",
      shared: "1d ago",
    },
  ];

  return (
    <div className="relative w-full h-screen bg-black text-white overflow-hidden">
      {/* Background: warm lounge glow */}
      <video
        src="/videos/livingroom_bg.mp4"
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
      <div className="relative z-10 flex items-center justify-between p-6">
        <h1 className="text-3xl font-bold">🛋️ The Living Room</h1>
        <button
          onClick={() => router.push("/vault/portals")}
          className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-sm"
        >
          🔙 Back to Vault
        </button>
      </div>

      {/* Posts */}
      <div className="relative z-10 flex flex-col space-y-6 p-6 max-h-[80vh] overflow-y-scroll">
        {posts.map((post, idx) => (
          <div
            key={idx}
            className="bg-gray-900/80 p-6 rounded-2xl shadow-lg border border-indigo-600/40 
                       hover:border-emerald-400/40 hover:scale-[1.01] transition transform"
          >
            {/* User Info */}
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={post.avatar}
                alt="avatar"
                className="w-12 h-12 rounded-full border-2 border-indigo-500 shadow"
              />
              <div>
                <p className="font-semibold">{post.user}</p>
                <p className="text-xs text-gray-400">Shared {post.shared}</p>
              </div>
            </div>

            {/* Post Content */}
            <p className="text-lg font-semibold">{post.title}</p>
            <p className="text-sm text-gray-400">{post.type}</p>

            {/* Actions */}
            <div className="flex space-x-4 mt-4">
              <button className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-sm">
                ❤️ Like
              </button>
              <button className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-sm">
                ⭐ Save to My Vault
              </button>
              <button
                onClick={() => router.push(`/members/${post.user.replace("@", "")}`)}
                className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-sm"
              >
                Visit Chamber 🔍
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
