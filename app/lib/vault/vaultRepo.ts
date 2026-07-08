import type { VaultMeta } from "./vaultTypes";

const KEY = "rks3:vault";

function read(): VaultMeta[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

function write(v: VaultMeta[]) {
  localStorage.setItem(KEY, JSON.stringify(v));
}

export const vaultRepo = {
  setAccess(sessionId: string, access: VaultMeta["access"]) {
    const all = read().filter(v => v.sessionId !== sessionId);

    write([
      ...all,
      {
        sessionId,
        access,
        createdAt: Date.now(),
      },
    ]);
  },

  getAccess(sessionId: string): VaultMeta["access"] {
    return (
      read().find(v => v.sessionId === sessionId)?.access ??
      "private"
    );
  },
};
