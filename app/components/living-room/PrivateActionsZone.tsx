import Link from "next/link";

export default function PrivateActionsZone() {
  return (
    <section className="pt-10 flex flex-col gap-3 text-sm text-white/50">
      <Link href="/portal/frequencies" className="hover:text-white">
        Return to Frequency Vault
      </Link>
      <Link href="/portal/frequencies" className="hover:text-white">
        Continue Practice
      </Link>
      <span className="opacity-40">Step Away</span>
    </section>
  );
}
