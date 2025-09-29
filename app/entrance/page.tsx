"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { usePlaySound } from "@/hooks/usePlaySound";

export default function EntrancePage() {
  const router = useRouter();
  const playSound = usePlaySound();
  const [boarding, setBoarding] = useState(false);

  function handleBoardRide() {
    // 🚀 play rocket whoosh when boarding
    playSound("/sounds/ride/rocket_whoosh.mp3");
    setBoarding(true);

    // after cinematic delay, send to cockpit
    setTimeout(() => {
      router.push("/cockpit");
    }, 3000);
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl font-extrabold mb-6">🚀 Welcome to the RK3 Entrance</h1>
      <p className="mb-8 text-lg text-gray-300 max-w-xl">
        The journey begins here. Buckle up, prepare for launch, and ride into the Vault.
      </p>

      {!boarding ? (
        <button
          onClick={handleBoardRide}
          className="px-8 py-4 bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-lg text-xl"
        >
          Engage Ride
        </button>
      ) : (
        <p className="text-2xl text-yellow-400 animate-pulse">🚀 Boarding... Hold tight!</p>
      )}
    </main>
  );
}
