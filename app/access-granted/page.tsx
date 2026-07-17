"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function AccessGrantedPage() {
  useEffect(() => {
    document.cookie =
      "rks3InitiationComplete=true; path=/; max-age=31536000";

    localStorage.setItem("rks3InitiationComplete", "true");
  }, []);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.18),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(168,85,247,0.12),transparent_55%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-200/50 to-transparent" />
      </div>

      <section className="relative z-10 max-w-3xl rounded-[2.5rem] border border-teal-200/20 bg-white/[0.035] p-8 text-center backdrop-blur-xl md:p-12">
        <p className="text-[10px] uppercase tracking-[0.36em] text-teal-100/60">
          Initiation Complete
        </p>

        <h1 className="mt-8 text-4xl font-thin tracking-[0.1em] md:text-6xl">
          Living Room Access Granted
        </h1>

        <p className="mt-8 text-sm leading-8 text-white/58 md:text-base">
          Your orientation is complete. You may now enter the Living Room and
          begin exploring the deeper RKS3 portal worlds with awareness,
          intention, and presence.
        </p>

        <Link
          href="/portal/living-room"
          className="mt-10 inline-flex rounded-full border border-teal-200/30 bg-teal-200/[0.10] px-7 py-4 text-[10px] uppercase tracking-[0.32em] text-teal-100/80 transition hover:border-teal-200/50"
        >
          Enter Living Room
        </Link>
      </section>
    </main>
  );
}