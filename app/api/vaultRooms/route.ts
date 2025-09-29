import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "public/data/vaultRooms.json");

// GET → return all rooms
export async function GET() {
  const data = await fs.readFile(filePath, "utf-8");
  return NextResponse.json(JSON.parse(data));
}

// POST → add or update a room
export async function POST(req: Request) {
  const body = await req.json();
  const data = await fs.readFile(filePath, "utf-8");
  let rooms = JSON.parse(data);

  const existingIndex = rooms.findIndex((r: any) => r.slug === body.slug);
  if (existingIndex >= 0) {
    rooms[existingIndex] = body; // update
  } else {
    rooms.push(body); // add new
  }

  await fs.writeFile(filePath, JSON.stringify(rooms, null, 2), "utf-8");
  return NextResponse.json({ success: true });
}

// DELETE → remove a room
export async function DELETE(req: Request) {
  const { slug } = await req.json();
  const data = await fs.readFile(filePath, "utf-8");
  let rooms = JSON.parse(data);

  rooms = rooms.filter((r: any) => r.slug !== slug);

  await fs.writeFile(filePath, JSON.stringify(rooms, null, 2), "utf-8");
  return NextResponse.json({ success: true });
}
