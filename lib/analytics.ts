// lib/analytics.ts
export type AnalyticsEvent =
  | "intro_start" | "intro_end" | "intro_skip"
  | "portal_view" | "portal_pick" | "portal_intro_replay"
  | "ride_view" | "ride_volume_change" | "ride_mute_toggle"
  | "warp_click" | "warp_complete";

export function sendAnalytics(event: AnalyticsEvent, data: Record<string, any> = {}) {
  try {
    const refinfo = safeParse(localStorage.getItem("rk3_refinfo"));
    const payload = {
      event,
      ts: Date.now(),
      path: typeof window !== "undefined" ? window.location.pathname : "",
      ua: typeof navigator !== "undefined" ? navigator.userAgent : "",
      ref: refinfo?.ref || null,
      utm_source: refinfo?.utm_source || null,
      utm_medium: refinfo?.utm_medium || null,
      utm_campaign: refinfo?.utm_campaign || null,
      ...data,
    };
    const body = JSON.stringify(payload);
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/analytics", new Blob([body], { type: "application/json" }));
    } else {
      fetch("/api/analytics", { method: "POST", body, keepalive: true, headers: { "content-type": "application/json" } });
    }
  } catch { /* no-op */ }
}
function safeParse(v: string | null) { try { return v ? JSON.parse(v) : null; } catch { return null; } }
