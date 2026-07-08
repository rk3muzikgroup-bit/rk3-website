export type ThemeClass =
  | "theme-street"
  | "theme-soul"
  | "theme-spirit"
  | "theme-default";

export function getTheme(pathname?: string): ThemeClass {
  if (!pathname) return "theme-default";

  if (pathname.startsWith("/street")) return "theme-street";
  if (pathname.startsWith("/soul")) return "theme-soul";
  if (pathname.startsWith("/spirit")) return "theme-spirit";

  return "theme-default";
}
