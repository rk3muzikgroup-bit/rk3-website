import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const baseDirs = [
  path.join(process.cwd(), "public/videos/rooms"),
  path.join(process.cwd(), "public/sounds/rooms"),
];

// GET all backups
export async function GET() {
  const results: { folder: string; files: string[] }[] = [];

  for (const dir of baseDirs) {
    try {
      const files = await fs.readdir(dir);
      const backups = files.filter((f) => f.includes("_backup_"));
      if (backups.length > 0) {
        results.push({
          folder: dir.replace(`${process.cwd()}/public`, ""),
          files: backups,
        });
      }
    } catch {
      // ignore missing dirs
    }
  }

  return NextResponse.json(results);
}

// POST restore backup
export async function POST(req: Request) {
  const { folder, filename } = await req.json();
  if (!folder || !filename) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  const fullPath = path.join(process.cwd(), "public", folder, filename);
  const ext = filename.split(".").pop();
  const originalName = filename.split("_backup_")[0] + "." + ext;

  const originalPath = path.join(process.cwd(), "public", folder, originalName);

  try {
    // restore by renaming backup back to original
    await fs.rename(fullPath, originalPath);
    return NextResponse.json({ restored: true, file: originalName });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
