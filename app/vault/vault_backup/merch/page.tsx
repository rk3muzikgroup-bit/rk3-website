"use client";

import { useRouter } from "next/navigation";
import { usePlaySound } from "@/hooks/usePlaySound";

export default function MerchPage() {
  const router = useRouter();
  const playSound = usePlaySound();

  const goBack = () => {
    playSound("vault/unlock");
    router.push("/vault");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center max-w-2xl p-6">
        <h1 className="text-4xl font-bold mb-4">🛍️ Merch Portal</h1>
        <p className="text-lg text-gray-300 mb-6">
          Exclusive RK3 drops, fashion, and collectibles — soul on your sleeve.
        </p>
        <button
          onClick={goBack}
          className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 transition font-semibold"
        >
          ⬅ Back to Vault
        </button>
      </div>
    </main>
  );
}
export default function MerchPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center max-w-2xl p-6">
        <h1 className="text-4xl font-bold mb-4">🛍️ Merch Portal</h1>
        <p className="text-lg text-gray-300 mb-6">
          Welcome to the RK3 Merch Portal — where Street • Soul • Spirit 
          come to life in exclusive drops, gear, and collectibles.
        </p>

        <div className="grid grid-cols-2 gap-6 mt-8">
          {/* Example placeholders — swap these out for real merch items */}
          <div className="p-4 rounded-2xl bg-white/10 shadow-md hover:bg-indigo-700 transition cursor-pointer">
            <h2 className="font-semibold text-xl">SOUL • STREET • SPIRIT Tee</h2>
            <p className="text-gray-400 text-sm">Classic RK3 t-shirt design</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/10 shadow-md hover:bg-indigo-700 transition cursor-pointer">
            <h2 className="font-semibold text-xl">RK3 Hoodie</h2>
            <p className="text-gray-400 text-sm">Indigo Blue • Emerald Green • Gold</p>
          </div>
        </div>
      </div>
    </main>
  );
}
