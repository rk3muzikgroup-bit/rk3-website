export interface VaultDrop {
  id: string;
  title: string;
  artist: string;
  type: "ride" | "mixtape" | "artifact" | "exclusive";
  locked: boolean;
  description?: string;
  path?: string; // e.g. "/public/videos/ride/Street_Ride.mp4"
}

export const vaultDrops: VaultDrop[] = [
  {
    id: "ride-street",
    title: "Street Ride",
    artist: "RK3",
    type: "ride",
    locked: false,
    description: "The raw energy of the streets — cinematic ride sequence.",
    path: "/videos/ride/Street_Ride.mp4",
  },
  {
    id: "ride-soul",
    title: "Soul Journey",
    artist: "RK3",
    type: "ride",
    locked: false,
    description: "Deep meditative journey through sound and spirit.",
    path: "/videos/ride/Soul_Ride.mp4",
  },
  {
    id: "ride-spirit",
    title: "Spirit Flight",
    artist: "RK3",
    type: "ride",
    locked: true,
    description: "Ascend into the Spirit dimension — available soon.",
    path: "/videos/ride/Spirit_Ride.mp4",
  },
  {
    id: "mixtape-1",
    title: "Mixtape Vol. 1",
    artist: "RK3",
    type: "mixtape",
    locked: true,
    description: "Exclusive first mixtape drop for Platinum Vault members.",
  },
  {
    id: "artifact-sunstone",
    title: "Aztec Sun Stone",
    artist: "RK3 Museum",
    type: "artifact",
    locked: true,
    description: "Ancient artifact unlocked in the Galactic Museum.",
  },
];
