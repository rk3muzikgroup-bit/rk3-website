"use client";

import RKS3AudioBadges from "@/components/music/RKS3AudioBadges";
import { useMemo, useRef, useState } from "react";
import PortalShell from "@/components/portal/PortalShell";
import {
  rks3GeneratedAudioCatalog,
  rks3GeneratedCategories,
  type RKS3GeneratedAudioTrack,
} from "@/lib/rks3GeneratedAudio";

type MusicCategoryFilter = "All" | string;
type VisibilityFilter = "all" | "public" | "review" | "override";
type SortMode = "default" | "title" | "category" | "review-first" | "priority-first";

const CATEGORY_LABELS: Record<string, string> = {
  bilingual: "Bilingual",
  healing: "Healing",
  instrumentals: "Instrumentals",
  mixtapes: "Mixtapes",
  music: "Music",
  poetry: "Poetry",
  promo: "Promo",
  rap: "Rap",
  remixes: "Remixes",
  rnb: "R&B",
  skits: "Skits",
  soul: "Soul",
  spirit: "Spirit",
  street: "Street",
  "site-transitions": "Site Transitions",
  soundscapes: "Soundscapes",
};

function getCategoryLabel(category: string) {
  return CATEGORY_LABELS[category] ?? category;
}

function getCategoryCount(category: string) {
  return rks3GeneratedAudioCatalog.filter(
    (track) => track.category === category
  ).length;
}

function getPriorityScore(priority: string) {
  if (priority === "featured") return 0;
  if (priority === "high") return 1;
  if (priority === "normal") return 2;
  if (priority === "low") return 3;
  return 4;
}

function formatAudioTime(value: number) {
  if (!Number.isFinite(value) || value <= 0) return "0:00";

  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
}

