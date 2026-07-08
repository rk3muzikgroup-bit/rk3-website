export type SoulSession = {
  id: string;
  title: string;
  description: string;
  realm: "soul";
  audioFile: string;
};

export const SOUL_SESSIONS: SoulSession[] = [
  {
    id: "heart-reset-coherence",
    title: "Heart Reset (Coherence)",
    description:
      "A gentle heart-centered recalibration session designed to restore emotional balance and internal coherence.",
    realm: "soul",
    audioFile: "/sounds/frequencies/base-baths/heart-reset.wav",
  },
  {
    id: "7-day-heart-reset",
    title: "7-Day Heart Reset",
    description:
      "A daily heart-alignment practice guiding you through emotional clarity, regulation, and grounded presence.",
    realm: "soul",
    audioFile: "/sounds/frequencies/base-baths/heart_connection.wav",
  },
];
