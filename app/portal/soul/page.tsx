"use client";

export default function SoulPortal() {
  return (
    <main className="relative min-h-screen bg-black text-white flex items-center justify-center overflow-hidden">
      <video
        src="/videos/backgrounds/starfield_soul.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-10 text-center">
        <h1 className="text-5xl font-extrabold text-pink-400 drop-shadow-lg">
          💖 Soul Portal
        </h1>
      </div>
    </main>
  );
}
