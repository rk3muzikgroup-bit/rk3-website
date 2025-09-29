"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePlaySound } from "@/hooks/usePlaySound";

export default function VaultNav() {
  const router = useRouter();
  const playSound = usePlaySound();

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    playSound("/sounds/vault/unlock.mp3"); // vault entry chime
    setTimeout(() => {
      router.push("/");
    }, 1800); // give chime ~1.8s to finish before routing
  };

  return (
    <nav className="absolute bottom-6 w-full flex justify-center gap-6 text-lg font-bold text-white drop-shadow-lg">
      <a
        href="/"
        onClick={handleHomeClick}
        className="hover:text-cyan-400 cursor-pointer"
      >
        HOME
      </a>
      <Link href="/vault/music" className="hover:text-indigo-400">
        MUSIC
      </Link>
      <Link href="/vault/avatars" className="hover:text-emerald-400">
        AVATARS
      </Link>
      <Link href="/vault/healing" className="hover:text-rose-400">
        HEALING
      </Link>
      <Link href="/vault/closing" className="hover:text-yellow-400">
        CLOSING
      </Link>
    </nav>
  );
}
