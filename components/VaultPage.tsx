// components/VaultPage.tsx
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function VaultPage() {
  const doorRef = useRef<HTMLAudioElement | null>(null);
  const grantedRef = useRef<HTMLAudioElement | null>(null);
  const deniedRef = useRef<HTMLAudioElement | null>(null);

  // 🔑 Toggle this manually for now (true = Access Granted, false = Denied)
  const isGranted = true;

  useEffect(() => {
    // Play vault door after 2s
    const doorTimer = setTimeout(() => {
      if (doorRef.current) {
        doorRef.current.play().catch((err) => {
          console.log("Vault door sound blocked:", err);
        });
      }

      // Then decide granted/denied after 1s
      const responseTimer = setTimeout(() => {
        if (isGranted) {
          grantedRef.current?.play().catch((err) => {
            console.log("Access granted sound blocked:", err);
          });
        } else {
          deniedRef.current?.play().catch((err) => {
            console.log("Access denied sound blocked:", err);
          });
        }
      }, 1000);

      return () => clearTimeout(responseTimer);
    }, 2000);

    return () => clearTimeout(doorTimer);
  }, [isGranted]);

  return (
    <div className="relative min-h-screen flex flex-col text-white">
      {/* Vault Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/vault.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/80 z-10" />

      {/* Sounds */}
      <audio ref={doorRef} src="/sounds/vault-door.mp3" preload="auto" />
      <audio ref={grantedRef} src="/sounds/access-granted.mp3" preload="auto" />
      <audio ref={deniedRef} src="/sounds/access-denied.mp3" preload="auto" />

      {/* Page Content */}
      <div className="relative z-20 flex flex-col min-h-screen items-center justify-center text-center px-6">
        <h1 className="text-6xl font-extrabold mb-6 text-gold-400">🚪 The Vault</h1>
        {isGranted ? (
          <p className="max-w-3xl text-lg text-gray-300 mb-8">
            Access Granted. You made it through Street, Soul, and Spirit — the hidden treasures of RK3 unlock.
          </p>
        ) : (
          <p className="max-w-3xl text-lg text-red-400 mb-8">
            Access Denied. You must be a Platinum Member to unlock the Vault.
          </p>
        )}
        <Link
          href="/"
          className="px-8 py-4 bg-gold-400 text-black rounded-2xl text-xl font-semibold hover:bg-gold-300 transition"
        >
          Return Home 🏠
        </Link>
      </div>
    </div>
  );
}
