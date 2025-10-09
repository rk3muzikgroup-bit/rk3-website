// app/backgrounds/IndigoNebula.tsx
export default function IndigoNebula() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div
        className="w-full h-full"
        style={{
          background:
            "radial-gradient(circle at 10% 20%, rgba(99,102,241,0.25), transparent 8%), radial-gradient(circle at 80% 80%, rgba(59,130,246,0.12), transparent 25%)",
        }}
      />
    </div>
  );
}
