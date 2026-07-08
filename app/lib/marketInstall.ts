import { PROGRAMS } from "@/lib/programs";
import { SESSIONS } from "@/lib/sessions";

export type InstallResult =
  | { status: "installed"; type: "program" | "session"; id: string }
  | { status: "already-installed"; type: "program" | "session"; id: string }
  | { status: "not-found"; type: "program" | "session"; id: string }
  | { status: "invalid-ref"; ref: string };

/**
 * Maps marketplace payload refs to local installs.
 * (local-only for now, remote-ready later)
 */
export function installFromMarketplace(
  ref: string
): InstallResult {
  if (ref.startsWith("program:")) {
    const id = ref.replace("program:", "");

    const exists = Object.values(PROGRAMS).some(
      (p: { id: string }) => p.id === id
    );

    if (!exists) {
      return { status: "not-found", type: "program", id };
    }

    // 🔒 local programs are already bundled
    return {
      status: "already-installed",
      type: "program",
      id,
    };
  }

  if (ref.startsWith("session:")) {
    const id = ref.replace("session:", "");

    const exists = Object.values(SESSIONS).some(
      (s: { id: string }) => s.id === id
    );

    if (!exists) {
      return { status: "not-found", type: "session", id };
    }

    // 🔒 local sessions are already bundled
    return {
      status: "already-installed",
      type: "session",
      id,
    };
  }

  return { status: "invalid-ref", ref };
}

/* ✅ ALIAS FOR EXISTING IMPORTS */
export const installPayload = installFromMarketplace;
