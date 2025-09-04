export default function Meteorite() {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover z-10 opacity-70 pointer-events-none"
    >
      <source src="/videos/meteorite.mp4" type="video/mp4" />
    </video>
  );
}
