// app/lib/portals/index.ts

import type { PortalPreset } from "./healing.portal";
import { healingPortalPreset } from "./healing.portal";

/* ───────── PORTAL REGISTRY ───────── */

export const PORTALS: Record<string, PortalPreset> = {
  healing: healingPortalPreset,
};

/* ───────── TYPES ───────── */

export type PortalId = keyof typeof PORTALS;
export type Portal = (typeof PORTALS)[PortalId];
