type CosmicBackgroundProps = {
  videoSrc: string;   // path to your background video
  overlayColor?: string; // Tailwind color w/ opacity (e.g. "bg-black/50")
  children: React.ReactNode; // page content
};

export default function CosmicBackground({
  videoSrc,
  overlayColor = "bg-black/50",
  children,
}: CosmicBackgroundProps) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>

      {/* Overlay */}
      <div className={`absolute inset-0 ${overlayColor}`} />

      {/* Page content */}
      <div className="z-10 text-center">{children}</div>
    </div>
  );
}
