import type { Chakra } from "@/hooks/useAudioMixer";

/* ───────── CONSTANT ───────── */

export const BUILDER_INJECT_KEY = "rks3:builderInject";

/* ───────── TYPES ───────── */

export type BuilderInjectPayload = {
  id: string;
  title: string;
  chakra?: Chakra;
  frequency?: number;
  tags?: string[];
};

/* ───────── API ───────── */

export function injectIntoBuilder(
  payload: BuilderInjectPayload
) {
  if (typeof window === "undefined") return;

  localStorage.setItem(
    BUILDER_INJECT_KEY,
    JSON.stringify(payload)
  );
}

export function consumeBuilderInject():
  | BuilderInjectPayload
  | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(BUILDER_INJECT_KEY);
    if (!raw) return null;

    localStorage.removeItem(BUILDER_INJECT_KEY);
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
