"use client";

interface PortalButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export default function PortalButton({ onClick, children }: PortalButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 transition-colors text-lg font-semibold shadow-lg"
    >
      {children}
    </button>
  );
}
