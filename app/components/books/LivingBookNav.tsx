import Link from "next/link";
import type { Route } from "next";

type LivingBookNavProps = {
  bookId: string;
  audiobookId?: string;
  activeMode: "read" | "listen" | "study";
};

export default function LivingBookNav({
  bookId,
  audiobookId,
  activeMode,
}: LivingBookNavProps) {
  const activeAudiobookId = audiobookId || bookId;

  const readHref = `/portal/audiobooks/${activeAudiobookId}/read` as Route;
  const listenHref = `/portal/audiobooks/${activeAudiobookId}` as Route;
  const studyHref = `/portal/audiobooks/${activeAudiobookId}/study` as Route;

  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-black/25 p-5">
      <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
        Listen • Read • Study
      </p>

      <div className="mt-4 grid gap-2">
        <Link
          href={readHref}
          prefetch={false}
          className={`rounded-xl border px-4 py-3 text-sm transition ${
            activeMode === "read"
              ? "pointer-events-none border-teal-200/20 bg-teal-200/[0.08] text-teal-100/70"
              : "border-teal-200/15 bg-teal-200/[0.05] text-teal-100/60 hover:border-teal-200/30"
          }`}
        >
          Read Companion
        </Link>

        <Link
          href={listenHref}
          prefetch={false}
          className={`rounded-xl border px-4 py-3 text-sm transition ${
            activeMode === "listen"
              ? "pointer-events-none border-cyan-200/20 bg-cyan-200/[0.08] text-cyan-100/70"
              : "border-cyan-200/15 bg-cyan-200/[0.05] text-cyan-100/60 hover:border-cyan-200/30"
          }`}
        >
          Listen Room
        </Link>

        <Link
          href={studyHref}
          prefetch={false}
          className={`rounded-xl border px-4 py-3 text-sm transition ${
            activeMode === "study"
              ? "pointer-events-none border-purple-200/20 bg-purple-200/[0.08] text-purple-100/70"
              : "border-purple-200/15 bg-purple-200/[0.05] text-purple-100/60 hover:border-purple-200/30"
          }`}
        >
          Study Mode
        </Link>
      </div>
    </div>
  );
}