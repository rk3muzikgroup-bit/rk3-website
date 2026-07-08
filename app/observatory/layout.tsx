import type { ReactNode } from "react";

export default function ObservatoryLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen px-6 py-10 text-white">
      {children}
    </div>
  );
}
