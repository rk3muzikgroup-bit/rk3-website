import { useShipTelemetry } from "@/context/ShipTelemetryContext";

export default function CockpitHUD() {
  const telemetry = useShipTelemetry();

  return (
    <div className="absolute top-4 left-4 text-xs text-emerald-400 font-mono space-y-1">
      <p>Altitude: {telemetry.altitude.toFixed(0)} mi</p>
      <p>Speed: {telemetry.speed.toFixed(2)} km/s</p>
      <p>Population: {telemetry.population.toLocaleString()}</p>
      <p>Lat: {telemetry.lat.toFixed(2)}°N Lon: {telemetry.lon.toFixed(2)}°W</p>
    </div>
  );
}
{/* HUD Badge with Portal Aura */}
<motion.div
  className="absolute top-6 left-6 flex items-center gap-3 p-3 rounded-xl backdrop-blur-sm border shadow-md z-20"
  style={{
    borderColor: `var(--tw-color-${radarColor}, rgba(255,255,255,0.2))`,
    boxShadow: `0 0 25px var(--tw-color-${radarColor}, rgba(255,255,255,0.2))`,
  }}
  animate={{ opacity: [0.9, 1, 0.9] }}
  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
>
  <img
    src={badge?.avatar || "/avatars/default.png"}
    alt="avatar"
    className="w-10 h-10 rounded-full border border-white/30"
  />
  <div>
    <p className="text-sm font-bold">{badge?.username || pilotName || "Pilot"}</p>
    <p className="text-xs opacity-70 capitalize">Portal: {badge?.portal || portal}</p>
  </div>
</motion.div>
