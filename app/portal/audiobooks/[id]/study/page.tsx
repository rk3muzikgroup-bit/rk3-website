import Link from "next/link";
import { notFound } from "next/navigation";
import PortalShell from "@/components/portal/PortalShell";
import LivingBookNav from "@/components/books/LivingBookNav";
import { booksCatalog } from "@/data/books/booksCatalog";

type AudiobookStudyPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const fallbackStudyStandard = {
  thesis:
    "This RKS3 study chamber is online, but the full title-specific institute guide has not been loaded yet. The route is live so the study architecture can receive pro-grade material without changing the system later.",
  researchStandard:
    "RKS3 study material separates observation, tradition, symbolism, and scientific claims. Medical, psychological, neurological, or biological claims must be handled carefully and never presented as guaranteed treatment.",
  rks3Position:
    "RKS3 treats study as awareness practice: listen, read, observe, reflect, integrate, and return with stronger clarity.",
};

export default async function AudiobookStudyPage({
  params,
}: AudiobookStudyPageProps) {
  const { id } = await params;
  const audiobookId = decodeURIComponent(id);

  const book = booksCatalog.find((item) => {
    return item.id === audiobookId || item.audiobookId === audiobookId;
  });

  if (!book) {
    notFound();
  }

  const activeAudiobookId = book.audiobookId || book.id;
  const studyGuide = book.studyGuide;
  const sectionStudies = studyGuide?.sectionStudies ?? [];

  return (
    <PortalShell
      eyebrow="RKS3 Institute Study Chamber"
      title={book.title}
      accent="rgba(168,85,247,0.82)"
      description="Professional study mode for the RKS3 Audiobooks knowledge chamber."
    >
      <div className="grid gap-6 lg:grid-cols-[0.88fr_1.42fr]">
        <aside className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-6">
          <p className="text-[10px] uppercase tracking-[0.32em] text-white/35">
            Institute Card
          </p>

          <div className="mt-6 rounded-[1.5rem] border border-purple-200/15 bg-black/35 p-5">
            <p className="text-[10px] uppercase tracking-[0.3em] text-purple-100/45">
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
              <p>Mode • Institute Study</p>
              <p>Lane • {book.portalLane}</p>
              <p>Frequency • {book.frequency}</p>
            </div>
          </div>

          <div className="mt-6">
            <LivingBookNav
              bookId={book.id}
              audiobookId={activeAudiobookId}
              activeMode="study"
            />
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-black/25 p-5">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">
              2056 Study Protocol
            </p>

            <div className="mt-4 grid gap-3">
              {[
                "Listen for state change.",
                "Read for language and structure.",
                "Study for symbolic and practical integration.",
                "Return later for deeper observation.",
              ].map((item, index) => (
                <div
                  key={item}
                  className="rounded-[1rem] border border-white/10 bg-white/[0.03] px-4 py-3"
                >
                  <p className="text-[10px] uppercase tracking-[0.24em] text-purple-100/45">
                    Protocol {index + 1}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-white/62">
                    {item}
                  </p>
                </div>
              ))}
            </div>
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
            <span className="rounded-full border border-purple-200/15 bg-purple-200/[0.06] px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-purple-100/60">
              Study Mode
            </span>

            <span className="rounded-full border border-teal-200/15 bg-teal-200/[0.05] px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-teal-100/60">
              Professional Companion
            </span>

            <span className="rounded-full border border-white/10 px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-white/35">
              {studyGuide ? "Institute Data Online" : "Guide Pending"}
            </span>
          </div>

          <h3 className="mt-8 text-3xl font-light tracking-[0.04em] text-white/92 md:text-5xl">
            {book.title} Study Chamber
          </h3>

          <p className="mt-5 max-w-4xl text-sm leading-8 text-white/58 md:text-base">
            {studyGuide?.thesis ?? fallbackStudyStandard.thesis}
          </p>

          <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          {studyGuide ? (
            <>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <div className="rounded-[1.5rem] border border-purple-200/15 bg-purple-200/[0.045] p-6">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-purple-100/55">
                    Esoteric Notes
                  </p>

                  <div className="mt-5 space-y-4">
                    {studyGuide.esotericNotes.map((note, index) => (
                      <p
                        key={`esoteric-${index}`}
                        className="text-sm leading-7 text-white/58"
                      >
                        {note}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-teal-200/15 bg-teal-200/[0.04] p-6">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-teal-100/55">
                    Practical Applications
                  </p>

                  <div className="mt-5 grid gap-3">
                    {studyGuide.practicalApplications.map((item, index) => (
                      <div
                        key={`practical-${index}`}
                        className="rounded-[1rem] border border-white/10 bg-black/25 px-4 py-3"
                      >
                        <p className="text-sm leading-6 text-white/58">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-black/25 p-6">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">
                  Key Terms
                </p>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {studyGuide.keyTerms.map((item) => (
                    <div
                      key={item.term}
                      className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-5"
                    >
                      <h4 className="text-lg font-light tracking-[0.03em] text-white/88">
                        {item.term}
                      </h4>

                      <p className="mt-3 text-sm leading-7 text-white/55">
                        {item.definition}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-black/25 p-6">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">
                  Section-Level Study
                </p>

                <div className="mt-5 grid gap-5">
                  {sectionStudies.map((section, index) => (
                    <article
                      key={`${book.id}-study-${section.title}`}
                      className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-5"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.26em] text-purple-100/45">
                            Section {index + 1}
                          </p>

                          <h4 className="mt-3 text-2xl font-light tracking-[0.03em] text-white/90">
                            {section.title}
                          </h4>
                        </div>

                        <Link
                          href={`/portal/audiobooks/${activeAudiobookId}/read#section-${
                            index + 1
                          }`}
                          prefetch={false}
                          className="rounded-full border border-teal-200/20 bg-teal-200/[0.06] px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-teal-100/65 transition hover:border-teal-200/40 hover:text-teal-100"
                        >
                          Read Section →
                        </Link>
                      </div>

                      <div className="mt-5 grid gap-4 md:grid-cols-3">
                        <div className="rounded-[1rem] border border-white/10 bg-black/25 p-4">
                          <p className="text-[10px] uppercase tracking-[0.25em] text-white/32">
                            Core Idea
                          </p>
                          <p className="mt-3 text-sm leading-7 text-white/58">
                            {section.coreIdea}
                          </p>
                        </div>

                        <div className="rounded-[1rem] border border-purple-200/15 bg-purple-200/[0.04] p-4">
                          <p className="text-[10px] uppercase tracking-[0.25em] text-purple-100/45">
                            Esoteric Layer
                          </p>
                          <p className="mt-3 text-sm leading-7 text-white/58">
                            {section.esotericLayer}
                          </p>
                        </div>

                        <div className="rounded-[1rem] border border-teal-200/15 bg-teal-200/[0.035] p-4">
                          <p className="text-[10px] uppercase tracking-[0.25em] text-teal-100/45">
                            Practical Layer
                          </p>
                          <p className="mt-3 text-sm leading-7 text-white/58">
                            {section.practicalLayer}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 rounded-[1rem] border border-white/10 bg-black/25 p-4">
                        <p className="text-[10px] uppercase tracking-[0.25em] text-white/32">
                          Reflection Prompts
                        </p>

                        <div className="mt-4 grid gap-3">
                          {section.prompts.map((prompt) => (
                            <div
                              key={`${section.title}-${prompt}`}
                              className="rounded-[0.9rem] border border-white/10 bg-white/[0.03] px-4 py-3"
                            >
                              <p className="text-sm leading-6 text-white/60">
                                {prompt}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-5 rounded-[1rem] border border-amber-200/15 bg-amber-200/[0.045] p-4">
                        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-100/50">
                          Integration Practice
                        </p>

                        <p className="mt-3 text-sm leading-7 text-white/60">
                          {section.integrationPractice}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <div className="rounded-[1.5rem] border border-cyan-200/15 bg-cyan-200/[0.035] p-6">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-100/55">
                    Cross References
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {studyGuide.crossReferences.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-white/45"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-amber-200/15 bg-amber-200/[0.045] p-6">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-amber-100/55">
                    Research Standard
                  </p>

                  <p className="mt-4 text-sm leading-7 text-white/58">
                    {studyGuide.researchStandard}
                  </p>
                </div>
              </div>

              <div className="mt-8 rounded-[1.5rem] border border-emerald-200/15 bg-emerald-200/[0.04] p-6">
                <p className="text-[10px] uppercase tracking-[0.3em] text-emerald-100/55">
                  RKS3 Position
                </p>

                <p className="mt-4 text-sm leading-8 text-white/60 md:text-base">
                  {studyGuide.rks3Position}
                </p>
              </div>
            </>
          ) : (
            <div className="mt-8 rounded-[1.5rem] border border-amber-200/15 bg-amber-200/[0.045] p-6">
              <p className="text-[10px] uppercase tracking-[0.3em] text-amber-100/55">
                Institute Guide Pending
              </p>

              <p className="mt-4 text-sm leading-7 text-white/58">
                {fallbackStudyStandard.researchStandard}
              </p>

              <p className="mt-4 text-sm leading-7 text-white/58">
                {fallbackStudyStandard.rks3Position}
              </p>
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/portal/audiobooks/${activeAudiobookId}`}
              prefetch={false}
              className="inline-flex rounded-full border border-cyan-200/20 bg-cyan-200/[0.06] px-5 py-3 text-[10px] uppercase tracking-[0.24em] text-cyan-100/70 transition hover:border-cyan-200/40 hover:text-cyan-100"
            >
              Listen Room →
            </Link>

            <Link
              href={`/portal/audiobooks/${activeAudiobookId}/read`}
              prefetch={false}
              className="inline-flex rounded-full border border-teal-200/20 bg-teal-200/[0.06] px-5 py-3 text-[10px] uppercase tracking-[0.24em] text-teal-100/70 transition hover:border-teal-200/40 hover:text-teal-100"
            >
              Read Companion →
            </Link>
          </div>
        </section>
      </div>
    </PortalShell>
  );
}