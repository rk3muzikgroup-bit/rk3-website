export type PortalConfig = {
  cycle: boolean;
  duration: number;
  fadeOutDelay: number;
  fadeSpeed: number;
  showCountdown: "always" | "hover" | "off";
};

export const portalConfig: Record<string, PortalConfig> = {
  street: {
    cycle: true,
    duration: 20000,
    fadeOutDelay: 4000,
    fadeSpeed: 0.5,
    showCountdown: "always",
  },
  soul: {
    cycle: true,
    duration: 20000,
    fadeOutDelay: 5000,
    fadeSpeed: 1,
    showCountdown: "hover",
  },
  spirit: {
    cycle: true,
    duration: 15000,
    fadeOutDelay: 3000,
    fadeSpeed: 0.8,
    showCountdown: "off",
  },
  livingroom: {
    cycle: true,
    duration: 25000,
    fadeOutDelay: 6000,
    fadeSpeed: 1,
    showCountdown: "always",
  },
  healing: {
    cycle: true,
    duration: 18000,
    fadeOutDelay: 4000,
    fadeSpeed: 0.6,
    showCountdown: "hover",
  },
  // add more portals here as you expand the 13
};
