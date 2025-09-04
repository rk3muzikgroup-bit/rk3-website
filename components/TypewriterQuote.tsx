// components/TypewriterQuote.tsx
import { useEffect, useState } from "react";

export default function TypewriterQuote({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 40); // typing speed
    return () => clearInterval(interval);
  }, [text]);

  return (
    <p className="text-lg md:text-xl text-gray-300 max-w-2xl text-center leading-relaxed">
      {displayed}
    </p>
  );
}
