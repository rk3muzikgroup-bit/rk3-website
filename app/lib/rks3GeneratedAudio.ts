import catalog from "../../data/rks3-audio-catalog.json";
import overrides from "../../data/rks3-audio-overrides.json";

export type RKS3AudioVisibility = "public" | "review" | "hidden";

export type RKS3AudioPriority = "low" | "normal" | "high" | "featured";

export type RKS3AudioOverride = {
  displayTitle?: string;
  displaySubtitle?: string;
  mood?: string[];
  tags?: string[];
  visibility?: RKS3AudioVisibility;
  priority?: RKS3AudioPriority;
  notes?: string;
};

type RKS3RawAudioTrack = {
  id: string;
  title: string;
  originalTitle: string;
  versionLabel: string;
  category: string;
  sourceFormat: "hdwav";
  actualFileExtension: string;
  audioSrc: string;
  originalFileName: string;
  originalRelativePath: string;
  includeInRKS3: boolean;
};

export type RKS3GeneratedAudioTrack = RKS3RawAudioTrack & {
  sourceTitle: string;
  displaySubtitle?: string;
  mood: string[];
  tags: string[];
  visibility: RKS3AudioVisibility;
  priority: RKS3AudioPriority;
  notes?: string;
  hasMetadataOverride: boolean;
};

const rawCatalog = catalog as RKS3RawAudioTrack[];
const typedOverrides = overrides as Record<string, RKS3AudioOverride>;

function applyOverride(track: RKS3RawAudioTrack): RKS3GeneratedAudioTrack {
  const override = typedOverrides[track.id];

  return {
    ...track,
    sourceTitle: track.title,
    title: override?.displayTitle?.trim() || track.title,
    displaySubtitle: override?.displaySubtitle,
    mood: override?.mood ?? [],
    tags: override?.tags ?? [],
    visibility: override?.visibility ?? "public",
    priority: override?.priority ?? "normal",
    notes: override?.notes,
    hasMetadataOverride: Boolean(override),
  };
}

export const rks3GeneratedAudioCatalog = rawCatalog.map(applyOverride);

export const rks3PublicAudioCatalog = rks3GeneratedAudioCatalog.filter(
  (track) => track.visibility === "public" || track.visibility === "review"
);

export const rks3GeneratedCategories = Array.from(
  new Set(rks3PublicAudioCatalog.map((track) => track.category))
).sort();

export function getRks3TrackById(id: string) {
  return rks3GeneratedAudioCatalog.find((track) => track.id === id);
}

export function getRks3PublicTrackById(id: string) {
  return rks3PublicAudioCatalog.find((track) => track.id === id);
}

export function getRks3TracksByCategory(category: string) {
  return rks3PublicAudioCatalog.filter((track) => track.category === category);
}

export function getRks3MetadataOverrides() {
  return typedOverrides;
}