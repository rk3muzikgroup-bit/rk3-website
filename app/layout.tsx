"use client";

import { ReactNode } from "react";
import "./globals.css";

// Context Providers
import { EQProvider } from "@/context/EQContext";
import { NowPlayingProvider } from "@/context/NowPlayingContext";
import { MileageProvider } from "@/context/MileageContext";

// Cockpit + UI
import CockpitHUD from "@/components/cockpit/CockpitHUD";
import CockpitOverlay from "@/components/cockpit/CockpitOverlay";
import Starfield from "@/components/Starfield";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white overflow-hidden">
        <EQProvider>
          <NowPlayingProvider>
            <MileageProvider>
              {/* Background starfield */}
              <Starfield />

              {/* Cockpit overlay + HUD */}
              <CockpitOverlay />
              <CockpitHUD />

              {/* Page Content */}
              <main className="relative z-10">{children}</main>
            </MileageProvider>
          </NowPlayingProvider>
        </EQProvider>
      </body>
    </html>
  );
}
