// pages/godmode.tsx
import NeonTitle from "@/components/NeonTitle";
import TypewriterQuote from "@/components/TypewriterQuote";
import PortalButton from "@/components/PortalButton";
import AmbientScore from "@/components/AmbientScore";

export default function Godmode() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-6">
      <AmbientScore src="/sounds/godmode-theme.mp3" />

      <NeonTitle>🔥 GOD MODE</NeonTitle>
      <TypewriterQuote text="On God Mode, limits vanish. You move like thunder, shine like lightning — destiny bends to your will." />

      <PortalButton href="/final-room" label="👉 Continue to Final Room" />
    </div>
  );
}
