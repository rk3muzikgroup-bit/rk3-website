"use client";

import { useState } from "react";

type Props = {
  onSave: (text: string) => void;
};

export default function ReflectionInput({ onSave }: Props) {
  const [text, setText] = useState("");

  return (
    <div className="space-y-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="If anything wants to be written, you may let it land here."
        className="
          w-full
          min-h-[96px]
          resize-none
          rounded-xl
          bg-white/[0.04]
          border border-white/10
          px-4 py-3
          text-sm
          text-white
          placeholder:text-white/40
          focus:outline-none
          focus:border-white/20
        "
      />

      <div className="flex justify-end">
        <button
          onClick={() => {
            if (!text.trim()) return;
            onSave(text.trim());
            setText("");
          }}
          className="
            rounded-full
            px-4 py-1.5
            text-xs
            bg-white
            text-black
            hover:bg-white/90
            transition
          "
        >
          Save Reflection
        </button>
      </div>
    </div>
  );
}
