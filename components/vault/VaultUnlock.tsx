"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function VaultUnlock({ onGrant }: { onGrant: () => void }) {
  const [denied, setDenied] = useState(false);
  const [granted, setGranted] = useState(false);
  const router = useRouter();
  const humRef = useRef<HTMLAudioElement | null>(null);

  // 🎵 Ambient door hum
  useEffect(() => {
    if (humRef.current) {
      humRef.current.volume = 0.3;
      humRef.current.loop = true;
      humRef.current.play().catch(() => {
        console.warn("Vault hum requires user interaction first.");
      });
    }
  }, []);

  // Fade hum out on grant
  const fadeOutHum = () => {
    if (!humRef.current) return;
    let vol = humRef.current.volume;
    const interval = setInterval(() => {
      vol -= 0.05;
      if (humRef.current) humRef.current.volume = Math.max(vol, 0);
      if (vol <= 0) {
        clearInterval(interval);
        humRef.current?.pause();
      }
    }, 150);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const success = Math.random() > 0.3; // 70% chance

      if (success) {
        setGranted(true);

        const audio = new Audio("/sounds/vault/unlock.mp3");
        audio.volume = 0.8;
        audio.play();

        setTimeout(() => {
          fadeOutHum();
          onGrant();
        }, 2200);
      } else {
        const audio = new Audio("/sounds/vault/denied_blast.mp3");
        audio.volume = 0.8;
        audio.play();
        setDenied(true);

        setTimeout(() => {
          router.push("/portals");
        }, 3000);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [onGrant, router]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      {/* Ambient Hum */}
      <audio ref={humRef} src="/sounds/vault/door_hum.mp3" />

      {/* 🌌 Background shimmer when granted */}
      {granted && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.15, 0.35, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(circle at center, rgba(16,185,129,0.3), rgba(250,204,21,0.25), transparent 70%)",
          }}
        />
      )}

      {/* Orb Scanner */}
      <motion.div
        className={`relative w-20 h-20 rounded-full ${
          denied ? "bg-red-600" : "bg-emerald-400"
        }`}
        animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        {/* ✅ Emerald Pulse */}
        {granted && (
          <motion.div
            className="absolute inset-0 rounded-full bg-emerald-400 blur-2xl opacity-60"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [1, 2.2, 1.2],
              opacity: [0.8, 0.1, 0.6],
            }}
            transition={{
              duration: 2.2,
              ease: "easeOut",
              repeat: Infinity,
              repeatDelay: 1.5,
            }}
          />
        )}

        {/* ✨ Golden Ripple */}
        {granted && (
          <motion.div
            className="absolute inset-0 rounded-full bg-yellow-400 blur-3xl opacity-40"
            initial={{ scale: 1, opacity: 0 }}
            animate={{
              scale: [1.2, 2.8, 1.5],
              opacity: [0.5, 0.1, 0.4],
            }}
            transition={{
              duration: 3,
              ease: "easeOut",
              repeat: Infinity,
              repeatDelay: 2,
            }}
          />
        )}
      </motion.div>

      {/* Status Text */}
      <p className="mt-6 text-lg z-10">
        {denied
          ? "❌ Access Denied — Returning..."
          : granted
          ? "✅ Access Granted"
          : "🔍 Scanning Access..."}
      </p>
    </div>
  );
}
