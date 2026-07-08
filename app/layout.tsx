// app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";

import ClientLayout from "./ClientLayout";
import { AudioPlayerProvider } from "@/context/AudioPlayerContext";
import { AmbientProvider } from "@/context/AmbientContext";
import { SessionProvider } from "@/context/SessionContext";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen overflow-x-hidden">
        <AudioPlayerProvider>
          <AmbientProvider>
            <SessionProvider>
              <ClientLayout>{children}</ClientLayout>
            </SessionProvider>
          </AmbientProvider>
        </AudioPlayerProvider>
      </body>
    </html>
  );
}
