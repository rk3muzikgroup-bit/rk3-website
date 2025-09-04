import { useState } from "react";
import { useAmbient } from "@/components/AmbientProvider";
import CosmicBackground from "@/components/CosmicBackground";
import FinalOutro from "@/components/FinalOutro";

export default function FinalRoom() {
  useAmbient("/sounds/finalroom-ambience.mp3", 0.5);
  const [outro, setOutro] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden">
      <CosmicBackground videoSrc="/videos/vault-core.mp4" overlayColor="bg-black/60" />

      {!outro && (
        <>
          <h1 className="text-6xl font-bold z-10 mb-6">🚪 The Vault Core</h1>
          <p className="text-lg opacity-90 z-10 mb-10">
            You survived the blast. This is the heart of the Vault.
          </p>

          <button
            onClick={() => setOutro(true)}
            className="px-8 py-4 bg-yellow-600 hover:bg-yellow-700 rounded-2xl text-xl font-bold shadow-lg z-10"
          >
            End Journey ✨
          </button>
        </>
      )}

      <FinalOutro trigger={outro} path="final" />
    </div>
  );
}
