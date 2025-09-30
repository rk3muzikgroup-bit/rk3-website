"use client";
export default function WatermarkOverlay() {
  return (
    <div
      aria-hidden
      className="absolute bottom-6 right-6 text-4xl font-extrabold tracking-widest select-none
                 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-emerald-400 to-yellow-400
                 drop-shadow-[0_0_12px_rgba(255,255,255,0.6)] animate-pulse"
    >
      RK3
    </div>
  );
}
