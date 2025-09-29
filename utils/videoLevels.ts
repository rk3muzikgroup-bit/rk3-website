// ✅ videoLevels.ts
// Map of all videos in public/videos

export const videoLevels: Record<string, string> = {
  // Entrance
  "nasa_flyby": "/videos/entrance/nasa_flyby.mp4",

  // Cockpit
  "cockpit_loop": "/videos/cockpit/cockpit_loop.mp4",

  // Rides
  "street_loop": "/videos/ride/street_loop.mp4",
  "soul_loop": "/videos/ride/soul_loop.mp4",
  "spirit_loop": "/videos/ride/spirit_loop.mp4",
  "warp": "/videos/ride/warp.mp4",

  // Vault
  "door_open": "/videos/vault/door_open.mp4",
  "door_idle": "/videos/vault/door_idle.mp4",
  "final_close": "/videos/vault/final_close.mp4",
  "denied": "/videos/vault/denied.mp4",

  // Rooms
  "self_love": "/videos/rooms/self_love.mp4",
  "healing": "/videos/rooms/healing.mp4",
  "legacy": "/videos/rooms/legacy.mp4",

  // Outro
  "outro_sequence": "/videos/outro/outro_sequence.mp4",
};

// ✅ Export type for valid video names
export type VideoName = keyof typeof videoLevels;
