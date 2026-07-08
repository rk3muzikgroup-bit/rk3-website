"use client";

import SessionLibrary from "@/components/library/SessionLibrary";

export default function LibraryPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">
        Session Library
      </h1>
      <SessionLibrary />
    </div>
  );
}
