"use client";

import { ReactNode } from "react";
import { MileageProvider } from "@/context/MileageContext";
import { NowPlayingProvider } from "@/context/NowPlayingContext";
import { SteeringProvider } from "@/context/SteeringContext";
import { EQProvider } from "@/context/EQContext";

import CockpitHUD from "@/components/cockpit/CockpitHUD";
import Starfield from "@/components/Starfield";

import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <NowPlayingProvider>
          <MileageProvider>
            <EQProvider>
              <SteeringProvider>
                <Starfield />
                <CockpitHUD />
                {children}
              </SteeringProvider>
            </EQProvider>
          </MileageProvider>
        </NowPlayingProvider>
      </body>
    </html>
  );
}
