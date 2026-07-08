"use client";

export default function PortalPlaceholder({
  title = "Healing Portal",
  subtitle = "Preparing the space…",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <div
      className="flex min-h-[60vh] flex-col items-center justify-center text-center"
      style={{ color: "rgba(255,255,255,0.85)" }}
    >
      {/* Soft breathing glyph */}
      <div
        className="mb-6 h-20 w-20 rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.35), rgba(255,255,255,0.05))",
          animation: "pulse 4s ease-in-out infinite",
        }}
      />

      <h1 className="text-2xl tracking-wide mb-2">{title}</h1>
      <p className="text-sm opacity-70">{subtitle}</p>

      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(0.95);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.05);
            opacity: 1;
          }
          100% {
            transform: scale(0.95);
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
}
