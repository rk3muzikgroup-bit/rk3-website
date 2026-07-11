import type { Chakra } from "@/hooks/useAudioMixer";
import type { Brainwave } from "@/hooks/useBinauralEngine";

export type BuilderStep = {
  id: string;
  chakra: Chakra;
  duration: number; // ms
  brainwave?: Brainwave;
  voice?: string;
  caption?: string;
};
