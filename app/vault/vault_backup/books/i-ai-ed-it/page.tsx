"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function VaultBooks() {
  const [showChamber, setShowChamber] = useState(false);

  useEffect(() => {
    // Vault door opens after delay
    const timer = setTimeout(() => setShowChamber(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const books = [
    {
      title: "I-AI-ED-IT",
      slug: "i-ai-ed-it",
      cover: "/images/books/i-ai-ed-it-cover.jpg",
      description:
        "The spark, the grind, the vision — RK3’s blueprint on sweat, soul, and spirit.",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white p-8 flex flex-col items-center justify-center">
      {!showChamber ? (
        // Vault Door Animation
        <motion.div
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: 2 }}
          className="w-full h-full bg-gradient-to-r from-gray-800 via-black to-gray-800 origin-left"
        />
      ) : (
        <>
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-gray-400 self-start">
            <Link href="/vault" className="hover:text-white">
              Vault
            </Link>{" "}
            / <span className="text-gray-200">Books</span>
          </nav>

          {/* Header */}
          <h1 className="text-4xl font-bold mb-6">Books Chamber</h1>
          <p className="text-gray-400 mb-12 max-w-2xl text-center">
            Priceless works framed in vault glass. Step closer and unlock their secrets.
          </p>

          {/* Framed Book Portals */}
          <div className="grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <Link
                key={book.slug}
                href={`/vault/books/${book.slug}`}
                className="group relative rounded-lg overflow-hidden 
                           border-[10px] border-gray-700 hover:border-indigo-500 
                           bg-gray-950 shadow-xl hover:shadow-indigo-700/40 
                           transition-all duration-500"
              >
                {/* Frame */}
                <div className="relative w-full h-[450px]">
                  <Image
                    src={book.cover}
                    alt={`${book.title} cover`}
                    fill
                    className="object-cover"
                  />
                  {/* Glass reflection effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-70 transition duration-500" />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-indigo-400">
                    {book.title}
                  </h2>
                  <p className="text-sm text-gray-400">{book.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
