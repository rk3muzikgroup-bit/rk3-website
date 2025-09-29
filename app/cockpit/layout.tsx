import "../globals.css";
import type { Metadata } from "next";
import { OverlayProvider } from "@/context/OverlayContext";
import OverlayHud from "@/components/OverlayHud";
import ScreenFade from "@/components/ScreenFade"; // optional: root-level pulse for global alerts

export const metadata: Metadata = {
  title: "RKS3 — Vault of Street • Soul • Spirit",
  description: "A cinematic portal for healing frequencies, rides, and vault rooms.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: "RKS3 — Cinematic Portal",
    description: "Enter the vault. Choose your path. Heal.",
    url: "https://rks3.com",
    siteName: "RKS3",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "RKS3" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RKS3 — Cinematic Portal",
    description: "Enter the vault. Choose your path. Heal.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-black text-white antialiased">
        {/* One provider to rule them all — HUD + SFX + fades available everywhere */}
        <OverlayProvider>
          {/* Global HUD lives above all pages */}
          <OverlayHud />
          {/* Optional: a root fade you can trigger later if needed */}
          {/* <ScreenFade trigger={"root"} duration={500} color="bg-black" mode="fade" /> */}
          {children}
          {/* tiny debug readout (can remove in prod) */}
          <div
            id="overlay-debug"
            className="fixed bottom-2 left-2 text-[10px] text-white/70 bg-black/40 px-2 py-1 rounded pointer-events-none"
          />
        </OverlayProvider>
      </body>
    </html>
  );
}