export default function RKS3MusicPortalPage() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [activeCategory, setActiveCategory] =
    useState<MusicCategoryFilter>("All");
  const [search, setSearch] = useState("");
  const [visibilityFilter, setVisibilityFilter] =
    useState<VisibilityFilter>("all");
  const [sortMode, setSortMode] = useState<SortMode>("default");
  const [currentTrack, setCurrentTrack] =
    useState<RKS3GeneratedAudioTrack | null>(
      rks3GeneratedAudioCatalog[0] ?? null
    );
  const [mode, setMode] = useState("Standby");
  const [volume, setVolume] = useState(75);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const filteredTracks = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const filtered = rks3GeneratedAudioCatalog.filter((track) => {
      const matchesCategory =
        activeCategory === "All" || track.category === activeCategory;

      const searchableText = [
        track.title,
        track.sourceTitle,
        track.originalTitle,
        track.versionLabel,
        track.category,
        track.originalFileName,
        track.originalRelativePath,
        track.audioSrc,
        track.visibility,
        track.priority,
        ...track.mood,
        ...track.tags,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        normalizedSearch.length === 0 ||
        searchableText.includes(normalizedSearch);

      const matchesVisibility =
        visibilityFilter === "all" ||
        (visibilityFilter === "public" && track.visibility === "public") ||
        (visibilityFilter === "review" && track.visibility === "review") ||
        (visibilityFilter === "override" && track.hasMetadataOverride);

      return matchesCategory && matchesSearch && matchesVisibility;
    });

    const sorted = [...filtered];

    if (sortMode === "title") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortMode === "category") {
      sorted.sort((a, b) => {
        const categoryCompare = a.category.localeCompare(b.category);
        if (categoryCompare !== 0) return categoryCompare;
        return a.title.localeCompare(b.title);
      });
    }

    if (sortMode === "review-first") {
      sorted.sort((a, b) => {
        const aScore = a.visibility === "review" ? 0 : 1;
        const bScore = b.visibility === "review" ? 0 : 1;
        if (aScore !== bScore) return aScore - bScore;
        return a.title.localeCompare(b.title);
      });
    }

    if (sortMode === "priority-first") {
      sorted.sort((a, b) => {
        const priorityCompare =
          getPriorityScore(a.priority) - getPriorityScore(b.priority);

        if (priorityCompare !== 0) return priorityCompare;

        return a.title.localeCompare(b.title);
      });
    }

    return sorted;
  }, [activeCategory, search, sortMode, visibilityFilter]);

  const publicTrackCount = rks3GeneratedAudioCatalog.filter(
    (track) => track.visibility === "public"
  ).length;

  const reviewTrackCount = rks3GeneratedAudioCatalog.filter(
    (track) => track.visibility === "review"
  ).length;

  const overrideTrackCount = rks3GeneratedAudioCatalog.filter(
    (track) => track.hasMetadataOverride
  ).length;

  const activeFilterSummary = [
    search.trim() ? `Search: ${search.trim()}` : null,
    activeCategory !== "All"
      ? `Category: ${getCategoryLabel(activeCategory)}`
      : null,
    visibilityFilter !== "all"
      ? `Visibility: ${
          visibilityFilter === "review"
            ? "Metadata Review"
            : visibilityFilter === "override"
              ? "Override Applied"
              : "Public"
        }`
      : null,
    sortMode !== "default"
      ? `Sort: ${
          sortMode === "title"
            ? "A-Z"
            : sortMode === "category"
              ? "Category"
              : sortMode === "review-first"
                ? "Review First"
                : "Priority First"
        }`
      : null,
  ].filter(Boolean);

  async function playTrack(track: RKS3GeneratedAudioTrack) {
    setCurrentTrack(track);
    setMode("Loading");
    setCurrentTime(0);
    setDuration(0);

    window.setTimeout(async () => {
      const audio = audioRef.current;

      if (!audio) {
        setMode("Missing Audio");
        return;
      }

      try {
        audio.volume = volume / 100;
        audio.load();
        await audio.play();
        setMode("Playing");
      } catch {
        setMode("Audio Blocked");
      }
    }, 0);
  }

  async function handlePlay() {
    const audio = audioRef.current;

    if (!audio || !currentTrack) {
      setMode("Missing Audio");
      return;
    }

    try {
      audio.volume = volume / 100;
      await audio.play();
      setMode("Playing");
    } catch {
      setMode("Audio Blocked");
    }
  }

  function handleLoadedMetadata() {
    const audio = audioRef.current;
    if (!audio) return;

    setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
    setCurrentTime(audio.currentTime || 0);
  }

  function handleTimeUpdate() {
    const audio = audioRef.current;
    if (!audio) return;

    setCurrentTime(audio.currentTime || 0);
  }

  function handleSeek(value: number) {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = value;
    setCurrentTime(value);
  }

  function handlePause() {
    audioRef.current?.pause();
    setMode("Paused");
  }

  function handleStop() {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    setCurrentTime(0);
    setMode("Stopped");
  }

  function handleNext() {
    const trackList =
      filteredTracks.length > 0 ? filteredTracks : rks3GeneratedAudioCatalog;

    if (!currentTrack || trackList.length === 0) return;

    const currentIndex = trackList.findIndex(
      (track) => track.id === currentTrack.id
    );

    const nextIndex =
      currentIndex >= 0 && currentIndex < trackList.length - 1
        ? currentIndex + 1
        : 0;

    playTrack(trackList[nextIndex]);
  }

  function handlePrevious() {
    const trackList =
      filteredTracks.length > 0 ? filteredTracks : rks3GeneratedAudioCatalog;

    if (!currentTrack || trackList.length === 0) return;

    const currentIndex = trackList.findIndex(
      (track) => track.id === currentTrack.id
    );

    const previousIndex =
      currentIndex > 0 ? currentIndex - 1 : trackList.length - 1;

    playTrack(trackList[previousIndex]);
  }

  function handleVolumeChange(value: number) {
    setVolume(value);

    if (audioRef.current) {
      audioRef.current.volume = value / 100;
    }
  }

  function resetFilters() {
    setSearch("");
    setActiveCategory("All");
    setVisibilityFilter("all");
    setSortMode("default");
  }

  return (
    <PortalShell
      eyebrow="RKS3 Music Portal"
      title="Music"
      accent="rgba(251,113,133,0.86)"
      description="Enter the RKS3 HDWAV Music Universe — R&B, Rap, Healing, Poetry, Instrumentals, Soundscapes, Remixes, Bilingual records, and system audio."
    >
      {currentTrack ? (
        <audio
          ref={audioRef}
          src={currentTrack.audioSrc}
          preload="metadata"
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleNext}
          onError={() => setMode("Audio Error")}
        />
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[0.92fr_1.35fr]">
        <aside className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-6">
          <p className="text-[10px] uppercase tracking-[0.32em] text-white/35">
            Music Control Deck
          </p>

          <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-rose-200/15 bg-black/35 p-6">
            <p className="text-[10px] uppercase tracking-[0.3em] text-rose-100/45">
              Now Playing
            </p>

            <div className="mt-6 flex flex-col gap-6">
              <div className="flex aspect-square items-center justify-center overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/[0.04]">
                <div className="text-center">
                  <p className="text-4xl font-light tracking-[0.18em] text-white/70">
                    RKS3
                  </p>
                  <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-white/30">
                    HDWAV
                  </p>
                </div>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/30">
                  {currentTrack
                    ? getCategoryLabel(currentTrack.category)
                    : "Music Universe"}
                </p>

                <h2 className="mt-3 text-3xl font-light leading-tight tracking-[0.04em] text-white/92">
                  {currentTrack?.title ?? "No Track Selected"}
                </h2>

                <p className="mt-3 text-sm leading-7 text-white/55">
                  {currentTrack
                    ? `${currentTrack.versionLabel} • ${currentTrack.sourceFormat.toUpperCase()}`
                    : "Select a record to begin."}
                </p>

                {currentTrack ? (
                  <p className="mt-3 break-words text-xs leading-6 text-white/35">
                    {currentTrack.audioSrc}
                  </p>
                ) : null}
              </div>

              {currentTrack ? (
                <div className="mt-3">
                  <RKS3AudioBadges track={currentTrack} />
                </div>
              ) : null}

              <div className="rounded-[1rem] border border-white/10 bg-white/[0.03] px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/30">
                    Track Time
                  </p>

                  <p className="text-sm text-rose-100/70">
                    {formatAudioTime(currentTime)} / {formatAudioTime(duration)}
                  </p>
                </div>

                <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  value={duration ? Math.min(currentTime, duration) : 0}
                  disabled={!duration}
                  onChange={(event) => handleSeek(Number(event.target.value))}
                  className="mt-4 w-full accent-rose-200 disabled:opacity-30"
                />
              </div>

              <div className="rounded-[1rem] border border-white/10 bg-white/[0.03] px-4 py-3">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/30">
                    Status
                  </p>

                  <p className="text-sm text-rose-100/70">{mode}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-[10px] uppercase tracking-[0.22em] text-white/55 transition hover:border-rose-200/35 hover:text-rose-100"
                >
                  Previous
                </button>

                <button
                  type="button"
                  onClick={handlePlay}
                  className="rounded-full border border-rose-200/25 bg-rose-200/[0.08] px-5 py-3 text-[10px] uppercase tracking-[0.22em] text-rose-100/70 transition hover:border-rose-200/45 hover:text-rose-100"
                >
                  Play
                </button>

                <button
                  type="button"
                  onClick={handlePause}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-[10px] uppercase tracking-[0.22em] text-white/55 transition hover:border-rose-200/35 hover:text-rose-100"
                >
                  Pause
                </button>

                <button
                  type="button"
                  onClick={handleStop}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-[10px] uppercase tracking-[0.22em] text-white/55 transition hover:border-rose-200/35 hover:text-rose-100"
                >
                  Stop
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-[10px] uppercase tracking-[0.22em] text-white/55 transition hover:border-rose-200/35 hover:text-rose-100"
                >
                  Next
                </button>
              </div>

              <div className="rounded-[1rem] border border-white/10 bg-white/[0.03] px-4 py-4">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/30">
                    Volume
                  </p>

                  <p className="text-sm text-rose-100/70">{volume}%</p>
                </div>

                <input
                  type="range"
                  min={0}
                  max={100}
                  value={volume}
                  onChange={(event) =>
                    handleVolumeChange(Number(event.target.value))
                  }
                  className="mt-4 w-full accent-rose-200"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-black/25 p-5">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">
              HDWAV Import Status
            </p>

            <p className="mt-4 text-sm leading-7 text-white/55">
              This page is now connected to the generated RKS3 HDWAV-only
              catalog. MP3 and regular WAV files are excluded from this platform
              layer.
            </p>
          </div>
        </aside>

        <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 md:p-8">
          <div className="flex flex-wrap gap-3">
            <span className="rounded-full border border-rose-200/15 bg-rose-200/[0.06] px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-rose-100/60">
              HDWAV Catalog
            </span>

            <span className="rounded-full border border-white/10 px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-white/35">
              {rks3GeneratedAudioCatalog.length} Records Indexed
            </span>
          </div>

          <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-rose-200/15 bg-black/30 p-6 md:p-8">
            <p className="text-[10px] uppercase tracking-[0.34em] text-rose-100/45">
              RKS3 Music Universe
            </p>

            <h3 className="mt-5 max-w-4xl text-4xl font-light leading-tight tracking-[0.04em] text-white/92 md:text-6xl">
              Street • Soul • Spirit
            </h3>

            <p className="mt-5 max-w-4xl text-sm leading-8 text-white/58 md:text-base">
              A living HDWAV sound world for RKS3 records, healing
              transmissions, poetry, instrumentals, soundscapes, remixes, and
              bilingual expansion.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <span className="rounded-full border border-rose-200/20 bg-rose-200/[0.07] px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-rose-100/65">
                HDWAV Website Source
              </span>

              <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-white/45">
                Generated Catalog
              </span>

              <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-white/45">
                Built To Scale
              </span>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <div className="rounded-[1.35rem] border border-white/10 bg-black/25 p-5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
                Records
              </p>

              <h3 className="mt-4 text-3xl font-light text-white/90">
                {rks3GeneratedAudioCatalog.length}
              </h3>

              <p className="mt-2 text-sm text-white/45">HDWAV Records</p>
            </div>

            <div className="rounded-[1.35rem] border border-white/10 bg-black/25 p-5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
                Categories
              </p>

              <h3 className="mt-4 text-3xl font-light text-white/90">
                {rks3GeneratedCategories.length}
              </h3>

              <p className="mt-2 text-sm text-white/45">Indexed Rooms</p>
            </div>

            <div className="rounded-[1.35rem] border border-white/10 bg-black/25 p-5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
                Source
              </p>

              <h3 className="mt-4 text-3xl font-light text-white/90">
                HDWAV
              </h3>

              <p className="mt-2 text-sm text-white/45">RKS3 Standard</p>
            </div>

            <div className="rounded-[1.35rem] border border-white/10 bg-black/25 p-5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
                Status
              </p>

              <h3 className="mt-4 text-3xl font-light text-rose-100">
                Testing
              </h3>

              <p className="mt-2 text-sm text-white/45">Sample Import</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-[1fr_auto]">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search songs, categories, source filenames..."
              className="rounded-full border border-white/10 bg-black/35 px-5 py-3 text-sm text-white/70 outline-none placeholder:text-white/25 focus:border-rose-200/35"
            />

            <button
              type="button"
              onClick={resetFilters}
              className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-[10px] uppercase tracking-[0.22em] text-white/45 transition hover:border-white/25 hover:text-white/75"
            >
              Reset
            </button>
          </div>

          <div className="mt-8 flex items-center justify-between gap-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">
              Category Filters
            </p>

            <p className="text-xs text-white/30">
              {filteredTracks.length} showing
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveCategory("All")}
              className={`rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.22em] transition ${
                activeCategory === "All"
                  ? "border-rose-200/35 bg-rose-200/[0.12] text-rose-100"
                  : "border-white/10 bg-white/[0.035] text-white/42 hover:border-rose-200/25 hover:text-rose-100/70"
              }`}
            >
              All • {rks3GeneratedAudioCatalog.length}
            </button>

            {rks3GeneratedCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.22em] transition ${
                  activeCategory === category
                    ? "border-rose-200/35 bg-rose-200/[0.12] text-rose-100"
                    : "border-white/10 bg-white/[0.035] text-white/42 hover:border-rose-200/25 hover:text-rose-100/70"
                }`}
              >
                {getCategoryLabel(category)} • {getCategoryCount(category)}
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="rounded-[1.35rem] border border-white/10 bg-black/25 p-5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">
                Visibility Filters
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setVisibilityFilter("all")}
                  className={`rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.22em] transition ${
                    visibilityFilter === "all"
                      ? "border-rose-200/35 bg-rose-200/[0.12] text-rose-100"
                      : "border-white/10 bg-white/[0.035] text-white/42 hover:border-rose-200/25 hover:text-rose-100/70"
                  }`}
                >
                  All • {rks3GeneratedAudioCatalog.length}
                </button>

                <button
                  type="button"
                  onClick={() => setVisibilityFilter("public")}
                  className={`rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.22em] transition ${
                    visibilityFilter === "public"
                      ? "border-emerald-200/35 bg-emerald-200/[0.12] text-emerald-100"
                      : "border-white/10 bg-white/[0.035] text-white/42 hover:border-emerald-200/25 hover:text-emerald-100/70"
                  }`}
                >
                  Public • {publicTrackCount}
                </button>

                <button
                  type="button"
                  onClick={() => setVisibilityFilter("review")}
                  className={`rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.22em] transition ${
                    visibilityFilter === "review"
                      ? "border-amber-200/35 bg-amber-200/[0.12] text-amber-100"
                      : "border-white/10 bg-white/[0.035] text-white/42 hover:border-amber-200/25 hover:text-amber-100/70"
                  }`}
                >
                  Review • {reviewTrackCount}
                </button>

                <button
                  type="button"
                  onClick={() => setVisibilityFilter("override")}
                  className={`rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.22em] transition ${
                    visibilityFilter === "override"
                      ? "border-cyan-200/35 bg-cyan-200/[0.12] text-cyan-100"
                      : "border-white/10 bg-white/[0.035] text-white/42 hover:border-cyan-200/25 hover:text-cyan-100/70"
                  }`}
                >
                  Override • {overrideTrackCount}
                </button>
              </div>
            </div>

            <div className="rounded-[1.35rem] border border-white/10 bg-black/25 p-5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">
                Sort Order
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  ["default", "Default"],
                  ["title", "A-Z"],
                  ["category", "Category"],
                  ["review-first", "Review First"],
                  ["priority-first", "Priority First"],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setSortMode(value as SortMode)}
                    className={`rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.22em] transition ${
                      sortMode === value
                        ? "border-rose-200/35 bg-rose-200/[0.12] text-rose-100"
                        : "border-white/10 bg-white/[0.035] text-white/42 hover:border-rose-200/25 hover:text-rose-100/70"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-[1.2rem] border border-white/10 bg-white/[0.025] p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">
                  Active View
                </p>

                <p className="mt-2 text-sm text-white/60">
                  Showing {filteredTracks.length} of {rks3GeneratedAudioCatalog.length} HDWAV records.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {activeFilterSummary.length > 0 ? (
                  activeFilterSummary.map((label) => (
                    <span
                      key={label}
                      className="rounded-full border border-rose-200/15 bg-rose-200/[0.07] px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-rose-100/70"
                    >
                      {label}
                    </span>
                  ))
                ) : (
                  <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-white/40">
                    Full Catalog View
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4">
            {filteredTracks.length > 0 ? (
              filteredTracks.map((track, index) => {
                const isActive = currentTrack?.id === track.id;

                return (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => playTrack(track)}
                    className={`group rounded-[1.35rem] border p-5 text-left transition hover:-translate-y-0.5 ${
                      isActive
                        ? "border-rose-200/45 bg-rose-200/[0.09] shadow-[0_0_35px_rgba(251,113,133,0.12)]"
                        : track.visibility === "review"
                          ? "border-amber-200/20 bg-amber-200/[0.035] hover:border-amber-200/35 hover:bg-amber-200/[0.055]"
                          : "border-white/10 bg-black/25 hover:border-rose-200/25 hover:bg-white/[0.045]"
                    }`}
                  >
                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                      <div className="flex gap-5">
                        <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-[1rem] border border-white/10 bg-white/[0.04]">
                          <div className="text-center">
                            <p className="text-sm tracking-[0.18em] text-white/50">
                              RKS3
                            </p>
                            <p className="mt-1 text-[9px] uppercase tracking-[0.22em] text-white/25">
                              HDWAV
                            </p>
                          </div>
                        </div>

                        <div>
                          <p className="text-[10px] uppercase tracking-[0.28em] text-white/32">
                            Record {String(index + 1).padStart(2, "0")} •{" "}
                            {getCategoryLabel(track.category)}
                          </p>

                          <h4 className="mt-3 text-2xl font-light tracking-[0.03em] text-white/90">
                            {track.title}
                          </h4>

                          <p className="mt-2 text-sm leading-7 text-white/55">
                            {track.versionLabel} • {track.sourceFormat.toUpperCase()}
                          </p>

                          <p className="mt-2 break-words text-xs leading-6 text-white/35">
                            {track.audioSrc}
                          </p>

                          <div className="mt-3">
                            <RKS3AudioBadges track={track} compact />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-3">
                        <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-white/42 group-hover:text-rose-100/70">
                          {isActive ? "Now Playing" : track.visibility === "review" ? "Review" : "Select"}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="rounded-[1.5rem] border border-amber-200/15 bg-amber-200/[0.045] p-6">
                <p className="text-[10px] uppercase tracking-[0.3em] text-amber-100/55">
                  No Records Found
                </p>

                <p className="mt-4 text-sm leading-7 text-white/58">
                  Adjust the search, category, visibility, or sort controls to
                  return to the full Music Universe.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </PortalShell>
  );
}
