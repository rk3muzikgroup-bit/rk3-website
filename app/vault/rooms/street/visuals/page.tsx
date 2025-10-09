"use client";

import CosmicBackground from "@/components/CosmicBackground";
import { useRouter } from "next/navigation";

export default function StreetVisualsPage() {
  const router = useRouter();

  return (
    <div className="relative h-screen w-screen overflow-hidden text-white">
      <CosmicBackground />
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-8">
        <h1 className="text-5xl font-bold mb-6">🎬 Street Visuals</h1>
        <p className="max-w-2xl text-center opacity-80 mb-10">
          Visual poetry of the streets — cinematic moments, neon grit, and real life in motion.
        </p>
        <button
          onClick={() => router.push("/street")}
          className="px-8 py-4 bg-gray-800 rounded-xl text-lg hover:scale-105 transition-transform"
        >
          ⬅ Back to Street
        </button>
      </div>
    </div>
  );
}
