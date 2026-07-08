"use client";

import { motion } from "framer-motion";
import { useAudioPlayer } from "@/context/AudioPlayerContext";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  description: string;
  audioFile?: string;
  onInstall?: () => void;
};

export default function SoulPreviewModal({
  open,
  onClose,
  title,
  subtitle,
  description,
  audioFile,
  onInstall,
}: Props) {
  const { play, toggle, isPlaying, currentTitle } = useAudioPlayer();

  if (!open) return null;

  const isThisPlaying = isPlaying && currentTitle === title;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur">
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-md rounded-2xl bg-zinc-900 p-6 text-white shadow-2xl"
      >
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">{title}</h2>

          <p className="text-xs uppercase tracking-widest text-white/40">
            {subtitle}
          </p>

          <p className="text-sm leading-relaxed text-white/70">
            {description}
          </p>

          <div className="pt-4 flex justify-between items-center">
            <button onClick={onClose} className="text-xs text-white/50">
              Close
            </button>

            <div className="flex gap-3">
              {audioFile && (
                <button
                  onClick={() =>
                    isThisPlaying
                      ? toggle()
                      : play(audioFile, title)
                  }
                  className="rounded-full px-4 py-1.5 text-xs font-medium bg-emerald-400 text-black"
                >
                  {isThisPlaying ? "⏸ Pause" : "▶ Play"}
                </button>
              )}

              {onInstall && (
                <button
                  onClick={onInstall}
                  className="rounded-full px-4 py-1.5 text-xs font-medium bg-white text-black"
                >
                  Install
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
