"use client";

import { ReactNode } from "react";

interface PortalLayoutProps {
  title: string;
  children: ReactNode;
  bg?: string; // optional background gradient
}
import Orbs from "@/components/Orbs";

export default function PortalLayout({ title, children }: any) {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen text-white overflow-hidden">
      <Orbs count={4} /> {/* Guardian Orbs floating */}
      <h1 className="text-4xl font-bold mb-10 relative z-10">{title}</h1>
      <div className="relative z-10">{children}</div>
    </main>
  );
}
import Orbs from "@/components/Orbs";

export default function PortalLayout({ title, children }: any) {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen text-white overflow-hidden">
      <Orbs count={4} /> {/* Guardian Orbs floating */}
      <h1 className="text-4xl font-bold mb-10 relative z-10">{title}</h1>
      <div className="relative z-10">{children}</div>
    </main>
  );
}

export default function PortalLayout({ title, children, bg }: PortalLayoutProps) {
  return (
    <main
      className={`flex flex-col items-center justify-center min-h-screen bg-gradient-to-b ${bg || "from-black via-gray-800 to-black"} text-white`}
    >
      <h1 className="text-4xl font-bold mb-10">{title}</h1>
      {children}
    </main>
  );
}
