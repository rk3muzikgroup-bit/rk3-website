import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // check extension
    const ext = file.name.split(".").pop()?.toLowerCase();
    const isAudio = ["mp3", "wav", "ogg"].includes(ext || "");
    const isVideo = ["mp4", "mov", "webm"].includes(ext || "");

    if (!isAudio && !isVideo) {
      return NextResponse.json(
        { error: "Unsupported file type" },
        { status: 400 }
      );
    }

    // choose folder
    const folder = isAudio ? "public/sounds/rooms" : "public/videos/rooms";
    await fs.mkdir(path.join(process.cwd(), folder), { recursive: true });

    const targetPath = path.join(process.cwd(), folder, file.name);

    // if file exists → archive it with timestamp
    try {
      await fs.access(targetPath);
      const timestamp = new Date()
        .toISOString()
        .replace(/[:.]/g, "-"); // safe filename
      const backupPath = targetPath.replace(
        `.${ext}`,
        `_backup_${timestamp}.${ext}`
      );
      await fs.rename(targetPath, backupPath);
    } catch {
      // file doesn’t exist → no backup needed
    }

    // write new file
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(targetPath, buffer);

    const publicPath = targetPath.replace(`${process.cwd()}/public`, "");
    return NextResponse.json({ path: publicPath, backup: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
