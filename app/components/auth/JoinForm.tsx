"use client";

import { useState } from "react";
import { authRepo } from "@/lib/auth/authRepo";

export default function JoinForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    authRepo.login(email);
    onSuccess();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md w-full space-y-4 rounded border p-6"
    >
      <h2 className="text-lg font-semibold">
        Join the space
      </h2>

      <input
        type="email"
        placeholder="you@email.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full border rounded px-3 py-2"
        required
      />

      <button className="btn-primary w-full">
        Enter
      </button>
    </form>
  );
}
