export default function PresencePanel() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 space-y-3">
      <h2 className="text-xs uppercase tracking-widest text-white/40">
        Presence
      </h2>
      <p className="text-sm text-white/70">
        Several members are currently resting, listening, or studying.
      </p>
      <p className="text-xs text-white/40">
        No interaction is required.
      </p>
    </div>
  );
}
