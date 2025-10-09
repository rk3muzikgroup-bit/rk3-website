"use client";

import { useRouter } from "next/navigation";
import { usePlaySound } from "@/hooks/usePlaySound";
export default function SpiritPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center max-w-2xl p-6">
        <h1 className="text-4xl font-bold mb-4">✨ Spirit Portal</h1>
        <p className="text-lg text-gray-300">
          High frequencies, alignment, and light — the Spirit Portal connects you to the beyond.
        </p>
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

