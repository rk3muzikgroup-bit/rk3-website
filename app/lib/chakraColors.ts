import type { Chakra } from "@/hooks/useAudioMixer";

export const CHAKRA_COLORS: Record<
  Chakra,
  {
    main: string;
    soft: string;
    strong: string;
  }
> = {
  root: {
    main: "#7c1d1d",
    soft: "#3f0d0d",
    strong: "#b91c1c",
  },
  sacral: {
    main: "#ea580c",
    soft: "#7c2d12",
    strong: "#fb923c",
  },
  solar: {
    main: "#facc15",
    soft: "#78350f",
    strong: "#fde047",
  },
  heart: {
    main: "#22c55e",
    soft: "#14532d",
    strong: "#4ade80",
  },
  throat: {
    main: "#38bdf8",
    soft: "#0c4a6e",
    strong: "#7dd3fc",
  },
  thirdEye: {
    main: "#6366f1",
    soft: "#312e81",
    strong: "#818cf8",
  },
  crown: {
    main: "#c084fc",
    soft: "#581c87",
    strong: "#e9d5ff",
  },
};
