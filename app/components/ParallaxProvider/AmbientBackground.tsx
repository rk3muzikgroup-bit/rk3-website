"use client";

export default function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* 🎞 FILM GRAIN OVERLAY */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "url('/noise.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "300px 300px",
        }}
      />

      {/* 🌑 BASE ATMOSPHERIC FADE */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />

      {/* ✨ PRIMARY AMBIENT GLOW — LEFT */}
      <div
        className="
          absolute -top-40 -left-40
          h-[700px] w-[700px]
          rounded-full
          bg-white/10
          blur-[180px]
          animate-drift-one
        "
      />

      {/* ✨ PRIMARY AMBIENT GLOW — RIGHT */}
      <div
        className="
          absolute top-1/3 -right-40
          h-[600px] w-[600px]
          rounded-full
          bg-emerald-500/10
          blur-[200px]
          animate-drift-two
        "
      />

      {/* 🌌 SUBTLE DEPTH GLOW */}
      <div
        className="
          absolute bottom-[-20%] left-1/3
          h-[500px] w-[500px]
          rounded-full
          bg-indigo-500/10
          blur-[220px]
        "
      />
    </div>
  );
}
