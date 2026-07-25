"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import PortalShell from "@/components/portal/PortalShell";
import LivingBookNav from "../../../components/books/LivingBookNav";

type AudiobookBook = {
  id: string;
  title: string;
  category: string;
  narrator: string;
  runtime: string;
  status: string;
  frequency?: string;
  audioBasePath?: string;
  relatedBookId?: string;
  sections?: string[];
};

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function AudiobookRoomClient({ book }: { book: AudiobookBook }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastAudioSrcRef = useRef("");

  const [mode, setMode] = useState("Standby");
  const [volume, setVolume] = useState(70);
  const [speed, setSpeed] = useState(1);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [shouldAutoPlay, setShouldAutoPlay] = useState(false);
  const [audioError, setAudioError] = useState(false);

  const sections = useMemo(() => {
    return book.sections?.length ? book.sections : ["Opening Section"];
  }, [book.sections]);

  const audioSrc = useMemo(() => {
    if (!book.audioBasePath) return "";

    return `${book.audioBasePath}/section-${sectionIndex + 1}.mp3`;
  }, [book.audioBasePath, sectionIndex]);

  const hasPrevious = sectionIndex > 0;
  const hasNext = sectionIndex < sections.length - 1;

  useEffect(() => {
  const audio = audioRef.current;
  if (!audio || !audioSrc) return;

  if (lastAudioSrcRef.current === audioSrc) return;

  lastAudioSrcRef.current = audioSrc;

  setAudioError(false);
  setDuration(0);
  setCurrentTime(0);
  setMode("Section Loaded");

  audio.pause();
  audio.currentTime = 0;
  audio.load();
}, [audioSrc, speed, volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume / 100;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.playbackRate = speed;
  }, [speed]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioSrc || !shouldAutoPlay) return;

    audio.volume = volume / 100;
    audio.playbackRate = speed;

    audio
      .play()
      .then(() => {
        setAudioError(false);
        setMode("Playing");
      })
      .catch(() => {
        setShouldAutoPlay(false);
        setMode("Audio Blocked");
      });
  }, [audioSrc, shouldAutoPlay, speed, volume]);

  async function handlePlay() {
    const audio = audioRef.current;

    if (!audio || !audioSrc) {
      setAudioError(true);
      setMode("Missing Audio");
      return;
    }

    audio.volume = volume / 100;
    audio.playbackRate = speed;

    try {
      await audio.play();
      setAudioError(false);
      setShouldAutoPlay(false);
      setMode("Playing");
    } catch {
      setShouldAutoPlay(false);
      setMode("Audio Blocked");
    }
  }

  function handlePause() {
    audioRef.current?.pause();
    setShouldAutoPlay(false);
    setMode("Paused");
  }

  function handleStop() {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;

    setShouldAutoPlay(false);
    setCurrentTime(0);
    setMode("Stopped");
  }

  function handlePrevious() {
    if (!hasPrevious) {
      handleStop();
      return;
    }

    setCurrentTime(0);
    setDuration(0);
    setAudioError(false);
    setShouldAutoPlay(true);
    setMode("Previous Section");
    setSectionIndex((current) => current - 1);
  }

  function handleNext() {
    if (!hasNext) {
      setShouldAutoPlay(false);
      setMode("Complete");
      return;
    }

    setCurrentTime(0);
    setDuration(0);
    setAudioError(false);
    setShouldAutoPlay(true);
    setMode("Next Section");
    setSectionIndex((current) => current + 1);
  }

  function handleSectionSelect(index: number) {
    if (index === sectionIndex) return;

    setCurrentTime(0);
    setDuration(0);
    setAudioError(false);
    setShouldAutoPlay(true);
    setMode("Section Selected");
    setSectionIndex(index);
  }

  function handleVolumeChange(value: number) {
    setVolume(value);
  }

  function handleSpeedChange(value: number) {
    setSpeed(value);
  }

  function handleSeek(value: number) {
    const audio = audioRef.current;

    setCurrentTime(value);

    if (audio) {
      audio.currentTime = value;
    }
  }

  return (
    <PortalShell
      eyebrow="RKS3 Audiobook Archive"
      title={book.title}
      accent="rgba(45,212,191,0.78)"
      description="A living knowledge chamber inside the RKS3 ecosystem."
    >
      {audioSrc ? (
        <audio
          key={audioSrc}
          ref={audioRef}
          src={audioSrc}
          preload="metadata"
          onCanPlay={() => {
            setAudioError(false);

            const audio = audioRef.current;

            setMode((currentMode) => {
              if (audio && !audio.paused) {
                return "Playing";
              }

              if (
                currentMode === "Paused" ||
                currentMode === "Stopped" ||
                currentMode === "Complete"
              ) {
                return currentMode;
              }

              return "Audio Ready";
            });
          }}
          onLoadedMetadata={() => {
            setDuration(audioRef.current?.duration ?? 0);
          }}
          onTimeUpdate={() => {
            setCurrentTime(audioRef.current?.currentTime ?? 0);
          }}
          onEnded={handleNext}
          onError={() => {
            setShouldAutoPlay(false);
            setAudioError(true);
            setMode("Audio Error");
          }}
        />
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.3fr]">
        <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-6">
          <p className="text-[10px] uppercase tracking-[0.32em] text-white/35">
            Archive Card
          </p>

          <div className="mt-6 aspect-[4/5] rounded-[1.5rem] border border-white/10 bg-black/35 p-5">
            <div className="flex h-full flex-col justify-between rounded-[1.2rem] border border-teal-200/15 bg-[radial-gradient(circle_at_top,rgba(45,212,191,0.16),transparent_55%)] p-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-teal-100/45">
                  {book.category}
                </p>

                <h2 className="mt-5 text-3xl font-light leading-tight tracking-[0.04em] text-white/92">
                  {book.title}
                </h2>
              </div>

              <p className="text-[10px] uppercase tracking-[0.28em] text-white/32">
                RKS3 AUDIOBOOK PORTAL
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3 text-sm text-white/52">
            <p>Narrator • {book.narrator}</p>
            <p>Runtime • {book.runtime}</p>
            <p>Status • {book.status}</p>
            <p>
              Section • {sectionIndex + 1} / {sections.length}
            </p>
            {book.frequency ? <p>Frequency • {book.frequency}</p> : null}
          </div>

          {book.relatedBookId ? (
            <div className="mt-6">
              <LivingBookNav
                bookId={book.relatedBookId}
                audiobookId={book.id}
                activeMode="listen"
              />
            </div>
          ) : null}
        </section>

        <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-6">
          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-full border border-teal-200/15 bg-teal-200/[0.05] px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-teal-100/60">
              Knowledge Chamber
            </div>

            <div className="rounded-full border border-white/10 px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-white/35">
              Section Audio Wire
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-light tracking-[0.05em] text-white/92">
              Audiobook Control Deck
            </h3>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/52">
              Current section: {sections[sectionIndex]}
            </p>
          </div>

          <div className="mt-8 rounded-[1.5rem] border border-teal-200/15 bg-black/30 p-5">
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handlePlay}
                className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-[10px] uppercase tracking-[0.24em] text-white/60 hover:border-teal-200/40 hover:text-teal-100"
              >
                Play
              </button>

              <button
                type="button"
                onClick={handlePause}
                className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-[10px] uppercase tracking-[0.24em] text-white/60 hover:border-teal-200/40 hover:text-teal-100"
              >
                Pause
              </button>

              <button
                type="button"
                onClick={handleStop}
                className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-[10px] uppercase tracking-[0.24em] text-white/60 hover:border-teal-200/40 hover:text-teal-100"
              >
                Stop
              </button>

              <button
                type="button"
                onClick={handlePrevious}
                className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-[10px] uppercase tracking-[0.24em] text-white/60 hover:border-teal-200/40 hover:text-teal-100"
              >
                Previous
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-[10px] uppercase tracking-[0.24em] text-white/60 hover:border-teal-200/40 hover:text-teal-100"
              >
                Next
              </button>
            </div>

            <div className="mt-5 rounded-[1rem] border border-white/10 bg-white/[0.03] px-4 py-3">
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/30">
                Current Status
              </p>

              <p className="mt-2 break-all text-sm text-white/55">
                {mode} • {audioSrc || "No audio path assigned"}
              </p>

              {audioError ? (
                <p className="mt-3 break-all text-xs leading-6 text-amber-100/70">
                  Audio could not load. Test this path directly in the browser:{" "}
                  {audioSrc}
                </p>
              ) : null}
            </div>

            <div className="mt-5 rounded-[1rem] border border-white/10 bg-white/[0.03] px-4 py-4">
              <div className="flex items-center justify-between">
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/30">
                  Progress
                </p>

                <p className="text-sm text-teal-100/70">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </p>
              </div>

              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={Math.min(currentTime, duration || 0)}
                onChange={(event) => handleSeek(Number(event.target.value))}
                className="mt-4 w-full accent-teal-200"
              />
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1rem] border border-white/10 bg-white/[0.03] px-4 py-4">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/30">
                    Volume
                  </p>

                  <p className="text-sm text-teal-100/70">{volume}%</p>
                </div>

                <input
                  type="range"
                  min={0}
                  max={100}
                  value={volume}
                  onChange={(event) =>
                    handleVolumeChange(Number(event.target.value))
                  }
                  className="mt-4 w-full accent-teal-200"
                />
              </div>

              <div className="rounded-[1rem] border border-white/10 bg-white/[0.03] px-4 py-4">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/30">
                    Speed
                  </p>

                  <p className="text-sm text-teal-100/70">{speed}x</p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {[0.75, 1, 1.25, 1.5].map((speedOption) => (
                    <button
                      key={speedOption}
                      type="button"
                      onClick={() => handleSpeedChange(speedOption)}
                      className={`rounded-full border px-3 py-2 text-[10px] uppercase tracking-[0.18em] transition ${
                        speed === speedOption
                          ? "border-teal-200/40 bg-teal-200/[0.14] text-teal-100"
                          : "border-white/10 bg-white/[0.04] text-white/45 hover:border-teal-200/30 hover:text-teal-100/80"
                      }`}
                    >
                      {speedOption}x
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-black/25 p-5">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">
              Archive Sections
            </p>

            <div className="mt-5 grid gap-3">
              {sections.map((section, index) => (
                <button
                  key={`${book.id}-${index}-${section}`}
                  type="button"
                  onClick={() => handleSectionSelect(index)}
                  className={`rounded-[1rem] border px-4 py-3 text-left text-sm transition ${
                    sectionIndex === index
                      ? "border-teal-200/30 bg-teal-200/[0.10] text-teal-100/80"
                      : "border-white/10 bg-white/[0.03] text-white/58 hover:border-white/20"
                  }`}
                >
                  {index + 1}. {section}
                </button>
              ))}
            </div>
          </div>

          {book.id === "the-rks3-initiation" ? (
            <div className="mt-10 flex justify-center">
              <Link
                href="/portal/ride"
                className="inline-flex items-center justify-center rounded-full border border-teal-200/30 bg-teal-200/[0.10] px-7 py-4 text-[10px] uppercase tracking-[0.32em] text-teal-100/80 transition hover:border-teal-200/50 hover:bg-teal-200/[0.16]"
              >
                Complete Initiation
              </Link>
            </div>
          ) : null}

          <Link
            href="/portal/audiobooks"
            className="mt-8 inline-flex rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-[10px] uppercase tracking-[0.28em] text-white/45 transition hover:border-white/25 hover:text-white/75"
          >
            Return To Audiobooks
          </Link>
        </section>
      </div>
    </PortalShell>
  );
}