"use client";

import {
  exportActiveProfile,
  importProfileDump,
  type RK3ProfileExport,
} from "@/lib/profileIO";

export default function ProfileImportExport() {
  function downloadProfile() {
    const dump = exportActiveProfile();
    if (!dump) return;

    try {
      const blob = new Blob(
        [JSON.stringify(dump, null, 2)],
        { type: "application/json" }
      );

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `rk3-profile-${dump.profile.id}.json`;
      a.style.display = "none";

      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // fail silently — export should never crash UI
    }
  }

  function uploadProfile(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    // allow re-upload of same file
    e.target.value = "";

    const reader = new FileReader();

    reader.onload = () => {
      try {
        const parsed = JSON.parse(
          reader.result as string
        ) as RK3ProfileExport;

        /**
         * Version guard
         * - allow exact match now
         * - future versions can branch here
         */
        if (parsed.version !== "rk3-1.0") {
          alert("Unsupported profile version");
          return;
        }

        importProfileDump(parsed);

        // hard reload ensures full state hydration
        window.location.reload();
      } catch {
        alert("Invalid or corrupted profile file");
      }
    };

    reader.readAsText(file);
  }

  return (
    <div className="fixed bottom-6 left-6 z-50 w-64 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl p-4">
      <div className="text-sm tracking-widest uppercase mb-3 opacity-70">
        Profile Backup
      </div>

      <button
        onClick={downloadProfile}
        className="w-full mb-2 bg-white/10 hover:bg-white/20 py-2 rounded text-sm"
      >
        Export Profile
      </button>

      <label className="block text-sm bg-white/10 hover:bg-white/20 py-2 rounded text-center cursor-pointer">
        Import Profile
        <input
          type="file"
          accept=".json"
          onChange={uploadProfile}
          className="hidden"
        />
      </label>
    </div>
  );
}
