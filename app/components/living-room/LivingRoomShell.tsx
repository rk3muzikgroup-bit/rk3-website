export default function LivingRoomShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-black text-white">
      <div className="mx-auto max-w-[820px] px-6 py-10 space-y-14">
        {children}
      </div>
    </div>
  );
}
