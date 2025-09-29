export default function CosmicBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <video
        src="/videos/cockpit/cockpit_loop.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="h-full w-full object-cover opacity-80"
      />
      <div className="absolute inset-0 bg-black/50"></div>
    </div>
  );
}
