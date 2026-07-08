"use client";

import SoulTopBar from "@/components/soul/SoulTopBar";
import SessionGrid from "@/components/session/SessionGrid";

export default function SoulPage() {
  return (
    <>
      {/* PAGE CONTENT */}
      <div className="text-white p-10 space-y-8">
        <SoulTopBar />
        <SessionGrid />
      </div>

      {/* 
        GLOBAL BOTTOM SPACER
        Reserves space for MiniPlayer + expansion + modal
        This is the critical missing piece
      */}
      <div className="h-[180px]" />
    </>
  );
}
