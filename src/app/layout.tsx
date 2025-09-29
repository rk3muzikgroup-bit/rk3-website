import { VolumeProvider } from "@/context/VolumeContext";
import HUDVolume from "@/components/HUDVolume";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
