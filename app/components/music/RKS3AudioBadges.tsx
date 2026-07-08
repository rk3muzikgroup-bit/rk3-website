import type { RKS3GeneratedAudioTrack } from "@/lib/rks3GeneratedAudio";

type RKS3AudioBadgesProps = {
  track: RKS3GeneratedAudioTrack;
  compact?: boolean;
};

type BadgeTone = "neutral" | "rose" | "amber" | "emerald" | "cyan";

function getVisibilityLabel(visibility: string) {
  if (visibility === "review") return "Metadata Review";
  if (visibility === "hidden") return "Hidden";
  return "Public";
}

function getPriorityLabel(priority: string) {
  if (priority === "featured") return "Featured";
  if (priority === "high") return "High Priority";
  if (priority === "low") return "Low Priority";
  return "Normal Priority";
}

function getVisibilityTone(visibility: string): BadgeTone {
  if (visibility === "review") return "amber";
  if (visibility === "hidden") return "rose";
  return "emerald";
}

function getPriorityTone(priority: string): BadgeTone {
  if (priority === "featured") return "rose";
  if (priority === "high") return "amber";
  return "neutral";
}

function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: BadgeTone;
}) {
  const toneClass =
    tone === "rose"
      ? "border-rose-200/20 bg-rose-200/[0.07] text-rose-100/75"
      : tone === "amber"
        ? "border-amber-200/20 bg-amber-200/[0.07] text-amber-100/75"
        : tone === "emerald"
          ? "border-emerald-200/20 bg-emerald-200/[0.07] text-emerald-100/75"
          : tone === "cyan"
            ? "border-cyan-200/20 bg-cyan-200/[0.07] text-cyan-100/75"
            : "border-white/10 bg-white/[0.04] text-white/48";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase leading-none tracking-[0.16em] ${toneClass}`}
    >
      {children}
    </span>
  );
}

export default function RKS3AudioBadges({
  track,
  compact = false,
}: RKS3AudioBadgesProps) {
  if (compact) {
    return (
      <div className="flex flex-wrap gap-2">
        <Badge tone="rose">HDWAV</Badge>

        {track.hasMetadataOverride ? (
          <Badge tone="cyan">Override</Badge>
        ) : null}

        <Badge tone={getVisibilityTone(track.visibility)}>
          {getVisibilityLabel(track.visibility)}
        </Badge>

        {track.priority !== "normal" ? (
          <Badge tone={getPriorityTone(track.priority)}>
            {getPriorityLabel(track.priority)}
          </Badge>
        ) : null}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Badge tone="rose">HDWAV Source</Badge>

      {track.hasMetadataOverride ? (
        <Badge tone="cyan">Override Applied</Badge>
      ) : null}

      <Badge tone={getVisibilityTone(track.visibility)}>
        {getVisibilityLabel(track.visibility)}
      </Badge>

      <Badge tone={getPriorityTone(track.priority)}>
        {getPriorityLabel(track.priority)}
      </Badge>

      {track.mood.map((mood) => (
        <Badge key={`mood-${track.id}-${mood}`}>Mood: {mood}</Badge>
      ))}

      {track.tags.map((tag) => (
        <Badge key={`tag-${track.id}-${tag}`}>#{tag}</Badge>
      ))}
    </div>
  );
}