"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SpiritRide() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/vault");
    }, 71000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="relative min-h-screen flex items-center justify-center text-center text-white">
      <video
        autoPlay
        loop
        muted={false}
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/spirit-ride.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div className="relative z-20 px-6">
        <h1 className="text-5xl font-extrabold mb-6">✨ Spirit Spaceship Ride</h1>
        <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto">
          Elevate with the Spirit frequency.  
          In 1:11, you’ll step to the Vault.
        </p>
      </div>
    </div>
  );
}
tilis