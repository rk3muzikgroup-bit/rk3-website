const DEVICE_KEY = "rk3_device_id";

function generateDeviceId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `device_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export function getDeviceId(): string {
  if (typeof window === "undefined") {
    // SSR safety — return ephemeral ID
    return generateDeviceId();
  }

  let id = localStorage.getItem(DEVICE_KEY);

  if (!id) {
    id = generateDeviceId();
    try {
      localStorage.setItem(DEVICE_KEY, id);
    } catch {
      // storage may be blocked (private mode, quota, etc.)
    }
  }

  return id;
}
