"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Telemetry = {
  altitude: number;
  speed: number;
  population: number;
  lat: number;
  lon: number;
};

export type FleetTelemetry = Record<string, Telemetry>;

const ShipTelemetryContext = createContext<FleetTelemetry | null>(null);

export function ShipTelemetryProvider({ children }: { children: ReactNode }) {
  const [fleet, setFleet] = useState<FleetTelemetry>({
    rk3: { altitude: 137011, speed: 7.66, population: 8100000000, lat: 29.76, lon: -95.36 },
    isis: { altitude: 137200, speed: 7.70, population: 8100000000, lat: 30.0, lon: -95.5 },
    yang: { altitude: 136800, speed: 7.62, population: 8100000000, lat: 29.5, lon: -95.2 },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setFleet((prev) => {
        const updated: FleetTelemetry = {};
        Object.entries(prev).forEach(([key, val]) => {
          updated[key] = {
            ...val,
            altitude: val.altitude + (Math.random() - 0.5) * 20,
            speed: val.speed + (Math.random() - 0.5) * 0.02,
            population: val.population + Math.floor(Math.random() * 3),
            lat: val.lat + (Math.random() - 0.005),
            lon: val.lon + (Math.random() - 0.005),
          };
        });
        return updated;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ShipTelemetryContext.Provider value={fleet}>
      {children}
    </ShipTelemetryContext.Provider>
  );
}

export function useFleetTelemetry() {
  const context = useContext(ShipTelemetryContext);
  if (!context) {
    throw new Error("useFleetTelemetry must be used inside ShipTelemetryProvider");
  }
  return context;
}
