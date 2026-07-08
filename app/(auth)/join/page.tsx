"use client";

import { useState } from "react";
import HumanConfirm from "@/components/auth/HumanConfirm";
import JoinForm from "@/components/auth/JoinForm";
import { useRouter } from "next/navigation";

export default function JoinPage() {
  const [humanConfirmed, setHumanConfirmed] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      {!humanConfirmed ? (
        <HumanConfirm
          onConfirm={() => setHumanConfirmed(true)}
        />
      ) : (
        <JoinForm
          onSuccess={() => router.push("/healing/library")}
        />
      )}
    </div>
  );
}
