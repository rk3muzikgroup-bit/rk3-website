// components/SpaceshipRide.tsx
import Starfield from "./Exprience/Starfield";

export default function SpaceshipRide() {
  return (
    <div className="w-[600px] h-[400px] flex items-center justify-center bg-gray-800 border-4 border-gray-500 rounded-xl relative overflow-hidden">
      <Starfield />
      <h1 className="text-3xl font-bold text-white z-10">🚀 Ride Ship (Base)</h1>
    </div>
  );
}
