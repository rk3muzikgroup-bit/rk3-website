"use client";
import { motion } from "framer-motion";

export default function ArtifactCard({ title, origin, description, image }: {
  title: string;
  origin: string;
  description: string;
  image: string;
}) {
  return (
    <motion.div
      className="bg-zinc-900 rounded-2xl shadow-lg overflow-hidden max-w-3xl mx-auto my-6 flex flex-col md:flex-row"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Artifact Image */}
      <div className="md:w-1/2">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-64 md:h-full"
        />
      </div>

      {/* Text Content */}
      <div className="p-6 md:w-1/2 flex flex-col justify-center">
        <h2 className="text-xl font-bold text-indigo-400 mb-2">{title}</h2>
        <p className="text-sm text-gray-400 italic mb-3">{origin}</p>
        <p className="text-base text-gray-200 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
