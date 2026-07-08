import type { ChakraStats } from "@/lib/chakraStats";

/* ───────── TYPES ───────── */

export type RK3ProfileExport = {
  profile: {
    id: string;
    name: string;
  };
  state: {
    playedNarratives: string[];
    lastChakra?: string;
    lastRealm?: string;
    activeSession?: string;
    sessionStepIndex?: number;
    chakraStats?: ChakraStats;
    activeProgramId?: string;
    programStartDate?: string;
  };
  exportedAt: string;
  version: "rk3-1.0";
};

/* ───────── KEYS ───────── */

const PROFILE_KEY = "rk3_profile_active";

function profileStateKey(profileId: string) {
  return `rk3_state_${profileId}`;
}

/* ───────── EXPORT ───────── */

export function exportActiveProfile(): RK3ProfileExport | null {
  if (typeof window === "undefined") return null;

  try {
    const rawProfile = localStorage.getItem(PROFILE_KEY);
    if (!rawProfile) return null;

    const profile = JSON.parse(rawProfile);
    if (!profile?.id) return null;

    const stateRaw = localStorage.getItem(
      profileStateKey(profile.id)
    );

    const state = stateRaw
      ? JSON.parse(stateRaw)
      : { playedNarratives: [] };

    return {
      profile,
      state,
      exportedAt: new Date().toISOString(),
      version: "rk3-1.0",
    };
  } catch {
    return null;
  }
}

/* ───────── IMPORT ───────── */

export function importProfileDump(
  dump: RK3ProfileExport
) {
  if (typeof window === "undefined") return;

  try {
    // version guard (future migrations hook here)
    if (dump.version !== "rk3-1.0") return;

    if (!dump.profile?.id) return;

    localStorage.setItem(
      PROFILE_KEY,
      JSON.stringify(dump.profile)
    );

    localStorage.setItem(
      profileStateKey(dump.profile.id),
      JSON.stringify(
        dump.state ?? { playedNarratives: [] }
      )
    );
  } catch {
    // never crash app on import
  }
}
