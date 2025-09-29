"use client";

import OverlayGlitch from "./OverlayGlitch";
import { useOverlay } from "@/context/OverlayContext";

export default function OverlayHud() {
  const { overlay } = useOverlay();
  return (
    <OverlayGlitch
      text={overlay.text}
      show={overlay.visible}
      color={overlay.color}
    />
  );
}
