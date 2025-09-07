import VaultClient, { type Portal } from "@/src/components/VaultClient";

export const metadata = {
  title: "RK3 Vault • Access",
  description: "Street • Soul • Spirit — Vault Entry",
};

export default function VaultPage() {
  const portals: Portal[] = [
    { key: "street", label: "Street", img: "/images/portals/street.png", video: "/videos/rooms/street.mp4", href: "/vault/street" },
    { key: "soul",   label: "Soul",   img: "/images/portals/soul.png",   video: "/videos/rooms/soul.mp4",   href: "/vault/soul" },
    { key: "spirit", label: "Spirit", img: "/images/portals/spirit.png", video: "/videos/rooms/spirit.mp4", href: "/vault/spirit" },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <VaultClient portals={portals} />
    </main>
  );
}
