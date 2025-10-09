"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useConsentGate(target = "/transmission") {
  const router = useRouter();
  useEffect(() => {
    const ok = localStorage.getItem("rk3_consent_v1");
    if (ok !== "yes") router.replace(target);
  }, [router, target]);
}
