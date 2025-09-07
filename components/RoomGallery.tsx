// components/RoomGallery.tsx
"use client";

import { useState } from "react";
import GalleryLightbox from "./GalleryLightbox";

export default function RoomGallery({ items }: { items: { src: string; alt?: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  if (!items?.length) return null;

  return (
    <>
      <h3 className="text-lg font-semibold mt-10 mb-4">Gallery</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {items.map((it, i) => (
          <button
            key={it.src}
            onClick={() => setOpenIndex(i)}
            className="group relative overflow-hidden rounded-xl ring-1 ring-white/10 bg-white/5"
          >
            <img
              src={it.src}
              alt={it.alt || `Item ${i + 1}`}
              className="h-36 w-full object-cover group-hover:opacity-100 opacity-90 transition-opacity"
              draggable={false}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <GalleryLightbox
          items={items}
          startIndex={openIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </>
  );
}
