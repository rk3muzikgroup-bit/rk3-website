import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";

const LOG_DIR = path.join(process.cwd(), "data", "akashic");

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  const userFile = path.join(LOG_DIR, `${userId}.json`);
  if (!fs.existsSync(userFile)) {
    return NextResponse.json({ error: "No logs found for this user" }, { status: 404 });
  }

  const logs = JSON.parse(fs.readFileSync(userFile, "utf8"));
  const pdfPath = path.join(LOG_DIR, `${userId}_logbook.pdf`);

  const doc = new PDFDocument();
  const stream = fs.createWriteStream(pdfPath);
  doc.pipe(stream);

  doc.fontSize(22).text(`🛸 Akashic Logbook for ${userId}`, { align: "center" });
  doc.moveDown();

  logs.forEach((entry: any, i: number) => {
    doc.fontSize(14).text(`Flight #${i + 1}`, { underline: true });
    doc.moveDown(0.5);

    Object.entries(entry).forEach(([key, value]) => {
      doc.fontSize(10).text(`${key}: ${value}`);
    });

    doc.moveDown(1);
  });

  doc.end();

  return NextResponse.json({ success: true, pdf: `/data/akashic/${userId}_logbook.pdf` });
}
