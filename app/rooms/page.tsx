"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useOverlay } from "@/context/OverlayContext";

type Room = {
  name: string;
  slug: string;
  color: string;
  overlay: string;
  video?: string;
  audio?: string;
  description?: string;
};

export default function RoomLoaderPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { showOverlay } = useOverlay();
  const [room, setRoom] = useState<Room | null>(null);

  const slug = searchParams.get("slug");

  useEffect(() => {
    if (!slug) return;

    fetch("/data/vaultRooms.json")
      .then((res) => res.json())
      .then((data: Room[]) => {
        const match = data.find((r) => r.slug === slug);
        setRoom(match || null);

        if (match) {
          // show overlay effect when entering room
          showOverlay(match.overlay, 2000, true);
        } else {
          // slug not found → bounce back to Vault
          setTimeout(() => router.push("/vault"), 1200);
        }
      });
  }, [slug, router, showOverlay]);

  if (!slug) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center text-white">
        <p>No room selected — go back to Vault</p>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center text-white">
        <p>Portal not found — redirecting to Vault...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Background video if defined */}
      {room.video && (
        <video
          src={room.video}
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Room content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">{room.name}</h1>
        <p className="text-gray-300 max-w-2xl mb-8">{room.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl">
          <button className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition">
            Play Ambient
          </button>
          <button className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition">
            Open Playlist
          </button>
        </div>

        <div className="mt-8">
          <a href="/vault" className="text-sm text-white/70 hover:underline">
            ← Back to Vault
          </a>
        </div>
      </div>
    </div>
  );
}
