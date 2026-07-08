import { FREQUENCY_PORTALS } from "./frequencyRegistry";
import type { SessionPayload } from "@/hooks/useSessionEngine";

/**
 * Builds instant-play sessions from Frequency Portals
 * (used for Vault, Quick Play, Prebuilt Experiences)
 */
export function buildFrequencySessions(): Record<string, SessionPayload> {
  const sessions: Record<string, SessionPayload> = {};

  FREQUENCY_PORTALS.forEach(portal => {
    sessions[portal.id] = {
      id: portal.id,
      title: portal.label,
      steps: [
        {
          id: `${portal.id}-step`,
          duration: 3 * 60_000, // 3 minutes default
          chakra: portal.chakra ?? "heart",

          /** 🧠 NEW ARCHITECTURE */
          frequencyId: portal.frequencyId,
          brainwave: portal.brainwave,

          /** optional voice overlay (NOT frequency audio) */
          voice: undefined,
          caption: portal.description,
        },
      ],
    };
  });

  return sessions;
}
