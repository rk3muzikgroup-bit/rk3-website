"use client";

import { useRouter } from "next/navigation";
import { rooms } from "@/config/rooms";

export default function VaultInterior() {
  const router = useRouter();

  const handleRoomClick = (room: string) => {
    router.push(`/rooms/${room}`);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <video
        src="/videos/vault/door_idle.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover brightness-75"
      />

      <div className="absolute top-10 w-full text-center">
        <h1 className="text-white text-4xl font-bold drop-shadow-lg">
          Welcome to the Vault
        </h1>
        <p className="text-white/70 mt-2 text-lg">Choose your path</p>
      </div>

      <div className="absolute bottom-20 w-full flex flex-wrap justify-center gap-6 px-10">
        {rooms.map((room) => (
          <button
            key={room.name}
            onClick={() => handleRoomClick(room.name)}
            className={`px-8 py-4 ${room.color} rounded-2xl text-white text-2xl font-bold transition`}
          >
            {room.label}
          </button>
        ))}
      </div>
    </div>
  );
}
