"use client";

import { useState } from "react";
import { MARKET_ITEMS } from "@/lib/marketplace";

type Props = {
  onInstall: (payloadRef: string) => void;
};

export default function MarketplaceHUD({ onInstall }: Props) {
  const [installing, setInstalling] = useState<string | null>(null);

  function handleInstall(payloadRef: string) {
    if (installing) return;

    setInstalling(payloadRef);
    onInstall(payloadRef);

    // visual debounce only (logic lives upstream)
    setTimeout(() => setInstalling(null), 800);
  }

  if (!MARKET_ITEMS.length) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 w-80 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl p-4 pointer-events-none"
      aria-hidden
    >
      <div className="pointer-events-auto">
        <div className="text-sm tracking-widest uppercase mb-3 opacity-70">
          Marketplace
        </div>

        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {MARKET_ITEMS.map(item => {
            const isInstalling =
              installing === item.payloadRef;

            return (
              <div
                key={item.id}
                className="bg-white/5 hover:bg-white/10 rounded p-3 transition"
              >
                <div className="text-sm font-medium">
                  {item.title}
                </div>

                <div className="text-xs opacity-60 mb-1">
                  by {item.creator.name}
                </div>

                <div className="text-xs opacity-70 mb-2">
                  {item.description}
                </div>

                <button
                  disabled={isInstalling}
                  onClick={() =>
                    handleInstall(item.payloadRef)
                  }
                  className={`w-full text-xs py-1.5 rounded transition ${
                    isInstalling
                      ? "bg-white/20 text-white cursor-wait"
                      : "bg-emerald-500 text-black hover:bg-emerald-400"
                  }`}
                >
                  {isInstalling ? "Installing…" : "Install"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
