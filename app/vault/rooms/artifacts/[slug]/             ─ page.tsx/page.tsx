"use client";

import { useParams } from "next/navigation";
import { useContent } from "@/utils/useContent";
import TrackPlayer from "@/components/TrackPlayer";

export default function ArtifactDetailPage() {
  const { slug } = useParams();
  const data = useContent();

  if (!data) return <div className="p-8 text-white">Loading artifact...</div>;

  const artifact = data.vault.artifacts.find(
    (a: any) => a.title.toLowerCase().replace(/\s+/g, "-") === slug
  );

  if (!artifact) return <div className="p-8 text-white">Artifact not found</div>;

  return (
    <div className="p-8 text-white">
      <h1 className="text-4xl font-bold mb-6">{artifact.title}</h1>
      <img src={artifact.img} alt={artifact.title} className="w-64 mb-4" />
      <TrackPlayer track={artifact} />
    </div>
  );
}
