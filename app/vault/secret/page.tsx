"use client";

import { useRouter } from "next/navigation";
import { usePlaySound } from "@/hooks/usePlaySound";

export default function SecretPage() {
  const router = useRouter();
  const playSound = usePlaySound();

  const goBack = () => {
    playSound("vault/unlock");
    router.push("/vault");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center max-w-2xl p-6">
        <h1 className="text-4xl font-bold mb-4">🔮 Secret Portal</h1>
        <p className="text-lg text-gray-300 mb-6">
          Hidden knowledge, mystery, and codes — the Secret Portal is unlocked only by the chosen.
        </p>
        <button
          onClick={goBack}
          className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 transition font-semibold"
        >
          ⬅ Back to Vault
        </button>
      </div>
    </main>
  );
}
