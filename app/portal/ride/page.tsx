"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const RIDE_VIDEO_SRC = "https://cudecfkuaszevzhyashj.supabase.co/storage/v1/object/public/rks3-public-media/ride/rks3-spaceship-ride-111.mp4";

export default function RidePage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [hasStarted, setHasStarted] = useState(false);
  const [isEnding, setIsEnding] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [status, setStatus] = useState("Ride ready.");

  async function beginRide() {
    const video = videoRef.current;

    if (!video) {
      setStatus("Video element not found.");
      setVideoError(true);
      return;
    }

    try {
      setHasStarted(true);
      setIsEnding(false);
      setVideoError(false);
      setStatus("Loading ride...");

      video.pause();
      video.currentTime = 0;
      video.removeAttribute("muted");
      video.muted = false;
      video.volume = 1;
      video.load();

      await video.play();

      setStatus("Ride playing.");
    } catch (error) {
      console.error("Ride play error:", error);
      setVideoError(true);
      setStatus("Play failed. Press the video controls play button to test.");
      setHasStarted(true);
    }
  }

  function enterLivingRoom() {
    setIsEnding(true);
    setStatus("Living Room access granted.");

    window.setTimeout(() => {
      router.push("/access-granted");
    }, 900);
  }

  function skipRide() {
    const video = videoRef.current;

    if (video) {
      video.pause();
      video.currentTime = 0;
    }

    router.push("/access-granted");
  }

  useEffect(() => {
    return () => {
      const video = videoRef.current;

      if (video) {
        video.pause();
      }
    };
  }, []);

  return (
    <main className="rk3-clean relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.16),transparent_30%),radial-gradient(circle_at_center,rgba(56,189,248,0.14),transparent_45%),radial-gradient(circle_at_bottom,rgba(168,85,247,0.12),transparent_38%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:44px_44px]" />
      </div>

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center px-5 py-8 text-center sm:px-8 lg:px-10">
        <p className="text-[10px] uppercase tracking-[0.46em] text-amber-100/55">
          RKS3 Transport Sequence
        </p>

        <h1 className="mt-5 text-4xl font-light tracking-[0.1em] text-white sm:text-6xl">
          SPACESHIP RIDE
        </h1>

        <div className="mt-9 w-full overflow-hidden rounded-[2rem] border border-cyan-200/15 bg-white/[0.035] shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
          <div className="relative aspect-video w-full bg-black">
            <video
              ref={videoRef}
              src={RIDE_VIDEO_SRC}
              className={`h-full w-full object-cover transition duration-700 ${
                isEnding ? "scale-105 opacity-0" : "scale-100 opacity-100"
              }`}
              controls
              playsInline
              preload="auto"
              onLoadedData={() => {
                setVideoError(false);
                setStatus("Video loaded. Ready to begin.");
              }}
              onVolumeChange={() => {
                const video = videoRef.current;
                if (!video) return;

                if (!video.muted && video.volume > 0) {
                  setStatus("Video loaded with audio enabled.");
                }
              }}
              onPlay={() => setStatus("Ride playing.")}
              onPause={() => setStatus("Ride paused.")}
              onEnded={enterLivingRoom}
              onError={() => {
                setVideoError(true);
                setStatus(
                  "Video did not load. Check the file path/name or MP4 export codec."
                );
              }}
            />

            {!hasStarted && (
              <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/80 px-6 text-center backdrop-blur-sm">
                <p className="text-[10px] uppercase tracking-[0.34em] text-cyan-100/60">
                  Orientation Complete
                </p>

                <h2 className="mt-4 text-2xl font-light tracking-[0.08em] text-white sm:text-4xl">
                  Ride To The Living Room
                </h2>

                <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/55">
                  Begin the RKS3 transport sequence. Audio will start from your
                  click.
                </p>

                <button
                  type="button"
                  onClick={beginRide}
                  className="mt-7 rounded-full border border-cyan-200/25 bg-cyan-200/[0.08] px-7 py-3 text-[10px] uppercase tracking-[0.24em] text-cyan-100/75 transition hover:border-cyan-200/45 hover:text-cyan-100"
                >
                  Begin Ride →
                </button>
              </div>
            )}

            {isEnding && (
              <div className="absolute inset-0 z-40 flex items-center justify-center bg-black">
                <p className="text-[10px] uppercase tracking-[0.34em] text-amber-100/60">
                  Living Room Access Granted
                </p>
              </div>
            )}
          </div>
        </div>

        <p className="mt-4 text-sm text-amber-100/70">{status}</p>

        {videoError && (
          <p className="mt-4 max-w-2xl text-sm leading-6 text-amber-100/70">
            The ride video did not load or play. Check that the file exists at{" "}
            <span className="text-white/80">
              public/videos/ride/rks3-spaceship-ride-111.mp4
            </span>
            .
          </p>
        )}

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={skipRide}
            className="rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-[10px] uppercase tracking-[0.22em] text-white/45 transition hover:border-white/25 hover:text-white/75"
          >
            Skip To Living Room
          </button>

          <Link
            href="/portal/initiation"
            prefetch={false}
            className="rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-[10px] uppercase tracking-[0.22em] text-white/45 transition hover:border-white/25 hover:text-white/75"
          >
            Return To Initiation
          </Link>
        </div>

        <p className="mt-8 text-[10px] uppercase tracking-[0.34em] text-white/25">
          RKS3.COM • A World Within Worlds
        </p>
      </section>
    </main>
  );
}