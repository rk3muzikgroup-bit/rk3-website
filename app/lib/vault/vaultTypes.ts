export type VaultAccess =
  | "public"
  | "member"
  | "private";

export type VaultMeta = {
  sessionId: string;
  access: VaultAccess;
  createdAt: number;
};
