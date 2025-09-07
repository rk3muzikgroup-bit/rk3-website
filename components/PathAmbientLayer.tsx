// src/components/PathAmbientLayer.tsx
// Server-safe wrapper (no hooks). Adds a faint grid/ambient overlay.
type Props = { children?: React.ReactNode };

export default function PathAmbientLayer({ children }: Props) {
  return (
    <div className="relative">
      {/* subtle ambient layer */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,rgba(0,0,0,0.0)_55%)]" />
      {children}
    </div>
  );
}
