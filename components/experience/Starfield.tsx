export default function Starfield() {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover z-0"
    >
      <source src="/videos/starfield.mp4" type="video/mp4" />
    </video>
  );
}
