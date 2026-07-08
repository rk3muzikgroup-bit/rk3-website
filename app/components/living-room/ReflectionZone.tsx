"use client";

import { useReflections } from "@/hooks/useReflections";
import ReflectionInput from "./ReflectionInput";

export default function ReflectionZone() {
  const { reflection, save, clear } = useReflections();

  return (
    <section className="space-y-4">
      <h2 className="text-sm tracking-wide text-white/60">
        Reflection
      </h2>

      {!reflection && <ReflectionInput onSave={save} />}

      {reflection && (
        <div
          className="
            rounded-xl
            bg-white/[0.04]
            border border-white/10
            px-4 py-4
            text-sm
            text-white/80
            space-y-3
          "
        >
          <p className="whitespace-pre-wrap leading-relaxed">
            {reflection.text}
          </p>

          <div className="flex justify-end">
            <button
              onClick={clear}
              className="text-xs text-white/40 hover:text-white transition"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
