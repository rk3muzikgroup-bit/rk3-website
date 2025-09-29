import Image from "next/image";

interface PortalButtonProps {
  label: string;
  image: string;
  onClick: () => void;
}
// components/portal/PortalButton.tsx
"use client";

import { useMileage } from "@/context/MileageContext";

export default function PortalButton({ label }: { label: string }) {
  const { addMiles } = useMileage();

  const handleEnter = () => {
    addMiles(50); // entering a portal = +50 LY
    console.log(`Entered ${label}, +50 LY`);
  };

  return (
    <button
      onClick={handleEnter}
      className="px-4 py-2 bg-indigo-600 rounded-xl text-white hover:bg-indigo-700"
    >
      Enter {label}
    </button>
  );
}

export default function PortalButton({ label, image, onClick }: PortalButtonProps) {
  return (
    <button
      onClick={onClick}
      className="relative group h-48 w-48 rounded-2xl overflow-hidden shadow-lg hover:scale-110 transform transition duration-500 ease-out"
    >
      {/* Portal Image */}
      <Image
        src={image}
        alt={label}
        fill
        className="object-cover opacity-90 group-hover:opacity-100"
      />
      {/* Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
      {/* Label */}
      <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-lg font-bold text-emerald-200 tracking-wide group-hover:text-yellow-300">
        {label}
      </span>
    </button>
  );
}
