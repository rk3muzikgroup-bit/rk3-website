"use client";

import "./globals.css";
import { VolumeProvider } from "@/context/VolumeContext";
import HUDVolume from "@/components/HUDVolume";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <VolumeProvider>
          {children}
          <HUDVolume />
        </VolumeProvider>
      </body>
    </html>
  );
}
