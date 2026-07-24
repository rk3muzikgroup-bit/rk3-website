import { notFound } from "next/navigation";
import { getAudiobookById } from "../../../data/audiobooks/audiobooksCatalog";
import AudiobookRoomClient from "./AudiobookRoomClient";

type AudiobookDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AudiobookDetailPage({
  params,
}: AudiobookDetailPageProps) {
  const { id } = await params;
  const book = getAudiobookById(id);

  if (!book) {
    notFound();
  }

  return <AudiobookRoomClient book={book} />;
}