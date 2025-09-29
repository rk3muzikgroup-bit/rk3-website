"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import ArtifactFrame from "@/components/ArtifactFrame";
import ArtifactPedestal from "@/components/ArtifactPedestal";

export default function PricelessVault() {
  const [showChamber, setShowChamber] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowChamber(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-8 flex flex-col items-center justify-center">
      {!showChamber ? (
        <motion.div
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: 3 }}
          className="w-full h-full bg-gradient-to-r from-gray-800 via-black to-gray-800 origin-left"
        />
      ) : (
        <>
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-gray-400 self-start">
            <Link href="/vault" className="hover:text-white">
              Vault
            </Link>{" "}
            / <span className="text-gray-200">Priceless</span>
          </nav>

          <h1 className="text-4xl font-bold mb-6">Priceless Vault</h1>
          <p className="text-gray-400 mb-12 max-w-2xl text-center">
            World treasures, cosmic artifacts, and sacred teachings —
            preserved in the vault of RK3. Explore what few ever see.
          </p>

          {/* Artifact Grid */}
          <div className="grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <ArtifactPedestal
              title="Pharaoh’s Crown"
              image="/images/priceless/pharaoh-crown.jpg"
              description="A golden crown worn by ancient kings — wisdom, power, and legacy."
            />
            <ArtifactFrame
              title="Thoth’s Scroll"
              image="/images/priceless/thoth-scroll.jpg"
              description="Teachings etched into eternity — wisdom of the Emerald Tablets."
            />
            <ArtifactFrame
              title="Celestial Painting"
              image="/images/priceless/cosmic-art.jpg"
              description="An RK3 original — priceless vision framed in vault glass."
            />
          </div>
        </>
      )}
    </main>
  );
}
