"use client";

import { useEffect, useState } from "react";
import ProfileGuideOverlay from "@/components/ProfileGuideOverlay";

const mockSaved = [
  { id: 1, name: "Neo-Soul Track 001", type: "song" },
  { id: 2, name: "Healing Frequency A432", type: "artifact" },
  { id: 3, name: "Street Tape Vol. 1", type: "mixtape" },
];

export default function ProfilePage() {
  const [saved, setSaved] = useState(mockSaved);

  useEffect(() => {
    // TODO: replace with real DB fetch
  }, []);

  return (
    <div className="w-screen h-screen bg-black text-white relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-[url('/backgrounds/starfield.jpg')] bg-cover opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/90" />

      {/* Page Content */}
      <div className="relative z-10 max-w-4xl mx-auto p-10">
        <h1
          className="text-4xl font-bold text-emerald-300 mb-8"
          style={{ textShadow: "0 0 16px rgba(0,255,200,0.8)" }}
        >
          Family Profile
        </h1>

        <p className="mb-6 text-gray-300">
          Welcome back, <span className="text-indigo-300">[Username]</span>.  
          This is your cockpit vault — all your saved content stays here.
        </p>

        {/* Saved Items */}
        <div className="grid grid-cols-1 gap-6">
          {saved.map((item) => (
            <div
              key={item.id}
              className="p-6 border border-emerald-400 rounded-lg bg-transparent drop-shadow-[0_0_12px_rgba(0,255,200,0.3)] flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-bold">{item.name}</h2>
                <p className="text-sm text-gray-400 uppercase">{item.type}</p>
              </div>

              {/* RKS3.COM watermark */}
              <span className="text-xs text-gray-500 italic">© RKS3.COM</span>

              {/* Download only if mixtape */}
              {item.type === "mixtape" && (
                <button className="ml-4 px-4 py-2 border border-yellow-400 text-yellow-300 rounded-lg hover:scale-105 transition">
                  Download
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Guide Overlay Trigger */}
      <ProfileGuideOverlay />
    </div>
  );
}
