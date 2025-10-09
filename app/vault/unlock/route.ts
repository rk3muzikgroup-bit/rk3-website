// app/api/vault/unlock/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  let body: { code?: string } = {};
  try {
    body = await req.json();
  } catch (_) {}

  const expected = process.env.VAULT_ACCESS_CODE || "RK3";
  if (!body.code || body.code !== expected) {
    return NextResponse.json({ ok: false, error: "Invalid code" }, { status: 401 });
  }

  // 4 hours; adjust as you like
  cookies().set("rk3_vault", "granted", {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 4,
  });

  return NextResponse.json({ ok: true });
}
