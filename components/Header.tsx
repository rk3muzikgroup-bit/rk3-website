// components/Header.tsx
"use client";
import { useCockpit } from "@/context/CockpitContext";

export default function Header() {
  const { toggle } = useCockpit();
  return (
    <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between p-3 bg-black/40 backdrop-blur">
      <div className="font-bold tracking-wide">RKS3</div>
      <button onClick={toggle} className="text-indigo-300 hover:text-white">
        Cockpit
      </button>
    </header>
  );
}
