"use client";

import VaultLayout from "@/components/VaultLayout";
import MerchFX from "@/components/vault/MerchFX";

export default function MerchVault() {
  return (
    <VaultLayout title="🛍️ Merch Vault">
      {/* Background mural */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/assets/vault/merch_mural.png"
          alt="Merch Mural"
          className="h-full w-full object-cover opacity-40"
        />
      </div>

      {/* FX overlay */}
      <MerchFX />

      {/* Content zone */}
      <div className="relative z-10 text-white text-center space-y-6">
        <p className="text-lg">RK3 exclusive drops & collectibles</p>

        {/* Product grid */}
        <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="rounded-lg bg-yellow-500/20 p-4 hover:bg-yellow-500/30">
            <img
              src="/assets/vault/merch_item1.png"
              alt="Item 1"
              className="mx-auto mb-2 h-24 w-24 object-contain"
            />
            <p className="font-semibold">Item 1</p>
          </div>
          <div className="rounded-lg bg-yellow-500/20 p-4 hover:bg-yellow-500/30">
            <img
              src="/assets/vault/merch_item2.png"
              alt="Item 2"
              className="mx-auto mb-2 h-24 w-24 object-contain"
            />
            <p className="font-semibold">Item 2</p>
          </div>
          <div className="rounded-lg bg-yellow-500/20 p-4 hover:bg-yellow-500/30">
            <img
              src="/assets/vault/merch_item3.png"
              alt="Item 3"
              className="mx-auto mb-2 h-24 w-24 object-contain"
            />
            <p className="font-semibold">Item 3</p>
          </div>
        </div>
      </div>
    </VaultLayout>
  );
}
