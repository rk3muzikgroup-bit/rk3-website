"use client";

import { useRouter } from "next/navigation";

interface PortalOrbProps {
  label: string;
  route: string;
  color?: string;
  size?: string; // optional size control
}

export default function PortalOrb({
  label,
  route,
  color = "from-purple-500 to-indigo-600",
  size = "h-24 w-24",
}: PortalOrbProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(route)}
      className={`
        relative flex ${size} items-center justify-center rounded-full
        bg-gradient-to-br ${color} text-white text-sm font-bold
        shadow-lg hover:scale-105 hover:shadow-2xl
        transition-all duration-300 ease-in-out
      `}
    >
      <span className="z-10">{label}</span>
      <span
        className="absolute inset-0 rounded-full bg-white/10 blur-md"
        aria-hidden="true"
      />
    </button>
  );
}
