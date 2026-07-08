import { useLivingRoom } from "@/hooks/useLivingRoom";

export default function PresenceZone() {
  const { presence } = useLivingRoom();

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 space-y-2">
      <h2 className="text-xs uppercase tracking-widest text-white/40">
        Presence
      </h2>
      <p className="text-sm text-white/70">
        {presence.activeCount} members are currently resting, listening, or studying.
      </p>
    </div>
  );
}
