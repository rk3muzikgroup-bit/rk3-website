// pages/success.tsx
import { useRouter } from "next/router";

export default function SuccessPage() {
  const router = useRouter();
  const { session_id } = router.query; // Stripe sends this back

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold text-emerald-400 mb-6">
        ✅ Welcome to the Family!
      </h1>
      <p className="text-lg text-center mb-4">
        Your subscription was successful. You’re officially part of{" "}
        <span className="text-yellow-400">RK3 World</span>.
      </p>
      {session_id && (
        <p className="text-sm text-gray-400">
          (Session ID: {session_id})
        </p>
      )}
      <button
        onClick={() => router.push("/")}
        className="mt-8 px-6 py-3 bg-gradient-to-r from-yellow-500 to-emerald-600 rounded-full text-black font-bold shadow-xl hover:scale-105 transform transition"
      >
        Enter the Vault
      </button>
    </div>
  );
}
