// app/backgrounds/VoidHorizon.tsx
export default function VoidHorizon() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div
        className="w-full h-full"
        style={{
          background: "linear-gradient(180deg, rgba(15,23,42,0.0), rgba(2,6,23,0.12))",
        }}
      />
    </div>
  );
}
