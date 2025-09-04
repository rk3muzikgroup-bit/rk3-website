import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";

export default function Pathways() {
  const [loading, setLoading] = useState(false);

  const handleTestClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000); // hide after 3s
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
      {!loading && (
        <>
          <h1 className="text-4xl font-bold mb-6">Choose Your Pathway</h1>
          <button
            onClick={handleTestClick}
            className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-emerald-600 rounded-full text-black font-bold shadow-xl hover:scale-105 transition"
          >
            Test Loader
          </button>
        </>
      )}

      {loading && <LoadingScreen />}
    </div>
  );
}
import { useState } from "react";
import LoadingScreen from "./LoadingScreen";

export default function Pathways() {
  const [loading, setLoading] = useState(false);

  const handlePathway = (path: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // 🔥 Later we'll route to `/street`, `/soul`, `/spirit`
      // For now it just returns you to this menu
      console.log(`Selected: ${path}`);
    }, 3000); // Loader time (ms)
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-gold space-y-6">
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <h1 className="text-4xl font-bold mb-8">Choose Your Pathway</h1>
          <button
            onClick={() => handlePathway("Street")}
            className="px-6 py-3 bg-gold text-black rounded-lg shadow-lg hover:bg-yellow-500 transition"
          >
            Street
          </button>
          <button
            onClick={() => handlePathway("Soul")}
            className="px-6 py-3 bg-gold text-black rounded-lg shadow-lg hover:bg-yellow-500 transition"
          >
            Soul
          </button>
          <button
            onClick={() => handlePathway("Spirit")}
            className="px-6 py-3 bg-gold text-black rounded-lg shadow-lg hover:bg-yellow-500 transition"
          >
            Spirit
          </button>
        </>
      )}
    </div>
  );
}
import { useState } from "react";
import { useRouter } from "next/router";
import LoadingScreen from "./LoadingScreen";

export default function Pathways() {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("");
  const router = useRouter();

  const handlePathway = (path: string) => {
    setSelected(path);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push(`/${path.toLowerCase()}`); // go to /street, /soul, /spirit
    }, 3000); // loader length
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-gold space-y-6">
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <h1 className="text-4xl font-bold mb-8">Choose Your Pathway</h1>
          <button
            onClick={() => handlePathway("Street")}
            className="px-6 py-3 bg-gold text-black rounded-lg shadow-lg hover:bg-yellow-500 transition"
          >
            Street
          </button>
          <button
            onClick={() => handlePathway("Soul")}
            className="px-6 py-3 bg-gold text-black rounded-lg shadow-lg hover:bg-yellow-500 transition"
          >
            Soul
          </button>
          <button
            onClick={() => handlePathway("Spirit")}
            className="px-6 py-3 bg-gold text-black rounded-lg shadow-lg hover:bg-yellow-500 transition"
          >
            Spirit
          </button>
        </>
      )}
    </div>
  );
}
// pages/street.tsx
import SpaceshipStreet from "../../components/SpaceshipStreet";

export default function StreetPage() {
  return (
    <div>
      <SpaceshipStreet />
    </div>
  );
}
