"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { name: "Street", href: "/street" },
  { name: "Soul", href: "/soul" },
  { name: "Spirit", href: "/spirit" },
] as const;

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav
      className="flex items-center gap-8 text-sm tracking-widest uppercase"
      aria-label="Primary navigation"
    >
      {LINKS.map(link => {
        const active =
          pathname === link.href ||
          pathname.startsWith(`${link.href}/`);

        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className="group relative flex flex-col items-center focus:outline-none"
          >
            <span
              className={`transition-colors duration-300 ${
                active
                  ? "text-white glow"
                  : "text-white/60 group-hover:text-white"
              }`}
            >
              {link.name}
            </span>

            {/* underline */}
            <span
              className={`absolute -bottom-1 h-[2px] w-full bg-white transform-gpu transition-transform duration-300 origin-center ${
                active
                  ? "scale-x-100"
                  : "scale-x-0 group-hover:scale-x-100"
              }`}
            />
          </Link>
        );
      })}
    </nav>
  );
}
