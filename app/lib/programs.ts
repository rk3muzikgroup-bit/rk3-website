import { SESSIONS } from "@/lib/sessions";
import type { Program, ProgramDayStep } from "@/lib/programTypes";
import type { Chakra } from "@/hooks/useAudioMixer";

/* ───────── GENERATORS ───────── */

/**
 * Builds a chakra-focused multi-day program
 * Safe against missing sessions and future expansion
 */
function buildChakraProgram(
  chakra: Chakra,
  durationDays: number
): Program {
  const chakraSessions = Object.values(SESSIONS).filter(
    s => s.tags?.includes(`chakra:${chakra}`)
  );

  if (!chakraSessions.length) {
    // hard stop: program without sessions is invalid
    throw new Error(
      `No sessions found for chakra: ${chakra}`
    );
  }

  const days: ProgramDayStep[] = Array.from(
    { length: durationDays },
    (_, i) => {
      const session =
        chakraSessions[i % chakraSessions.length];

      return {
        day: i + 1,
        sessionId: session.id,
        chakra,
      };
    }
  );

  const chakraLabel = chakra.replace("_", " ");

  return {
    id: `${durationDays}-day-${chakra}-program`,
    title: `${durationDays}-Day ${chakraLabel} Alignment`,
    durationDays,
    tags: [
      "realm:program",
      `chakra:${chakra}`,
      `duration:${durationDays}`,
    ],
    days,
  };
}

/* ───────── REGISTRY ───────── */

const CHAKRAS: readonly Chakra[] = [
  "root",
  "sacral",
  "solar",
  "heart",
  "throat",
  "thirdEye",
  "crown",
];

/**
 * Master Program Registry
 * Generated deterministically at load time
 */
export const PROGRAMS: Program[] = CHAKRAS.flatMap(
  chakra => [
    buildChakraProgram(chakra, 7),
    buildChakraProgram(chakra, 21),
  ]
);
