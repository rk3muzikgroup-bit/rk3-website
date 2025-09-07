// app/api/unlock/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { pass } = await req.json().catch(() => ({}));
  const okPass = process.env.PREVIEW_PASS || "rk3alpha";

  if (!pass || pass !== okPass) {
    return NextResponse.json({ message: "Invalid code" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: "rk3_preview",
    value: "1",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return res;
}
