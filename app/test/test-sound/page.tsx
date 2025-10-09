"use client";

import { usePlaySound } from "@/utils/usePlaySound";

const testSound = "/sounds/ride/rocket_whoosh.mp3";

export default function TestSoundPage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-blue-900 text-white space-y-6">
      <h1 className="text-3xl font-bold">Test Sound</h1>

      <button
        onClick={() => usePlaySound(testSound)}
        className="px-6 py-3 rounded bg-red-600 hover:bg-red-500"
      >
        Play Test Sound
      </button>
    </main>
  );
}
