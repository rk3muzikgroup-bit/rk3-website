// config/rooms.ts
export type Room = {
  slug: string;
  title: string;
  subtitle?: string;
  cover: string;          // e.g. /vault/<slug>/cover.png
  accent?: "street" | "soul" | "spirit" | "gold";
  blurb?: string;
  downloads?: { label: string; href: string }[];
  tags?: string[];
};

export const ROOMS: Room[] = [
  {
    slug: "self-love",
    title: "Self-Love",
    subtitle: "Compassion • Center • Bloom",
    cover: "/vault/self-love/cover.png",
    accent: "soul",
    blurb: "Artifacts and moments themed around self-love. Visuals, audio snippets, and prompts.",
    tags: ["warm", "gold", "flow"],
  },
  {
    slug: "self-worth",
    title: "Self-Worth",
    subtitle: "Value • Ground • Presence",
    cover: "/vault/self-worth/cover.png",
    accent: "street",
    blurb: "Confidence builders. Visual affirmations and interactive modules.",
    tags: ["grit", "neon", "pace"],
  },
  {
    slug: "healing",
    title: "Healing",
    subtitle: "Restore • Breath • Space",
    cover: "/vault/healing/cover.png",
    accent: "spirit",
    blurb: "Gentle visuals, guided audio, and breath cadences.",
    tags: ["indigo", "ether"],
  },
  {
    slug: "legacy",
    title: "Legacy",
    subtitle: "Impact • Archive • Code",
    cover: "/vault/legacy/cover.png",
    accent: "gold",
    blurb: "Artifacts that last — messages, clips, and vault keys.",
    tags: ["future"],
  },
];
