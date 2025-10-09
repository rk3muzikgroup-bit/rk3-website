import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const PROFILE_DIR = path.join(process.cwd(), "data", "profiles");
const AKASHIC_DIR = path.join(process.cwd(), "data", "akashic");

export async function POST(req: Request) {
  const body = await req.json();
  const { username, avatar, portal } = body;

  // Generate a unique userId if not provided
  const userId = body.userId || uuidv4();

  // Ensure directories exist
  if (!fs.existsSync(PROFILE_DIR)) fs.mkdirSync(PROFILE_DIR, { recursive: true });
  if (!fs.existsSync(AKASHIC_DIR)) fs.mkdirSync(AKASHIC_DIR, { recursive: true });

  // Create profile file
  const profilePath = path.join(PROFILE_DIR, `${userId}.json`);
  const profile = {
    userId,
    username: username || "Guest Pilot",
    avatar: avatar || "/avatars/default.png",
    portal: portal || "street",
    createdAt: new Date().toISOString(),
  };
  fs.writeFileSync(profilePath, JSON.stringify(profile, null, 2));

  // Create empty Akashic log file
  const akashicPath = path.join(AKASHIC_DIR, `${userId}.json`);
  if (!fs.existsSync(akashicPath)) {
    fs.writeFileSync(akashicPath, JSON.stringify([], null, 2));
  }

  return NextResponse.json({ success: true, profile });
}
