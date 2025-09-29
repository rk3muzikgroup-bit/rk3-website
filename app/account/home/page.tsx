"use client";

import { useUser } from "@/hooks/useUser";
import { useState } from "react";

export default function AccountHome() {
  const user = useUser(); // { email, tier, ... }
  const [theme, setTheme] = useState("soul"); // default theme

  if (user?.tier !== "platinum") {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black text-white">
        <p>Upgrade to Platinum for your personalized chamber 🔐</p>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-screen bg-black text-white`}>
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-black/50">
        <h1 className="text-2xl font-bold">
          {user?.email}’s Chamber
        </h1>
        <button className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700">
          Settings ⚙️
        </button>
      </div>

      {/* Storage Bar */}
      <div className="px-6 mt-2">
        <div className="w-full bg-gray-700 h-3 rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-400 to-emerald-600 h-3 w-[30%]" />
        </div>
        <p className="text-sm mt-1 text-gray-300">30% of storage used</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 px-6 mt-6">
        <button className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700">All</button>
        <button className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700">🎶 Music</button>
        <button className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700">🎥 Videos</button>
        <button className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700">📚 Books</button>
        <button className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700">🌀 Healing</button>
      </div>

      {/* Saved Content Grid */}
      <div className="grid grid-cols-3 gap-6 p-6">
        <div className="bg-gray-900 p-4 rounded-xl shadow hover:shadow-lg">
          <p className="text-lg font-semibold">Song Title</p>
          <p className="text-sm text-gray-400">Music • Saved 2d ago</p>
        </div>
        <div className="bg-gray-900 p-4 rounded-xl shadow hover:shadow-lg">
          <p className="text-lg font-semibold">Healing Meditation</p>
          <p className="text-sm text-gray-400">Healing • Saved 5d ago</p>
        </div>
        <div className="bg-gray-900 p-4 rounded-xl shadow hover:shadow-lg">
          <p className="text-lg font-semibold">Ancient Wisdom PDF</p>
          <p className="text-sm text-gray-400">Book • Saved 1w ago</p>
        </div>
      </div>
    </div>
  );
}
