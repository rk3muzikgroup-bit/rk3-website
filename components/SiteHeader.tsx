// components/SiteHeader.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/entrance", label: "Entrance" },
  { href: "/vault", label: "Vault" },
  { href: "/mixtapes", label: "Mixtapes" },
];

export default function SiteHeader() {
  const path = usePathname();
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur">
      <nav className="mx-auto flex w-[min(1200px,92vw)] items-center justify-between py-3">
        <Link href="/" className="font-semibold">RK3</Link>
        <div className="flex gap-2 text-sm">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-md px-3 py-1.5 hover:bg-white/10 ${path === l.href ? "bg-white/10" : ""}`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
