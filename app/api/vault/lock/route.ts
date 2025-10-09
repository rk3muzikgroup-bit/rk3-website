// app/api/vault/lock/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  cookies().delete("rk3_vault");
  return NextResponse.json({ ok: true });
}
