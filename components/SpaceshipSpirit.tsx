// components/SpaceshipSpirit.tsx
import Starfield from "./Exprience/Starfield";

export default function SpaceshipSpirit() {
  return (
    <div className="w-[600px] h-[400px] flex items-center justify-center bg-yellow-700 border-4 border-yellow-400 rounded-xl relative overflow-hidden">
      <Starfield />
      <h1 className="text-3xl font-bold text-yellow-200 z-10">✨ Spirit Ship</h1>
    </div>
  );
}
