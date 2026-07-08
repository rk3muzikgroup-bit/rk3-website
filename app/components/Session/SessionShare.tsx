"use client";

import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import { createShareCode } from "@/lib/sessionShare";
import type { SessionPayload } from "@/hooks/useSessionEngine";

/* ───────── PROPS ───────── */

type Props = {
  session?: SessionPayload | null;
  open: boolean;
  onClose: () => void;
};

/* ───────── COMPONENT ───────── */

export default function SessionShare({
  session,
  open,
  onClose,
}: Props) {
  const [qr, setQr] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [origin, setOrigin] = useState<string>("");

  /* ───────── SAFE ORIGIN ───────── */
  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  /* ───────── CREATE SHARE CODE ───────── */
  const code = useMemo(() => {
    if (!session?.id) return null;
    return createShareCode(session, 60); // expires in 60 minutes
  }, [session?.id]);

  /* ───────── GENERATE QR ───────── */
  useEffect(() => {
    if (!code) return;

    QRCode.toDataURL(code, { margin: 1, width: 240 })
      .then(setQr)
      .catch(() => setQr(null));
  }, [code]);

  if (!open || !session || !code || !origin) return null;

  /* ───────── ACTIONS ───────── */

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(
        `${origin}/healing?share=${code}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard blocked — fail silently
    }
  }

  /* ───────── UI ───────── */

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md">
      <div className="w-[360px] rounded-xl border border-white/10 bg-black/90 p-6 text-center shadow-2xl">
        <div className="mb-2 text-xs uppercase tracking-widest opacity-60">
          Share Session
        </div>

        <div className="mb-4 text-sm opacity-70">
          {session.title ?? "Healing Session"}
        </div>

        {/* QR CODE */}
        {qr && (
          <img
            src={qr}
            alt="Session QR"
            className="mx-auto mb-4 rounded bg-white p-2"
          />
        )}

        {/* SHARE URL */}
        <textarea
          readOnly
          value={`${origin}/healing?share=${code}`}
          className="mb-3 h-20 w-full resize-none rounded border border-white/10 bg-black px-2 py-1 text-[10px] opacity-70"
        />

        <div className="flex gap-2">
          <button
            onClick={copyLink}
            className="flex-1 rounded bg-emerald-400 py-2 text-sm font-medium text-black"
          >
            {copied ? "Copied ✓" : "Copy Link"}
          </button>

          <button
            onClick={onClose}
            className="flex-1 rounded border border-white/20 py-2 text-sm opacity-70 hover:bg-white/5"
          >
            Close
          </button>
        </div>

        <div className="mt-3 text-[10px] opacity-50">
          Secure · Read-only · Auto-expires
        </div>
      </div>
    </div>
  );
}
