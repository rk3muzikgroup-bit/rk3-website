// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Allow static assets (Next internals + your public/ content) to pass through.
 * This avoids 404s for files like /videos/ride/*.mp4 or /hls/*.
 */
const ASSET_EXT = /\.(?:png|jpe?g|gif|webp|svg|ico|mp4|m3u8|ts|mp3|wav|ogg|json|txt|css|js|map)$/i;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1) Always allow Next internals and public asset folders
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/robots.txt") ||
    pathname.startsWith("/sitemap.xml") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/videos") ||
    pathname.startsWith("/sounds") ||
    pathname.startsWith("/hls") ||
    ASSET_EXT.test(pathname)
  ) {
    return NextResponse.next();
  }

  // 2) Your existing gating can go here (intro/lock/etc).
  // Example stub (do nothing):
  return NextResponse.next();
}

export const config = {
  // Run on everything except the assets we already let pass above.
  matcher: ["/((?!api).*)"],
};
