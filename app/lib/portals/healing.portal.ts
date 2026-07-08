// app/lib/portals/healing.portal.ts

import type { PortalSurface } from "@/context/PortalSurfaceContext";

export type PortalPreset = {
  id: string;
  label: string;

  defaultView: PortalSurface;

  hud: {
    glowColor: string;
    glowStrength: number;
    chakraHighlight: boolean;
    opacity: number;
  };

  ambience: {
    ambient: string;
    reverb: number;
    tempo: "slow" | "medium" | "fast";
  };

  invocation?: string;
};

export const healingPortalPreset: PortalPreset = {
  id: "healing",
  label: "Healing Portal",

  // 🧭 surface state on entry
  defaultView: "browse",

  // 🧠 HUD behavior
  hud: {
    glowColor: "rgba(52,211,153,0.6)", // emerald normalized
    glowStrength: 0.25,
    chakraHighlight: true,
    opacity: 1,
  },

  // 🌊 ambient system
  ambience: {
    ambient: "cosmic_pad",
    reverb: 0.6,
    tempo: "slow",
  },

  // ✨ optional ritual text (used by PortalEntryRitual)
  invocation: "Breathe. You are safe here.",
};
