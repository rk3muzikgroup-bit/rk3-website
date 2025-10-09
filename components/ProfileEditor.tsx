"use client";

import { useState } from "react";

export default function ProfileEditor({
  username,
  info,
  onSave,
}: {
  username: string;
  info: string;
  onSave: (newName: string, newInfo: string) => void;
}) {
  const [editName, setEditName] = useState(username);
  const [editInfo, setEditInfo] = useState(info);
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Edit Button */}
      <button
        onClick={() => setOpen(true)}
        className="ml-2 px-2 py-1 text-xs border border-gray-500 text-gray-300 rounded hover:scale-105 transition"
      >
        Edit
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="bg-gray-900 border border-emerald-400 rounded-xl p-6 w-96 shadow-[0_0_30px_rgba(0,255,200,0.4)]">
            <h2 className="text-xl font-bold text-emerald-300 mb-4">Edit Profile</h2>

            <label className="block mb-3 text-sm text-gray-300">
              Username
              <input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-black border border-gray-600 rounded text-white"
              />
            </label>

            <label className="block mb-3 text-sm text-gray-300">
              Info Line
              <input
                value={editInfo}
                onChange={(e) => setEditInfo(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-black border border-gray-600 rounded text-white"
              />
            </label>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 border border-gray-500 text-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onSave(editName, editInfo);
                  setOpen(false);
                }}
                className="px-4 py-2 border border-emerald-400 text-emerald-300 rounded-lg hover:scale-105 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
