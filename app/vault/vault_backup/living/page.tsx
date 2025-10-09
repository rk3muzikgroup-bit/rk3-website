"use client";

import { useRouter } from "next/navigation";
import { usePlaySound } from "@/hooks/usePlaySound";
export default function LivingRoomPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center max-w-2xl p-6">
        <h1 className="text-4xl font-bold mb-4">🛋️ Living Room</h1>
        <p className="text-lg text-gray-300 mb-6">
          This is the heart of the Vault — the center where all 13 portals come
          together. Chill, connect, and vibe before exploring deeper.
        </p>

        <div className="mt-10 flex flex-col space-y-4">
          <button className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 transition font-semibold">
            Return to Vault
          </button>
          <button className="px-6 py-3 rounded-2xl bg-green-600 hover:bg-green-700 transition font-semibold">
            Explore Portals
          </button>
        </div>
      </div>
    </main>
  );
}const router = useRouter();
const playSound = usePlaySound();

const goBack = () => {
  playSound("vault/unlock");
  router.push("/vault");
};
<button
  onClick={goBack}
  className="mt-8 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 transition font-semibold"
>
  ⬅ Back to Vault
</button>

