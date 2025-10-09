"use client";

import { useRouter } from "next/navigation";

export default function PilotBadge({
  avatar,
  badgeNumber,
  username,
  portal, // "street" | "soul" | "spirit"
}: {
  avatar: string;
  badgeNumber: number;
  username: string;
  portal: "street" | "soul" | "spirit";
}) {
  const router = useRouter();

  // Glow colors by portal
  const portalColors = {
    street: "indigo-400",
    soul: "emerald-400",
    spirit: "yellow-400",
  };

  const glow = {
    street: "0_0_20px_rgba(100,150,255,0.7)",
    soul: "0_0_20px_rgba(0,255,200,0.7)",
    spirit: "0_0_20px_rgba(255,255,0,0.7)",
  };

  return (
    <div
      className="flex flex-col items-center cursor-pointer"
      onClick={() => router.push(`/profile/${username}/settings`)}
    >
      {/* Avatar Circle */}
      <div
        className={`relative w-16 h-16 rounded-full border-2 border-${portalColors[portal]} shadow-[${glow[portal]}] overflow-hidden hover:scale-110 transition`}
      >
        <img
          src={avatar}
          alt="Pilot Badge"
          className="w-full h-full object-cover"
        />
      </div>
      {/* Badge Number */}
      <span className="text-xs text-gray-300 mt-1">
        Badge #{badgeNumber}
      </span>
    </div>
  );
}
