export type RoomConfig = {
  video: string;
  sound: string;
  label: string;
  color: string;
  special?: string;
  access: "open" | "gold" | "platinum"; // 🚨 access level
};
// minimal placeholder so imports succeed. Replace with real room config later.
export const ROOMS = {
  default: {
    id: 'default',
    name: 'Default Room',
    description: 'Placeholder room config'
  }
};

export default ROOMS;

export const roomConfig: Record<string, RoomConfig> = {
  self_love: {
    video: "/videos/rooms/self_love.mp4",
    sound: "/sounds/rooms/self_love.mp3",
    label: "Self Love",
    color: "pink",
    special: "/sounds/rooms/i_love_you.mp3",
    access: "open", // ✅ free
  },
  healing: {
    video: "/videos/rooms/healing.mp4",
    sound: "/sounds/rooms/healing.mp3",
    label: "Healing",
    color: "green",
    special: "/sounds/rooms/you_are_whole.mp3",
    access: "gold", // 🔒 requires Gold
  },
  legacy: {
    video: "/videos/rooms/legacy.mp4",
    sound: "/sounds/rooms/legacy.mp3",
    label: "Legacy",
    color: "blue",
    special: "/sounds/rooms/you_will_be_remembered.mp3",
    access: "platinum", // 🔒 requires Platinum
  },
};
