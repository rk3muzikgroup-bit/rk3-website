// components/ThemeWrapper.tsx
import { ReactNode } from "react";
import Starfield from "./Exprience/Starfield";

type ThemeWrapperProps = {
  path: "ride" | "street" | "soul" | "spirit";
  children: ReactNode;
};

export default function ThemeWrapper({ path, children }: ThemeWrapperProps) {
  let bgClass = "bg-black";
  let auraColor = "";

  switch (path) {
    case "street":
      bgClass = "bg-black";
      auraColor = "from-red-900/40 to-red-600/20";
      break;
    case "soul":
      bgClass = "bg-black";
      auraColor = "from-indigo-900/40 to-emerald-600/20";
      break;
    case "spirit":
      bgClass = "bg-black";
      auraColor = "from-yellow-800/40 to-yellow-400/20";
      break;
    default:
      bgClass = "bg-black";
      auraColor = "from-gray-700/40 to-gray-400/20";
      break;
  }

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center relative overflow-hidden ${bgClass}`}>
      <Starfield />
      {/* Aura overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${auraColor} pointer-events-none`}
      />
      {/* Content */}
      <div className="z-10 w-full flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}
