import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const LOG_DIR = path.join(process.cwd(), "data", "akashic");

export async function POST(req: Request) {
  const body = await req.json();
  const { userId } = body;

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  const userFile = path.join(LOG_DIR, `${userId}.json`);

  // Ensure directory exists
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }

  // Load or init logs
  let logs = [];
  if (fs.existsSync(userFile)) {
    logs = JSON.parse(fs.readFileSync(userFile, "utf8"));
  }

  // Add new entry
  logs.push({
    ...body,
    id: Date.now(),
  });

  // Save updated file
  fs.writeFileSync(userFile, JSON.stringify(logs, null, 2));

  return NextResponse.json({ success: true });
}
