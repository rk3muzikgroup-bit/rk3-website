// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const unlocked = req.cookies.get("rk3_vault")?.value === "granted";
  if (!unlocked) {
    const url = new URL("/vault-entry", req.url);
    url.searchParams.set("from", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/vault/:path*"], // protects /vault and everything inside it
};
