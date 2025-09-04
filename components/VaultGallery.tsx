import Image from "next/image";
import VaultDoor from "./VaultDoor";

export default function VaultGallery() {
  return (
    <div className="min-h-screen bg-black text-white grid grid-rows-[auto_1fr_auto]">
      {/* North / Entry Water */}
      <div className="flex items-center justify-center py-6 border-b border-white/10">
        <div className="relative w-[720px] h-[80px] rounded-2xl bg-black/60 ring-1 ring-white/10 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-70"
          >
            <source src="/assets/vault/water/entry-loop.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Gallery Body */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10">
        {/* West – Street */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold tracking-wide">Street Portal</h3>
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden ring-1 ring-white/10">
            <Image
              src="/assets/vault/portals/street.jpg"
              alt="Street"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Center – Soul */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold tracking-wide text-center">
            Soul Portal
          </h3>
          <div className="relative aspect-square rounded-full overflow-hidden ring-1 ring-white/10">
            <Image
              src="/assets/vault/portals/soul.jpg"
              alt="Soul"
              fill
              className="object-cover"
            />
          </div>

          {/* Center Stone */}
          <div className="mx-auto w-40 h-40 rounded-full bg-white/5 ring-1 ring-white/15" />
        </div>

        {/* East – Spirit */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold tracking-wide text-right">
            Spirit Portal
          </h3>
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden ring-1 ring-white/10">
            <Image
              src="/assets/vault/portals/spirit.jpg"
              alt="Spirit"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* South / Torch + Final Door */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-10 p-10 border-t border-white/10">

        {/* Torch */}
        <div className="flex justify-end">
          <div className="relative w-32 h-32 rounded-full overflow-hidden ring-2 ring-orange-400/40 shadow-lg shadow-orange-500/20">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source
                src="/assets/vault/door/torch-loop.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>

        {/* Vault Door */}
        <div className="justify-self-center">
          <VaultDoor />
        </div>

        {/* Crystals */}
        <div className="flex justify-start gap-6">
          <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center ring-1 ring-pink-300/30 shadow-inner">
            <Image
              src="/assets/vault/crystals/rose-quartz.png"
              alt="SW Rose Quartz"
              width={64}
              height={64}
            />
          </div>
          <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center ring-1 ring-purple-300/30 shadow-inner">
            <Image
              src="/assets/vault/crystals/amethyst.png"
              alt="NE Amethyst"
              width={64}
              height={64}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
