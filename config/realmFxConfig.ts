// /config/realmFxConfig.ts

export type RealmStyle = "street" | "soul" | "spirit" | "cosmic";

export const realmFxConfig: Record<
  RealmStyle,
  {
    flash: "pulse" | "glow" | "flare" | "supernova";
    ripple: "glitch" | "wave" | "spark" | "quantum";
    burst: "fracture" | "bloom" | "starlight" | "nebula";
    idleAnimation: any;
    idleTransition: any;
  }
> = {
  street: {
    flash: "pulse",
    ripple: "glitch",
    burst: "fracture",
    idleAnimation: {
      opacity: [0.6, 1, 0.4, 1],
      scale: [1, 1.1, 0.95, 1], // glitch flicker
    },
    idleTransition: { duration: 0.6, repeat: Infinity, ease: "linear" },
  },
  soul: {
    flash: "glow",
    ripple: "wave",
    burst: "bloom",
    idleAnimation: {
      scale: [1, 1.2, 1],
      opacity: [0.7, 1, 0.7], // soft pulse
    },
    idleTransition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
  spirit: {
    flash: "flare",
    ripple: "spark",
    burst: "starlight",
    idleAnimation: {
      opacity: [0.5, 1, 0.5],
      rotate: [0, 5, -5, 0], // star twinkle
    },
    idleTransition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
  cosmic: {
    flash: "supernova",
    ripple: "quantum",
    burst: "nebula",
    idleAnimation: {
