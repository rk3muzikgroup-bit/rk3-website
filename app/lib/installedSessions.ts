export type InstalledSession = {
  id: string;
  title: string;
  realm: "soul" | "street" | "spirit";
};

export const DEFAULT_INSTALLED: InstalledSession[] = [];
