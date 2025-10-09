"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
"use client";

import { useRouter } from "next/navigation";
import { usePlaySound } from "@/hooks/usePlaySound";
export default function MusicPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center max-w-2xl p-6">
        <h1 className="text-4xl font-bold mb-4">🎧 Music Portal</h1>
        <p className="text-lg text-gray-300">
          Beats, vocals, and vibrations — the Music Portal is where RK3 sounds live.
        </p>
      </div>
    </main>
  );
}

export default function VaultClosingPage() {
  const router = useRouter();
  const [fadeOut, setFadeOut] = useState(false);

  // 🔑 Set vault label here
  const label = "MUSIC"; // change to AUDIOBOOKS, AVATARS, HEALING, etc.

  useEffect(() => {
    // 2.5s → fade trigger
    const fadeTimer = setTimeout(() => setFadeOut(true), 2500);

    // 11s → auto return home
    const returnTimer = setTimeout(() => {
      router.push("/");
    }, 11000);

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
      <h1 className="text-4xl font-bold tracking-widest">
        {label} VAULT SEALED
      </h1>
    </div>
  );
const router = useRouter();
const playSound = usePlaySound();

const goBack = () => {
  playSound("vault/unlock");
  router.push("/vault");
};
}
<button
  onClick={goBack}
  className="mt-8 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 transition font-semibold"
>
  ⬅ Back to Vault
</button>
