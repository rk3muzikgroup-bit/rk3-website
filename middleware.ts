// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = new Set<string>([
  "/enter",               // let your intro play
  "/preview-locked",      // the lock screen
  "/api/unlock",          // unlock endpoint
  "/portal-preview",      // (optional) make a temp public page if you want
]);

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // Always allow Next internals and static assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/vault") && pathname.endsWith(".png") ||
    pathname.startsWith("/videos") ||
    pathname.startsWith("/audio") ||
    pathname.startsWith("/sounds")
  ) {
    return NextResponse.next();
  }

  // Public pages
  if (PUBLIC_PATHS.has(pathname)) return NextResponse.next();

  // Already unlocked?
  const token = req.cookies.get("rk3_preview")?.value;
  if (token === "1") return NextResponse.next();

  // Not unlocked → send to lock screen (carry the intended destination)
  const url = req.nextUrl.clone();
  url.pathname = "/preview-locked";
  url.search = search || `?next=${encodeURIComponent(pathname)}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"], // run on all pages except static files
};
