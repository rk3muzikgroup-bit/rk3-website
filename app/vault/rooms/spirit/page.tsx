"use client";

import { useRouter } from "next/navigation";

export default function SpiritRoom() {
  const router = useRouter();

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <video
        src="/videos/vault/spirit_loop.mp4"
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6">
        <h1 className="text-4xl font-bold text-purple-400 drop-shadow-lg">Spirit Room</h1>
        <button
          onClick={() => router.push("/vault")}
          className="px-6 py-3 rounded-xl bg-yellow-500 text-black font-bold hover:bg-yellow-600"
        >
          ⬅ Return to Vault
        </button>
      </div>
    </div>
  );
}
