"use client";
import { useState } from "react";

interface DownloadLinkProps {
  file: string;   // path to PDF in /public/docs
  label: string;  // button text
}

export default function DownloadLink({ file, label }: DownloadLinkProps) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    const link = document.createElement("a");
    link.href = file;
    link.download = file.split("/").pop() || "rk3-download";
    link.click();
    setDownloading(false);
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg shadow-md transition disabled:opacity-50"
      disabled={downloading}
    >
      {downloading ? "Downloading..." : label}
    </button>
  );
}

