"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Guardian Orbs (floating across screen)
function Orbs() {
  const [orbs, setOrbs] = useState<
    { id: number; x: number; y: number; size: number; color: string; speed: number }[]
  >([]);

  useEffect(() => {
    const colors = [
      "rgba(16,185,129,0.25)", // emerald
      "rgba(99,102,241,0.25)", // indigo
      "rgba(253,224,71,0.25)", // gold
      "rgba(255,255,255,0.2)", // white
    ];
    const newOrbs = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 80 + Math.random() * 120,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: 0.05 + Math.random() * 0.15, // drift speed
    }));
    setOrbs(newOrbs);

    // animate drift
    const interval = setInterval(() => {
      setOrbs((prev) =>
        prev.map((orb) => {
          let newY = orb.y + orb.speed;
          if (newY > 110) newY = -10; // wrap around
          let newX = orb.x + Math.sin(Date.now() / 5000 + orb.id) * 0.02;
          return { ...orb, y: newY, x: newX };
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb) => (
        <div
          key={orb.id}
          className="absolute rounded-full blur-3xl"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            background: orb.color,
          }}
        />
      ))}
    </div>
  );
}

// Ethers (tiny shimmering sparks)
function Ethers() {
  const [sparks, setSparks] = useState<{ id: number; x: number; y: number; delay: number }[]>([]);
  useEffect(() => {
    setSparks(
      Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 4,
      }))
    );
  }, []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {sparks.map((s) => (
        <div
          key={s.id}
          className="absolute w-1 h-1 rounded-full bg-emerald-300 animate-ping"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${2 + Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function TransmissionPage() {
  const router = useRouter();
  const [agreeing, setAgreeing] = useState(false);

  useEffect(() => {
    const ok = localStorage.getItem("rk3_consent_v1");
    if (ok === "yes") router.replace("/vault");
  }, [router]);

  const handleAgree = () => {
    setAgreeing(true);
    localStorage.setItem("rk3_consent_v1", "yes");
    localStorage.setItem("rk3_consent_timestamp", new Date().toISOString());
    localStorage.setItem("rk3_onboarding_phase", "entered_vault");
    router.replace("/vault");
  };

  const handleDecline = () => router.replace("/");

  return (
    <main className="min-h-screen relative flex items-center justify-center px-6 bg-gradient-to-br from-black via-emerald-950 to-black">
      {/* background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(16,185,129,0.1),transparent_80%)]" />
      <Orbs />
      <Ethers />

      {/* content */}
      <section className="relative z-10 w-full max-w-3xl rounded-2xl border border-emerald-400/30 bg-black/70 p-8 shadow-[0_0_40px_rgba(16,185,129,0.5)]">
        <header className="mb-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide text-emerald-300">
            A Letter to the Global Citizens of Earth
          </h1>
        </header>

        <div className="space-y-4 text-sm md:text-base leading-relaxed text-gray-200">
          <p>
            This portal has been created with{" "}
            <span className="text-emerald-300 font-semibold">unconditional love</span> and
            deep respect for all people, cultures, faiths, and worldviews. It is{" "}
            <span className="text-emerald-300 font-semibold">
              not intended to replace or challenge your personal beliefs
            </span>.
          </p>

          <p>
            <span className="text-emerald-300 font-semibold">RK3 Music Group</span> is an
            independent <strong>music label</strong> and{" "}
            <strong>digital media company</strong>. We create original works across sound,
            story, and interactive art, using human creativity, advanced technology, and{" "}
            <span className="text-emerald-300 font-semibold">AI as a creative tool</span> to
            expand what’s possible.
          </p>

          <p>
            Our mission is to inspire, heal, and entertain—blending{" "}
            <em>Street • Soul • Spirit</em> into a new kind of digital universe. We intend to
            be a positive force in this shared future timeline through music, visuals,
            meditation, reading, games, and other portals that exercise the heart and mind.
          </p>

          <p className="text-gray-300">
            All content is offered for{" "}
            <span className="text-emerald-300 font-semibold">
              creative, educational, and entertainment purposes
            </span>
            . Nothing here is presented as medical, legal, or professional advice. By
            entering, you acknowledge you remain responsible for your beliefs, choices, and
            interpretations.
          </p>

          <p className="text-emerald-300 font-medium">
            If you agree, click below to continue your journey.
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:justify-center">
          <button
            onClick={handleAgree}
            disabled={agreeing}
            className="inline-flex items-center justify-center rounded-lg bg-emerald-600 hover:bg-emerald-500 px-6 py-3 font-semibold shadow-lg shadow-emerald-500/30 transition disabled:opacity-70"
          >
            {agreeing ? "Entering…" : "Enter the Vault ✦ Agree & Continue"}
          </button>

          <button
            onClick={handleDecline}
            className="inline-flex items-center justify-center rounded-lg border border-emerald-400/40 px-6 py-3 font-semibold text-gray-200 hover:bg-emerald-900/40 transition"
          >
            Not Now
          </button>
        </div>

        <footer className="mt-6 text-center text-xs text-emerald-400/70">
          © {new Date().getFullYear()} RK3 Music Group — All Rights Reserved.
        </footer>
      </section>
    </main>
  );
}
