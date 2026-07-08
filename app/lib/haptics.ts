export function hapticLight() {
  if (typeof navigator === "undefined") return;

  // iOS Safari + most Android browsers
  if ("vibrate" in navigator) {
    navigator.vibrate(8); // light, short
  }
}
