"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

type Accent = "street" | "soul" | "spirit" | "gold" | undefined;

const ringByAccent: Record<NonNullable<Accent>, string> = {
  street: "ring-cyan-400/40 hover:ring-cyan-300/60",
  soul: "ring-amber-400/40 hover:ring-amber-300/60",
  spirit: "ring-indigo-400/40 hover:ring-indigo-300/60",
  gold: "ring-yellow-400/40 hover:ring-yellow-300/60",
};

export default function VaultTile({
  href, title, subtitle, cover, accent,
}: {
  href: string;
  title: string;
  subtitle?: string;
  cover: string;
  accent?: Accent;
}) {
  const ring = accent ? ringByAccent[accent] : "ring-white/20 hover:ring-white/40";
  return (
    <Link href={href} className="block">
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.99 }}
        className={`group relative overflow-hidden rounded-2xl ring-1 ${ring} bg-white/5`}
      >
        <img
          src={cover}
          alt={title}
          className="h-52 w-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="text-lg font-semibold">{title}</div>
          {subtitle && <div className="text-xs text-white/70">{subtitle}</div>}
        </div>
      </motion.div>
    </Link>
  );
}
