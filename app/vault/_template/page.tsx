"use client";

import VaultLayout from "@/components/VaultLayout";

export default function FutureVault() {
  return (
    <VaultLayout title="🔒 Future Vault">
      {/* Background mural placeholder */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/assets/vault/future_mural.png"
          alt="Future Vault Mural"
          className="h-full w-full object-cover opacity-40"
        />
      </div>

      {/* Optional FX overlay placeholder */}
      {/* Example: <FutureFX /> */}

      {/* Content zone */}
      <div className="relative z-10 text-white text-center space-y-6">
        <p className="text-lg">This chamber is not yet unlocked.</p>
        <p className="opacity-70">Stay tuned — something special is coming soon.</p>
      </div>
    </VaultLayout>
  );
}
