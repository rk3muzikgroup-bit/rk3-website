import type { VaultAccess } from "./vaultTypes";

export type VaultContext = {
  isOwner: boolean;
  isMember: boolean;
};

export function vaultPolicy(
  access: VaultAccess,
  ctx: VaultContext
): boolean {
  switch (access) {
    case "public":
      return true;

    case "member":
      return ctx.isMember || ctx.isOwner;

    case "private":
      return ctx.isOwner;

    default:
      return false;
  }
}
