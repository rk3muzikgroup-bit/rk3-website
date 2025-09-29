// hooks/useCurrentLocation.ts
"use client";

import { usePathname } from "next/navigation";

export function useCurrentLocation() {
  const pathname = usePathname();

  if (pathname.startsWith("/vault/street")) return "Street Portal";
  if (pathname.startsWith("/vault/soul")) return "Soul Portal";
  if (pathname.startsWith("/vault/spirit")) return "Spirit Portal";
  if (pathname.startsWith("/vault/healing")) return "Healing Frequencies Room";

  if (pathname === "/vault") return "Vault Entry";
  if (pathname === "/world") return "World Main";

  return "Exploring";
}
