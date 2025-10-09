"use client";

import useFailHandler from "@/hooks/useFailHandler";

export default function VaultFailDemo() {
  const fail = useFailHandler();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-8">🚨 Vault Access Test</h1>
      <button
        onClick={fail}
        className="px-8 py-4 bg-red-600 text-white text-xl font-semibold rounded-lg shadow-lg hover:bg-red-700 transition"
      >
        Trigger Fail
      </button>
    </div>
  );
}
