"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function HealingPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center max-w-2xl p-6">
        <h1 className="text-4xl font-bold mb-4">🌀 Healing Portal</h1>
        <p className="text-lg text-gray-300">
          Sound, frequency, and energy tools for balance — enter the Healing Portal.
        </p>
      </div>
    </main>
  );
}
"use client";

import { useRouter } from "next/navigation";
import { usePlaySound } from "@/hooks/usePlaySound";

export default function VaultClosingPage() {
  const router = useRouter();
  const [fadeOut, setFadeOut] = useState(false);

  const label = "HEALING";

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 2500);
    const returnTimer = setTimeout(() => router.push("/"), 11000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(returnTimer);
    };
  }, [router]);

  return (
    <div
      className={`relative flex items-center justify-center min-h-screen bg-black text-white transition-opacity duration-2000 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <h1 className="text-4xl font-bold tracking-widest">{label} VAULT SEALED</h1>
    </div>
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

