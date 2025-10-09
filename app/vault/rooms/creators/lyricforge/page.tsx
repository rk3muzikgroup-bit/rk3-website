"use client";

import CosmicBackground from "@/components/CosmicBackground";
import { useRouter } from "next/navigation";

export default function LyricForgePage() {
  const router = useRouter();

  return (
    <div className="relative h-screen w-screen overflow-hidden text-white">
      <CosmicBackground />
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-8">
        <h1 className="text-5xl font-bold mb-6">✍️ Lyric Forge</h1>
        <p className="max-w-2xl text-center opacity-80 mb-10">
          Write verses, spoken word, and soul poetry. (Coming soon...)
        </p>
        <button
          onClick={() => router.push("/vault/rooms/creators")}
          className="px-8 py-4 bg-gray-800 rounded-xl text-lg"
        >
          ⬅ Back to Creator’s Chamber
        </button>
      </div>
    </div>
  );
}
