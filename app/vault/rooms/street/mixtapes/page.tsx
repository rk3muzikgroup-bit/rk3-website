"use client";

import { useRouter } from "next/navigation";
import CosmicBackground from "@/components/CosmicBackground";
import { streetMixtapes } from "@/data/tracks/mixtapes";
import TrackPlayer from "@/components/TrackPlayer";

export default function StreetMixtapesPage() {
  const router = useRouter();

  return (
    <div className="relative h-screen w-screen overflow-hidden text-white">
      <CosmicBackground />

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-8 overflow-y-auto">
        <h1 className="text-5xl font-bold mb-6">🔊 Street Mixtapes</h1>
        <p className="max-w-2xl text-center opacity-80 mb-10">
          Exclusive blends, extended mixes, and street tapes — beats, bars, and truth in motion.
        </p>

        {/* Mixtape List */}
        <div className="grid gap-8 w-full max-w-4xl">
          {streetMixtapes.map((mix, i) => (
            <TrackPlayer key={i} track={mix} />
          ))}
        </div>

        {/* Back Button */}
        <button
          onClick={() => router.push("/vault/street")}
          className="mt-10 px-8 py-4 bg-gray-800 rounded-xl text-lg hover:scale-105 transition-transform"
        >
          ⬅ Back to Street
        </button>
      </div>
    </div>
  );
}
