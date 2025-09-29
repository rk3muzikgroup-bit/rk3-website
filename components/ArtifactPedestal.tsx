import Image from "next/image";

interface ArtifactPedestalProps {
  title: string;
  image: string;
  description: string;
}

export default function ArtifactPedestal({ title, image, description }: ArtifactPedestalProps) {
  return (
    <div
      className="group relative flex flex-col items-center justify-center 
                 p-6 bg-gray-950 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.8)] 
                 hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] 
                 border-[6px] border-gray-700 hover:border-indigo-500 
                 transition-all duration-500"
    >
      {/* Pedestal with artifact */}
      <div className="relative w-[250px] h-[250px] mb-4 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain"
        />

        {/* Glass shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                        translate-x-[-100%] group-hover:translate-x-[100%] 
                        transition-transform duration-1000 ease-in-out" />

        {/* Subtle reflection */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-30" />
      </div>
      <h2 className="text-xl font-semibold mb-2 group-hover:text-indigo-400">
        {title}
      </h2>
      <p className="text-sm text-gray-400 text-center">{description}</p>
    </div>
  );
}
