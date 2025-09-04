// app/layout.tsx
import "../src/styles/globals.css";

export const metadata = {
  title: "RK3 Music Group",
  description: "Street • Soul • Spirit — Independent Music & Media Company",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
