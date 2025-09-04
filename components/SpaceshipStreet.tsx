// components/SpaceshipStreet.tsx
import Starfield from "./Exprience/Starfield";

export default function SpaceshipStreet() {
  return (
    <div className="w-[600px] h-[400px] flex items-center justify-center bg-red-800 border-4 border-red-500 rounded-xl relative overflow-hidden">
      <Starfield />
      <h1 className="text-3xl font-bold text-red-300 z-10">🔥 Street Ship</h1>
    </div>
  );
}
