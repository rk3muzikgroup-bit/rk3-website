import PresenceZone from "@/components/living-room/PresenceZone";
import AmbientStatus from "@/components/living-room/AmbientStatus";
import ReflectionZone from "@/components/living-room/ReflectionZone";

export default function LivingRoomPage() {
  return (
    <main
      className="
        mx-auto
        max-w-[840px]
        px-6
        py-14
        space-y-12
      "
    >
      {/* THRESHOLD */}
      <section className="space-y-3">
        <h1 className="text-2xl font-medium tracking-tight">
          Living Room
        </h1>

        <p className="text-sm text-white/60 max-w-xl leading-relaxed">
          A shared space for quiet presence, grounding, and gentle connection.
          Nothing here is required. Nothing here is judged.
        </p>
      </section>

      {/* AMBIENT PRESENCE */}
      <AmbientStatus />

      {/* PRESENCE */}
      <section className="space-y-4">
        <PresenceZone />
      </section>

      {/* REFLECTION */}
      <section className="space-y-4">
        <ReflectionZone />
      </section>
    </main>
  );
}
