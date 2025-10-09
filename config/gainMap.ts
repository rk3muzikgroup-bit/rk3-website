// 🎚 RK3 Hollywood Gain Map

export const soundGains: Record<string, number> = {
  // Vault SFX
  "/sounds/vault/unlock.mp3": 0.85,
  "/sounds/vault/denied_blast.mp3": 0.9,
  "/sounds/vault/door_close.mp3": 0.75,
  "/sounds/vault/closing_long.mp3": 0.7,
  "/sounds/vault/door_hum.mp3": 0.25,

  // Ride SFX
  "/sounds/ride/rocket_whoosh.mp3": 0.8,
  "/sounds/ride/transition_whoosh.mp3": 0.7,

  // Room Ambients
  "/sounds/rooms/self_love.mp3": 0.3,
  "/sounds/rooms/healing.mp3": 0.3,
  "/sounds/rooms/legacy.mp3": 0.3,

  // Room Specials (Whispers / Affirmations)
  "/sounds/rooms/i_love_you.mp3": 0.45,
  "/sounds/rooms/you_are_whole.mp3": 0.45,
  "/sounds/rooms/you_will_be_remembered.mp3": 0.45,
};

export const videoGains: Record<string, number> = {
  // Rides
  "/videos/ride/Street_Ride.mp4": 0.5,
  "/videos/ride/Soul_Ride.mp4": 0.5,
  "/videos/ride/Spirit_Ride.mp4": 0.5,

  // Rooms
  "/videos/rooms/self_love.mp4": 0.35,
  "/videos/rooms/healing.mp4": 0.35,
  "/videos/rooms/legacy.mp4": 0.35,

  // Cockpit
  "/videos/cockpit/cockpit_loop.mp4": 0.4,

  // Vault Door
  "/videos/vault/doors_open.mp4": 0.45, // 🎬 cinematic balance
};
