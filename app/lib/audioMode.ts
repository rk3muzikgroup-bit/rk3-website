export type AudioMode =
  | {
      mode: "pure";
    }
  | {
      mode: "binaural";
      brainwave: "delta" | "theta" | "alpha" | "beta" | "gamma";
    };

export const DEFAULT_AUDIO_MODE: AudioMode = {
  mode: "pure",
};
