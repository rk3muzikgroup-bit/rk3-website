"use client";
import { useEffect } from "react";
import { soundLevels } from "../config/soundLevels";

export default function EntrySound() {
  useEffect(() => {
    const unlock = new Audio("/sounds/unlock.mp3");
    unlock.volume = soundLevels.unlock;

    const rocket = new Audio("/sounds/rocket.mp3");
    rocket.volume = soundLevels.rocket;

    unlock.play().then(() => {
      unlock.onended = () => rocket.play();
    });
  }, []);

  return null;
}
