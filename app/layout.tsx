// app/layout.tsx
import "./globals.css";   // ✅ correct relative path now
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RK3 Music Group",
  description: "Street • Soul • Spirit — Independent Music & Media Company",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
