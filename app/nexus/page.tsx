"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const NEXUS_WELCOME_SRC = "/audio/nexus/nexus-welcome.mp3";
const NEXUS_WELCOME_FALLBACK_SECONDS = 71;

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function RKS3NexusPage() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [welcomeMode, setWelcomeMode] = useState("Standby");
  const [welcomeComplete, setWelcomeComplete] = useState(false);
  const [welcomeSkipped, setWelcomeSkipped] = useState(false);
  const [isReturningUser, setIsReturningUser] = useState(false);
  const [welcomeDuration, setWelcomeDuration] = useState(0);
  const [welcomeTime, setWelcomeTime] = useState(0);

  const canProceed = welcomeComplete || welcomeSkipped;
  const progressDuration =
  welcomeDuration > 0 ? welcomeDuration : NEXUS_WELCOME_FALLBACK_SECONDS;

const progressValue = Math.min(welcomeTime, progressDuration);
  useEffect(() => {
    try {
      const stored = localStorage.getItem("rks3NexusWelcomeComplete");

      if (stored === "true") {
        setWelcomeComplete(true);
        setIsReturningUser(true);
        setWelcomeMode("Returning");
      }
    } catch {
      // Keep page stable if localStorage is blocked.
    }
  }, []);

  useEffect(() => {
  if (welcomeMode !== "Playing") return;

  const timer = window.setInterval(() => {
    const audio = audioRef.current;

    if (audio) {
      setWelcomeTime(audio.currentTime);

      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        setWelcomeDuration(audio.duration);
      }
    }
  }, 250);

  return () => window.clearInterval(timer);
}, [welcomeMode]);

  function handleLoadedWelcome() {
  const audio = audioRef.current;
  const nextDuration = audio?.duration ?? 0;

  if (Number.isFinite(nextDuration) && nextDuration > 0) {
    setWelcomeDuration(nextDuration);
  } else {
    setWelcomeDuration(NEXUS_WELCOME_FALLBACK_SECONDS);
  }

  setWelcomeTime(audio?.currentTime ?? 0);
}

  async function handlePlayWelcome() {
    const audio = audioRef.current;

    if (!audio) {
      setWelcomeMode("Missing Audio");
      return;
    }

    if (audio.ended) {
      audio.currentTime = 0;
      setWelcomeTime(0);
    }

    try {
      await audio.play();
      setWelcomeMode("Playing");
    } catch {
      setWelcomeMode("Audio Blocked");
    }
  }

  function handlePauseWelcome() {
    audioRef.current?.pause();
    setWelcomeMode("Paused");
  }

  async function handleReplayWelcome() {
    const audio = audioRef.current;

    if (!audio) {
      setWelcomeMode("Missing Audio");
      return;
    }

    audio.currentTime = 0;
    setWelcomeTime(0);
    setWelcomeSkipped(false);

    try {
      await audio.play();
      setWelcomeMode("Playing");
    } catch {
      setWelcomeMode("Audio Blocked");
    }
  }

  function handleSkipWelcome() {
    const audio = audioRef.current;

    if (audio) {
      audio.pause();
    }

    setWelcomeSkipped(true);
    setWelcomeMode("Skipped");

    try {
      localStorage.setItem("rks3NexusWelcomeComplete", "true");
    } catch {
      // Keep page stable if localStorage is blocked.
    }
  }

  function handleWelcomeComplete() {
    setWelcomeComplete(true);
    setWelcomeSkipped(false);
    setIsReturningUser(true);
    setWelcomeMode("Complete");

    try {
      localStorage.setItem("rks3NexusWelcomeComplete", "true");
    } catch {
      // Keep page stable if localStorage is blocked.
    }
  }

  return (
    <main className="rk3-clean relative min-h-screen overflow-x-hidden bg-black text-white">
      <audio
        ref={audioRef}
        src={NEXUS_WELCOME_SRC}
        preload="metadata"
        onLoadedMetadata={handleLoadedWelcome}
        onDurationChange={handleLoadedWelcome}
        onTimeUpdate={() => setWelcomeTime(audioRef.current?.currentTime ?? 0)}
        onEnded={handleWelcomeComplete}
        onError={() => setWelcomeMode("Audio Error")}
      />

      {/* ATMOSPHERE */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.10),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.08),transparent_34%)]" />
        <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="absolute left-1/2 top-1/2 h-[780px] w-[780px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/[0.035] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.35)_52%,rgba(0,0,0,0.9)_100%)]" />
      </div>

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-8 sm:px-8 lg:px-10">
        {/* TOP BAR */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-5 border-b border-white/10 pb-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.46em] text-white/45">
              RKS3.COM
            </p>

            <h1 className="mt-3 text-4xl font-light tracking-[0.1em] text-white sm:text-6xl">
              NEXUS RKS3
            </h1>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="rounded-full border border-cyan-200/15 bg-cyan-200/[0.05] px-4 py-2 text-[10px] uppercase tracking-[0.34em] text-cyan-100/55">
              Truth Chamber
            </div>

            <div className="rounded-full border border-amber-200/15 bg-amber-200/[0.05] px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-amber-100/50">
              Ceremony First
            </div>
          </div>
        </div>

        {/* HERO */}
        <section className="mb-8 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl md:p-9">
          <div className="flex flex-wrap gap-3">
            <span className="rounded-full border border-cyan-200/20 bg-cyan-200/[0.08] px-4 py-1.5 text-[10px] uppercase tracking-[0.28em] text-cyan-100/65">
              First Entry
            </span>

            <span className="rounded-full border border-emerald-200/20 bg-emerald-200/[0.08] px-4 py-1.5 text-[10px] uppercase tracking-[0.28em] text-emerald-100/65">
              Awareness World
            </span>

            <span className="rounded-full border border-amber-200/20 bg-amber-200/[0.08] px-4 py-1.5 text-[10px] uppercase tracking-[0.28em] text-amber-100/65">
              A World Within Worlds
            </span>
          </div>

          <h2 className="mt-7 max-w-5xl text-3xl font-thin leading-tight tracking-[0.04em] text-white sm:text-5xl">
            Before you enter the world, understand the world.
          </h2>

          <p className="mt-5 max-w-4xl text-sm leading-8 text-white/60 md:text-base">
            Nexus is the first experience for new users. This chamber explains
            what RKS3.COM is, how to use it, what to expect, what not to expect,
            and how to enter with awareness.
          </p>

          <div className="mt-7 grid gap-4 md:grid-cols-3">
            <div className="rounded-[1.25rem] border border-cyan-200/15 bg-cyan-200/[0.045] p-5">
              <p className="text-[10px] uppercase tracking-[0.28em] text-cyan-100/45">
                This Is
              </p>

              <p className="mt-3 text-sm leading-7 text-white/60">
                A living awareness system for study, sound, reflection,
                creativity, and inner alignment.
              </p>
            </div>

            <div className="rounded-[1.25rem] border border-emerald-200/15 bg-emerald-200/[0.045] p-5">
              <p className="text-[10px] uppercase tracking-[0.28em] text-emerald-100/45">
                This Does
              </p>

              <p className="mt-3 text-sm leading-7 text-white/60">
                Guides users through orientation, initiation, frequency,
                reading, listening, and future awareness rooms.
              </p>
            </div>

            <div className="rounded-[1.25rem] border border-amber-200/15 bg-amber-200/[0.045] p-5">
              <p className="text-[10px] uppercase tracking-[0.28em] text-amber-100/45">
                This Is Not
              </p>

              <p className="mt-3 text-sm leading-7 text-white/60">
                A replacement for professional medical, legal, financial, or
                psychological guidance.
              </p>
            </div>
          </div>
        </section>

        {/* NEXUS WELCOME */}
        <section className="relative mb-8 overflow-hidden rounded-[2rem] border border-cyan-200/10 bg-cyan-200/[0.035] p-6 backdrop-blur-xl md:p-8">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-200/45 to-transparent" />

          <div className="grid gap-7 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full border border-cyan-200/20 bg-cyan-200/[0.08] px-4 py-1.5 text-[10px] uppercase tracking-[0.28em] text-cyan-100/65">
                  Nexus Welcome
                </span>

                <span className="rounded-full border border-purple-200/20 bg-purple-200/[0.08] px-4 py-1.5 text-[10px] uppercase tracking-[0.28em] text-purple-100/65">
                  1:11 Target
                </span>

                <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[10px] uppercase tracking-[0.28em] text-white/40">
                  {welcomeMode}
                </span>
              </div>

              <h2 className="mt-5 max-w-4xl text-3xl font-thin leading-tight tracking-[0.04em] text-white md:text-5xl">
                First, hear what this world is.
              </h2>

              <p className="mt-5 max-w-4xl text-sm leading-8 text-white/60 md:text-base">
                For first-time users, the Nexus Welcome is part of the entry
                experience. It is not an audiobook. It is the opening signal:
                what RKS3.COM is, how to move through it, and why awareness is
                the path.
              </p>

              <p className="mt-5 max-w-4xl text-sm leading-8 text-white/60 md:text-base">
                Returning users can skip the welcome, replay it, ride to the
                vault, or continue through the ceremony.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-5">
              <p className="text-[10px] uppercase tracking-[0.26em] text-white/32">
                Audio Control
              </p>

              <div className="mt-4 rounded-[1rem] border border-white/10 bg-white/[0.03] px-4 py-3">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-white/55">
                    {formatTime(welcomeTime)} / {formatTime(progressDuration)}
                  </span>

                  <span className="text-[10px] uppercase tracking-[0.24em] text-cyan-100/55">
                    Nexus
                  </span>
                </div>

                <input
  type="range"
  min={0}
  max={progressDuration}
  step={0.1}
  value={progressValue}
                  onChange={(event) => {
                    const value = Number(event.target.value);
                    const audio = audioRef.current;

                    setWelcomeTime(value);

                    if (audio) {
                      audio.currentTime = value;
                    }
                  }}
                  className="mt-4 w-full accent-cyan-200"
                />
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handlePlayWelcome}
                  className="rounded-full border border-cyan-200/30 bg-cyan-200/[0.10] px-5 py-3 text-[10px] uppercase tracking-[0.22em] text-cyan-100/75 transition hover:border-cyan-200/50 hover:text-cyan-100"
                >
                  Play Welcome
                </button>

                <button
                  type="button"
                  onClick={handlePauseWelcome}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-[10px] uppercase tracking-[0.22em] text-white/55 transition hover:border-white/25 hover:text-white/80"
                >
                  Pause
                </button>

                <button
                  type="button"
                  onClick={handleReplayWelcome}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-[10px] uppercase tracking-[0.22em] text-white/55 transition hover:border-white/25 hover:text-white/80"
                >
                  Replay
                </button>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {isReturningUser ? (
                  <button
                    type="button"
                    onClick={handleSkipWelcome}
                    className="rounded-full border border-amber-200/20 bg-amber-200/[0.06] px-5 py-3 text-[10px] uppercase tracking-[0.22em] text-amber-100/65 transition hover:border-amber-200/40 hover:text-amber-100"
                  >
                    Skip Welcome
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="rounded-full border border-white/10 bg-white/[0.025] px-5 py-3 text-[10px] uppercase tracking-[0.22em] text-white/25"
                  >
                    First Visit • Listen First
                  </button>
                )}

                {canProceed ? (
                  <div className="inline-flex justify-center rounded-full border border-cyan-200/20 bg-cyan-200/[0.06] px-5 py-3 text-[10px] uppercase tracking-[0.22em] text-cyan-100/60">
                    Continue Below
                  </div>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="rounded-full border border-white/10 bg-white/[0.025] px-5 py-3 text-[10px] uppercase tracking-[0.22em] text-white/25"
                  >
                    Welcome Required
                  </button>
                )}
              </div>

              <div className="mt-5 rounded-[1rem] border border-white/10 bg-white/[0.03] p-4">
                <p className="text-[10px] uppercase tracking-[0.24em] text-white/30">
                  Entry Status
                </p>

                <p className="mt-2 text-sm leading-6 text-white/58">
                  {canProceed
                    ? "Welcome complete. Continue through Begin Here to complete the ceremony."
                    : "First-time users should hear the Nexus Welcome before moving forward."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* BEGIN HERE */}
        <section className="mb-8 rounded-[2rem] border border-white/10 bg-white/[0.025] p-6 backdrop-blur-xl md:p-7">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/32">
                Begin Here
              </p>

              <h2 className="mt-3 text-2xl font-thin tracking-[0.04em] text-white md:text-3xl">
                Orientation, Initiation, then the ride.
              </h2>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-white/52">
                Nexus explains the world. Orientation prepares the user.
                Initiation opens the threshold. The ride carries them into the
                Living Room / Vault.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {canProceed ? (
                <>
                  <Link
  href="/portal/living-room"
  prefetch={false}
  className="inline-flex rounded-full border border-cyan-200/25 bg-cyan-200/[0.08] px-5 py-3 text-[10px] uppercase tracking-[0.22em] text-cyan-100/70 transition hover:border-cyan-200/45 hover:text-cyan-100"
>
  Begin Orientation →
</Link>

<Link
  href="/portal/living-room"
  prefetch={false}
  className="inline-flex rounded-full border border-purple-200/25 bg-purple-200/[0.08] px-5 py-3 text-[10px] uppercase tracking-[0.22em] text-purple-100/70 transition hover:border-purple-200/45 hover:text-purple-100"
>
  RKS3 Initiation →
</Link>

<Link
  href="/portal/living-room"
  prefetch={false}
  className="inline-flex rounded-full border border-amber-200/25 bg-amber-200/[0.08] px-5 py-3 text-[10px] uppercase tracking-[0.22em] text-amber-100/70 transition hover:border-amber-200/45 hover:text-amber-100"
>
  Ride To Vault →
</Link>
                </>
              ) : (
                <button
                  type="button"
                  disabled
                  className="rounded-full border border-white/10 bg-white/[0.025] px-5 py-3 text-[10px] uppercase tracking-[0.22em] text-white/25"
                >
                  Complete Welcome To Continue
                </button>
              )}
            </div>
          </div>
        </section>

        {/* TESTER FAMILY */}
        <section className="relative mb-8 overflow-hidden rounded-[2rem] border border-emerald-200/10 bg-emerald-200/[0.035] p-6 backdrop-blur-xl md:p-8">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-200/45 to-transparent" />

          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-5xl">
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full border border-emerald-200/20 bg-emerald-200/[0.08] px-4 py-1.5 text-[10px] uppercase tracking-[0.28em] text-emerald-100/65">
                  Founding QC Window
                </span>

                <span className="rounded-full border border-cyan-200/20 bg-cyan-200/[0.08] px-4 py-1.5 text-[10px] uppercase tracking-[0.28em] text-cyan-100/65">
                  Tester Family
                </span>

                <span className="rounded-full border border-amber-200/20 bg-amber-200/[0.08] px-4 py-1.5 text-[10px] uppercase tracking-[0.28em] text-amber-100/65">
                  Free For Life
                </span>
              </div>

              <h2 className="mt-5 max-w-4xl text-3xl font-thin leading-tight tracking-[0.04em] text-white md:text-5xl">
                Enter free. Help us build the world.
              </h2>

              <p className="mt-5 max-w-4xl text-sm leading-8 text-white/60 md:text-base">
                RKS3.COM is opening first to our Tester Family — the Eyes & Ears
                who help us strengthen the world before paid access begins. Move
                through the rooms. Test the audio. Explore the portals. Tell us
                what feels clear, what feels powerful, what feels heavy, and
                what needs work.
              </p>

              <p className="mt-5 max-w-4xl text-sm leading-8 text-white/60 md:text-base">
                Approved Tester Family profiles keep lifetime free RKS3 access
                as our thank-you for helping strengthen the world before paid
                access begins.
              </p>

              <p className="mt-5 text-xs leading-6 text-white/35">
                Lifetime access remains subject to RKS3 terms, fair-use,
                account standing, and platform safety.
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-3">
              <Link
                href="/join"
                prefetch={false}
                className="inline-flex rounded-full border border-emerald-200/25 bg-emerald-200/[0.09] px-5 py-3 text-[10px] uppercase tracking-[0.22em] text-emerald-100/70 transition hover:border-emerald-200/45 hover:text-emerald-100"
              >
                Join Free →
              </Link>

              {canProceed ? (
                <div className="inline-flex rounded-full border border-cyan-200/20 bg-cyan-200/[0.06] px-5 py-3 text-[10px] uppercase tracking-[0.22em] text-cyan-100/60">
                  Continue Through Begin Here
                </div>
              ) : (
                <button
                  type="button"
                  disabled
                  className="rounded-full border border-white/10 bg-white/[0.025] px-5 py-3 text-[10px] uppercase tracking-[0.22em] text-white/25"
                >
                  Complete Welcome
                </button>
              )}
            </div>
          </div>
        </section>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
          <p className="text-[10px] uppercase tracking-[0.34em] text-white/30">
            Street • Soul • Spirit
          </p>

          <p className="text-[10px] uppercase tracking-[0.28em] text-white/25">
            RKS3.COM • A World Within Worlds
          </p>
        </div>
      </section>
    </main>
  );
}