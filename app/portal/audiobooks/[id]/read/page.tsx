import Link from "next/link";
import { notFound } from "next/navigation";
import PortalShell from "@/components/portal/PortalShell";
import LivingBookNav from "@/components/books/LivingBookNav";
import { booksCatalog } from "@/data/books/booksCatalog";

type AudiobookReadPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AudiobookReadPage({
  params,
}: AudiobookReadPageProps) {
  const { id } = await params;
  const audiobookId = decodeURIComponent(id);

  const book = booksCatalog.find((item) => {
    return item.id === audiobookId || item.audiobookId === audiobookId;
  });

  if (!book) {
    notFound();
  }

  const activeAudiobookId = book.audiobookId || book.id;
  const hasReaderSections =
    Array.isArray(book.readerSections) && book.readerSections.length > 0;

  return (
    <PortalShell
      eyebrow="RKS3 Read Companion"
      title={book.title}
      accent="rgba(45,212,191,0.78)"
      description="Readable companion text for the RKS3 Audiobooks knowledge chamber."
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.35fr]">
        <aside className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-6">
          <p className="text-[10px] uppercase tracking-[0.32em] text-white/35">
            Companion Card
          </p>

          <div className="mt-6 rounded-[1.5rem] border border-teal-200/15 bg-black/35 p-5">
            <p className="text-[10px] uppercase tracking-[0.3em] text-teal-100/45">
              {book.type}
            </p>

            <h2 className="mt-5 text-3xl font-light leading-tight tracking-[0.04em] text-white/92">
              {book.title}
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/55">
              {book.subtitle}
            </p>

            <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

            <div className="mt-6 space-y-3 text-sm text-white/52">
              <p>Author • {book.author}</p>
              <p>Status • {book.status}</p>
              <p>Mode • {book.readingMode}</p>
              <p>Lane • {book.portalLane}</p>
              <p>Frequency • {book.frequency}</p>
            </div>
          </div>

          <div className="mt-6">
            <LivingBookNav
              bookId={book.id}
              audiobookId={activeAudiobookId}
              activeMode="read"
            />
          </div>

          <Link
            href="/portal/audiobooks"
            prefetch={false}
            className="mt-6 inline-flex rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-[10px] uppercase tracking-[0.28em] text-white/45 transition hover:border-white/25 hover:text-white/75"
          >
            Return To Audiobooks
          </Link>
        </aside>

        <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 md:p-8">
          <div className="flex flex-wrap gap-3">
            <span className="rounded-full border border-teal-200/15 bg-teal-200/[0.05] px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-teal-100/60">
              Read Mode
            </span>

            <span className="rounded-full border border-white/10 px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-white/35">
              Audiobook Companion
            </span>
          </div>

          <h3 className="mt-8 text-3xl font-light tracking-[0.04em] text-white/92 md:text-4xl">
            {book.title}
          </h3>

          <p className="mt-4 max-w-3xl text-sm leading-8 text-white/58 md:text-base">
            {book.description}
          </p>

          <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          {hasReaderSections ? (
            <div className="mt-8 space-y-8">
              {book.readerSections.map((section, index) => (
                <article
                  key={`${book.id}-reader-section-${index}`}
                  className="rounded-[1.5rem] border border-white/10 bg-black/25 p-6"
                >
                  <p className="text-[10px] uppercase tracking-[0.3em] text-teal-100/45">
                    Section {index + 1}
                  </p>

                  <h4 className="mt-4 text-2xl font-light tracking-[0.04em] text-white/90">
                    {section.title}
                  </h4>

                  {section.subtitle ? (
                    <p className="mt-3 text-sm leading-7 text-white/45">
                      {section.subtitle}
                    </p>
                  ) : null}

                  <div className="mt-6 space-y-5">
                    {section.body.map((paragraph, paragraphIndex) => (
                      <p
                        key={`${book.id}-section-${index}-paragraph-${paragraphIndex}`}
                        className="text-sm leading-8 text-white/62 md:text-base"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-[1.5rem] border border-amber-200/15 bg-amber-200/[0.045] p-6">
              <p className="text-[10px] uppercase tracking-[0.3em] text-amber-100/55">
                Read Companion Pending
              </p>

              <p className="mt-4 text-sm leading-7 text-white/58">
                This audiobook is inside the RKS3 archive, but the readable
                companion text has not been added yet. The route is live, so
                future text can be dropped in without changing the structure.
              </p>

              <Link
                href={`/portal/audiobooks/${activeAudiobookId}`}
                prefetch={false}
                className="mt-6 inline-flex rounded-full border border-amber-200/20 bg-amber-200/[0.06] px-5 py-3 text-[10px] uppercase tracking-[0.24em] text-amber-100/70 transition hover:border-amber-200/40 hover:text-amber-100"
              >
                Listen Instead →
              </Link>
            </div>
          )}
        </section>
      </div>
    </PortalShell>
  );
}