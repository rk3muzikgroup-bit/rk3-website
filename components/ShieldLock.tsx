// components/ShieldLock.tsx
"use client";

export default function ShieldLock({ onUnlocked }: { onUnlocked: () => void }) {
  return (
    <div className="grid place-items-center min-h-[80vh]">
      <div className="text-center">
        <h2 className="text-xl font-semibold">RK3 • Vault Entry</h2>
        <p className="text-sm opacity-80 mt-1">Authenticate to proceed.</p>
        <button
          type="button"
          onClick={onUnlocked}
          className="mt-4 rounded-xl bg-white/10 px-4 py-2 hover:bg-white/15"
        >
          Unlock
        </button>
      </div>
    </div>
  );
}
