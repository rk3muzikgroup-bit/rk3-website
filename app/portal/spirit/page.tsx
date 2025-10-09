"use client";

export default function SpiritPortal() {
  return (
    <main className="relative min-h-screen bg-black text-white flex items-center justify-center overflow-hidden">
      <video
        src="/videos/backgrounds/starfield_spirit.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-10 text-center">
        <h1 className="text-5xl font-extrabold text-green-400 drop-shadow-lg">
          ✨ Spirit Portal
        </h1>
      </div>
    </main>
  );
}
