"use client";

import { useUser } from "@/hooks/useUser";
import { useState } from "react";

export default function AccountHome() {
  const user = useUser();
  const [theme, setTheme] = useState("soul");

  if (user?.tier !== "platinum") {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black text-white">
        <p>Upgrade to Platinum for your personalized chamber 🔐</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-black/50">
        <h1 className="text-2xl font-bold">{user?.email}’s Chamber</h1>
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
    </div>
  );
}
