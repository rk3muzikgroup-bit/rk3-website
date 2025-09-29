import Image from "next/image";

interface ArtifactFrameProps {
  title: string;
  image: string;
  description: string;
}

export default function ArtifactFrame({ title, image, description }: ArtifactFrameProps) {
  return (
    <div
      className="group relative rounded-lg overflow-hidden 
                 border-[12px] border-gray-700 hover:border-indigo-500 
                 bg-gray-950 shadow-[0_0_30px_rgba(0,0,0,0.8)] 
                 hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] 
                 transition-all duration-500"
    >
      <div className="relative w-full h-[400px] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />

        {/* Glass shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                        translate-x-[-100%] group-hover:translate-x-[100%] 
                        transition-transform duration-1000 ease-in-out" />

        {/* Subtle glass reflection always present */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-30" />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 group-hover:text-indigo-400">
          {title}
        </h2>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
  );
}
