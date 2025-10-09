"use client";

import { useOverlay } from "@/context/OverlayContext";
import Orbs from "@/components/Orbs";
import Ethers from "@/components/Ethers";

export default function EffectsTestPage() {
  const { showOverlay, showChain } = useOverlay();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center space-y-12 text-white">
      {/* Section 1: Visual FX */}
      <section className="relative flex items-center justify-center w-full h-[50vh] overflow-hidden border-b border-white/20">
        <Ethers count={40} />
        <Orbs count={5} />
        <h1 className="text-4xl font-bold relative z-10">✨ Visual FX Test</h1>
      </section>

      {/* Section 2: Overlay FX */}
      <section className="flex flex-col items-center space-y-6">
        <h2 className="text-3xl font-bold">🎬 Overlay Effects Test</h2>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => showOverlay("granted", 2500, true)}
            className="px-4 py-2 bg-green-700 rounded"
          >
            ✅ Access Granted
          </button>

          <button
            onClick={() => showOverlay("denied", 2000, true)}
            className="px-4 py-2 bg-red-700 rounded"
          >
            ❌ Access Denied
          </button>

          <button
            onClick={() => showOverlay("launch", 3000, true)}
            className="px-4 py-2 bg-white text-black rounded"
          >
            🚀 Launch
          </button>

          <button
            onClick={() => showOverlay("street", 2500, true)}
            className="px-4 py-2 bg-indigo-700 rounded"
          >
            🏙 Street
          </button>

          <button
            onClick={() => showOverlay("soul", 2500, true)}
            className="px-4 py-2 bg-emerald-700 rounded"
          >
            💚 Soul
          </button>

          <button
            onClick={() => showOverlay("spirit", 2500, true)}
            className="px-4 py-2 bg-purple-700 rounded"
          >
            🌌 Spirit
          </button>

          <button
            onClick={() => showOverlay("closing", 5000, true)}
            className="px-4 py-2 bg-gray-700 rounded"
          >
            🔒 Closing
          </button>
        </div>

        <div className="mt-10">
          <button
            onClick={() =>
              showChain(
                [
                  { preset: "launch", duration: 2500 },
                  { preset: "spirit", duration: 2500 },
                  { preset: "granted", duration: 2500 },
                ],
                true
              )
            }
            className="px-6 py-3 bg-yellow-600 rounded"
          >
            🎞 Test Full Chain (Launch → Spirit → Granted)
          </button>
        </div>
      </section>
    </div>
  );
}
