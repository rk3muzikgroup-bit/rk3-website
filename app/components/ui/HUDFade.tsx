"use client";

import { ReactNode } from "react";

type Props = {
  show: boolean;
  delay?: number;
  children: ReactNode;
};

export default function HUDFade({
  show,
  delay = 0,
  children,
}: Props) {
  return (
    <div
      style={{
        opacity: show ? 1 : 0,
        transition: "opacity 0.5s ease",
        transitionDelay: `${delay}ms`,
        pointerEvents: show ? "auto" : "none",
      }}
    >
      {children}
    </div>
  );
}
