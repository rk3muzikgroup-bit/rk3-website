import type { Chakra } from "@/hooks/useAudioMixer";

export function chakraColor(chakra?: Chakra) {
  switch (chakra) {
    case "root":
      return "#DC2626"; // red
    case "sacral":
      return "#F97316"; // orange
    case "solar":
      return "#FACC15"; // yellow
    case "heart":
      return "#22C55E"; // green
    case "throat":
      return "#3B82F6"; // blue
    case "thirdEye":
      return "#6366F1"; // indigo
    case "crown":
      return "#A855F7"; // violet
    default:
      return "#94A3B8"; // neutral slate
  }
}

export function avatarSeed(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}
