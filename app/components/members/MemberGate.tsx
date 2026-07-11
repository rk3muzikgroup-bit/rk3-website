"use client";

import { useAuth } from "@/lib/auth/AuthProvider";

type Props = {
  children: React.ReactNode;
};

export default function MemberGate({ children }: Props) {
  const { user } = useAuth();

  // 🚫 Not signed in
  if (!user) {
    return (
      <div className="rounded border p-4 text-sm">
        Please sign in to access the library.
      </div>
    );
  }

  /**
   * 🔓 SOFT OPEN LOGIC
   * - Right now: any signed-in user is allowed
   * - Later: this is where paid / tier checks go
   */
  const isAllowed = true;

  if (!isAllowed) {
    return (
      <div className="rounded border p-4 text-sm">
        Your membership does not include access to this area.
      </div>
    );
  }

  return <>{children}</>;
}
