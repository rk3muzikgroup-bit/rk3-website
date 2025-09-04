// components/CockpitAmbient.tsx
import { useEffect } from "react";

export default function CockpitAmbient() {
  useEffect(() => {
    // 🔊 Spaceship hum loop
    const hum = new Audio("/sounds/spaceship-hum.mp3");
    hum.loop = true;
    hum.volume = 0.4;
    hum.play().catch(() => {
      console.log("Autoplay blocked until user interacts.");
    });

    // 🔔 Random console beeps
    let beepInterval = setInterval(() => {
      const beep = new Audio("/sounds/console-beep.mp3");
      beep.volume = 0.2;
      beep.play();
    }, Math.random() * 4000 + 3000); // 3–7 sec random gaps

    return () => {
      hum.pause();
      hum.currentTime = 0;
      clearInterval(beepInterval);
    };
  }, []);

  return null; // invisible component
}
