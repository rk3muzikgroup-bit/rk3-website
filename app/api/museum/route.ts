import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    collected: 153, // update this later from DB
    total: 5000,
  });
}
