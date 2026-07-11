"use client";

import Link from "next/link";
import type { Route } from "next";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useParams } from "next/navigation";
import PortalShell from "@/components/portal/PortalShell";
import RKS3AudioBadges from "@/components/music/RKS3AudioBadges";
import {
  rks3GeneratedAudioCatalog,
  type RKS3GeneratedAudioTrack,
} from "@/lib/rks3GeneratedAudio";

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

function getRecordUrl(track: RKS3GeneratedAudioTrack): Route {
  return `/portal/music/${track.id}` as Route;
}

function getParamId(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

function formatAudioTime(value: number) {
  if (!Number.isFinite(value) || value <= 0) return "0:00";

  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
}

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

export default function MusicRecordRoomPage() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [mode, setMode] = useState("Standby");
  const [volume, setVolume] = useState(75);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const params = useParams<{ id?: string | string[] }>();
  const recordId = getParamId(params.id).trim().toLowerCase();

  const track = useMemo(() => {
    return rks3GeneratedAudioCatalog.find(
      (record) => record.id.trim().toLowerCase() === recordId
    );
  }, [recordId]);

  const recordIndex = track
    ? rks3GeneratedAudioCatalog.findIndex((record) => record.id === track.id)
    : -1;

  const previousTrack =
    recordIndex > 0
      ? rks3GeneratedAudioCatalog[recordIndex - 1]
      : rks3GeneratedAudioCatalog.at(-1);

  const nextTrack =
    recordIndex >= 0 && recordIndex < rks3GeneratedAudioCatalog.length - 1
      ? rks3GeneratedAudioCatalog[recordIndex + 1]
      : rks3GeneratedAudioCatalog[0];

  const moreFromCategory = useMemo(() => {
    if (!track) return [];

    return rks3GeneratedAudioCatalog
      .filter(
        (record) => record.category === track.category && record.id !== track.id
      )
      .slice(0, 6);
  }, [track]);

  useEffect(() => {
    setMode("Standby");
    setDuration(0);
    setCurrentTime(0);

    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
  }, [track?.id]);

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

  async function handlePlay() {
    const audio = audioRef.current;

    if (!audio || !track) {
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

  function handleVolumeChange(value: number) {
    setVolume(value);

    if (audioRef.current) {
      audioRef.current.volume = value / 100;
    }
  }

  if (!track) {
    return (
      <PortalShell
        eyebrow="RKS3 Music Portal"
        title="Record Not Found"
        accent="rgba(251,113,133,0.86)"
        description="This record room does not exist in the generated HDWAV catalog yet."
      >
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6">
          <p className="text-sm leading-7 text-white/55">
            This record ID does not match the current RKS3 HDWAV catalog.
          </p>

          <Link
            href="/portal/music"
            prefetch={false}
            className="mt-6 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-[10px] uppercase tracking-[0.28em] text-white/55 transition hover:border-rose-200/35 hover:text-rose-100"
          >
            Return To Music Portal
          </Link>
        </div>
      </PortalShell>
    );
  }

  return (
    <PortalShell
      eyebrow={`${getCategoryLabel(track.category)} Record Room`}
      title={track.title}
      accent="rgba(251,113,133,0.86)"
      description="A living HDWAV record inside the RKS3 Music Universe."
    >
      <audio
        ref={audioRef}
        src={track.audioSrc}
        preload="metadata"
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => {
          setMode("Complete");
          setCurrentTime(duration);
        }}
        onError={() => setMode("Audio Error")}
      />

      <div className="grid gap-6 lg:grid-cols-[0.92fr_1.35fr]">
        <aside className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6">
          <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-white/35">
            <Link
              href="/portal/music"
              prefetch={false}
              className="transition hover:text-rose-100"
            >
              Music
            </Link>
            <span>/</span>
            <span>{getCategoryLabel(track.category)}</span>
            <span>/</span>
            <span className="text-rose-100/70">{track.title}</span>
          </div>

          <div className="mt-6 flex aspect-square items-center justify-center overflow-hidden rounded-[1.75rem] border border-rose-200/15 bg-black/35 p-6">
            <div className="text-center">
              <p className="text-5xl font-light tracking-[0.18em] text-white/75">
                RKS3
              </p>
              <p className="mt-4 text-[10px] uppercase tracking-[0.32em] text-rose-100/50">
                HDWAV Record
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.24em] text-white/30">
                {getCategoryLabel(track.category)}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-rose-200/15 bg-black/30 p-5">
            <p className="text-[10px] uppercase tracking-[0.3em] text-rose-100/45">
              Record Controls
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
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
            </div>

            <div className="mt-6 rounded-[1rem] border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[10px] uppercase tracking-[0.28em] text-white/30">
                  Track Time
                </span>
                <span className="text-sm text-rose-100/70">
                  {formatAudioTime(currentTime)} / {formatAudioTime(duration)}
                </span>
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

            <div className="mt-5 rounded-[1rem] border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.28em] text-white/30">
                  Status
                </span>
                <span className="text-sm text-rose-100/70">{mode}</span>
              </div>
            </div>

            <div className="mt-5 rounded-[1rem] border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.28em] text-white/30">
                  Volume
                </span>
                <span className="text-sm text-rose-100/70">{volume}%</span>
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

          <div className="mt-6 grid gap-3">
            {previousTrack ? (
              <Link
                href={getRecordUrl(previousTrack)}
                prefetch={false}
                className="rounded-[1.2rem] border border-white/10 bg-white/[0.03] p-4 transition hover:border-rose-200/25 hover:bg-rose-200/[0.05]"
              >
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/30">
                  Previous Record
                </p>
                <p className="mt-2 text-sm text-white/70">
                  {previousTrack.title}
                </p>
              </Link>
            ) : null}

            {nextTrack ? (
              <Link
                href={getRecordUrl(nextTrack)}
                prefetch={false}
                className="rounded-[1.2rem] border border-white/10 bg-white/[0.03] p-4 transition hover:border-rose-200/25 hover:bg-rose-200/[0.05]"
              >
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/30">
                  Next Record
                </p>
                <p className="mt-2 text-sm text-white/70">{nextTrack.title}</p>
              </Link>
            ) : null}
          </div>

          <Link
            href="/portal/music"
            prefetch={false}
            className="mt-6 inline-flex rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-[10px] uppercase tracking-[0.28em] text-white/45 transition hover:border-white/25 hover:text-white/75"
          >
            Back To Music Portal
          </Link>
        </aside>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 md:p-8">
          <div className="flex flex-wrap gap-3">
            <span className="rounded-full border border-rose-200/15 bg-rose-200/[0.06] px-4 py-1.5 text-[10px] uppercase tracking-[0.28em] text-rose-100/60">
              {getCategoryLabel(track.category)}
            </span>

            <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[10px] uppercase tracking-[0.28em] text-white/40">
              {track.versionLabel}
            </span>

            <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[10px] uppercase tracking-[0.28em] text-white/40">
              {track.sourceFormat.toUpperCase()}
            </span>
          </div>

          <h1 className="mt-7 max-w-4xl text-4xl font-light leading-tight tracking-[0.04em] text-white/92 md:text-6xl">
            {track.title}
          </h1>

          <p className="mt-5 max-w-4xl text-sm leading-8 text-white/58 md:text-base">
            This record room is connected to the generated RKS3 HDWAV-only
            catalog. MP3 and regular WAV files are excluded from this platform
            layer.
          </p>

          <div className="mt-7">
            <RKS3AudioBadges track={track} />
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <MetaCard label="Category" value={getCategoryLabel(track.category)} />
            <MetaCard label="Version" value={track.versionLabel} />
            <MetaCard label="Source" value={track.sourceFormat.toUpperCase()} />
            <MetaCard label="Status" value={getVisibilityLabel(track.visibility)} />
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-6">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">
                Metadata Layer
              </p>

              <div className="mt-5 grid gap-4">
                <DetailRow label="Priority" value={getPriorityLabel(track.priority)} />
                <DetailRow
                  label="Override"
                  value={track.hasMetadataOverride ? "Applied" : "Not Applied"}
                />
                <DetailRow
                  label="Source Title"
                  value={track.sourceTitle || track.originalTitle}
                />
                {track.displaySubtitle ? (
                  <DetailRow label="Subtitle" value={track.displaySubtitle} />
                ) : null}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-6">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">
                Website Audio Source
              </p>

              <p className="mt-4 break-words text-sm leading-7 text-white/55">
                {track.audioSrc}
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-black/25 p-6">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">
              Original HDWAV Source File
            </p>

            <p className="mt-4 break-words text-sm leading-7 text-white/55">
              {track.originalFileName}
            </p>

            <p className="mt-4 break-words text-xs leading-7 text-white/35">
              {track.originalRelativePath}
            </p>
          </div>

          {track.notes ? (
            <div className="mt-8 rounded-[1.5rem] border border-amber-200/15 bg-amber-200/[0.045] p-6">
              <p className="text-[10px] uppercase tracking-[0.3em] text-amber-100/55">
                Review Notes
              </p>

              <p className="mt-4 text-sm leading-7 text-white/58">
                {track.notes}
              </p>
            </div>
          ) : null}

          {moreFromCategory.length > 0 ? (
            <RecordLinkPanel
              title={`More From ${getCategoryLabel(track.category)}`}
              records={moreFromCategory}
            />
          ) : null}
        </section>
      </div>
    </PortalShell>
  );
}

function MetaCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.35rem] border border-white/10 bg-black/25 p-5">
      <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
        {label}
      </p>
      <p className="mt-3 text-xl font-light text-white/85">{value}</p>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-white/10 pb-3 last:border-b-0 last:pb-0">
      <p className="text-[10px] uppercase tracking-[0.26em] text-white/30">
        {label}
      </p>
      <p className="mt-2 break-words text-sm leading-6 text-white/65">
        {value}
      </p>
    </div>
  );
}

function RecordLinkPanel({
  title,
  records,
}: {
  title: string;
  records: RKS3GeneratedAudioTrack[];
}) {
  return (
    <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-black/25 p-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">
          {title}
        </p>

        <span className="text-xs text-white/30">{records.length} records</span>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {records.map((record) => (
          <Link
            key={record.id}
            href={getRecordUrl(record)}
            prefetch={false}
            className={`rounded-[1.1rem] border p-4 transition ${
              record.visibility === "review"
                ? "border-amber-200/20 bg-amber-200/[0.035] hover:border-amber-200/35 hover:bg-amber-200/[0.055]"
                : "border-white/10 bg-white/[0.035] hover:border-rose-200/30 hover:bg-rose-200/[0.06]"
            }`}
          >
            <p className="text-[10px] uppercase tracking-[0.24em] text-white/30">
              {getCategoryLabel(record.category)}
            </p>

            <h3 className="mt-2 text-lg font-light text-white/85">
              {record.title}
            </h3>

            <p className="mt-2 text-sm text-white/45">
              {record.versionLabel} • {record.sourceFormat.toUpperCase()}
            </p>

            <div className="mt-3">
              <RKS3AudioBadges track={record} compact />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
