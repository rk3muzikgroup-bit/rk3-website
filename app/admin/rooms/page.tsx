"use client";

import { useEffect, useState } from "react";

const PASSWORD = "rk3vault350M"; // 🔑 admin password

type Room = {
  name: string;
  slug: string;
  color: string;
  overlay: string;
  video?: string;
  audio?: string;
  description?: string;
};

type Backup = {
  folder: string;
  files: string[];
};

export default function AdminRoomsPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [rooms, setRooms] = useState<Room[]>([]);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [backups, setBackups] = useState<Backup[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // fetch rooms
  const loadRooms = async () => {
    const res = await fetch("/api/vaultRooms");
    const data = await res.json();
    setRooms(data);
  };

  // fetch backups
  const loadBackups = async () => {
    const res = await fetch("/api/backups");
    const data = await res.json();
    setBackups(data);
  };

  useEffect(() => {
    loadRooms();
    loadBackups();
    if (localStorage.getItem("vaultAuth") === "true") setLoggedIn(true);
  }, []);

  const handleLogin = () => {
    if (password === PASSWORD) {
      setLoggedIn(true);
      localStorage.setItem("vaultAuth", "true");
    } else {
      alert("Wrong password");
    }
  };

  const handleSave = async () => {
    if (!editingRoom) return;
    await fetch("/api/vaultRooms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingRoom),
    });
    setEditingRoom(null);
    loadRooms();
  };

  const handleDelete = async (slug: string) => {
    await fetch("/api/vaultRooms", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    });
    loadRooms();
  };

  const handleUpload = async (
    file: File,
    type: "video" | "audio"
  ): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);

    let res = await fetch("/api/upload", { method: "POST", body: formData });
    let data = await res.json();

    if (data.exists) {
      const confirmReplace = window.confirm(
        `⚠️ File "${file.name}" already exists. Replace it?`
      );
      if (confirmReplace) {
        const overwriteForm = new FormData();
        overwriteForm.append("file", file);
        overwriteForm.append("overwrite", "true");

        res = await fetch("/api/upload", {
          method: "POST",
          body: overwriteForm,
        });
        data = await res.json();
      } else {
        return null;
      }
    }

    if (data.path) {
      if (type === "video") {
        setEditingRoom({ ...(editingRoom || ({} as Room)), video: data.path });
      } else {
        setEditingRoom({ ...(editingRoom || ({} as Room)), audio: data.path });
      }
      alert("✅ File uploaded!");
      return data.path;
    }

    return null;
  };

  if (!loggedIn) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center text-white">
        <h1 className="text-2xl mb-4">🔐 Vault Admin Login</h1>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 text-black rounded"
        />
        <button
          onClick={handleLogin}
          className="mt-4 px-6 py-2 bg-green-600 rounded"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-6">🛠 Vault Rooms Admin</h1>

      {/* Existing Rooms */}
      <h2 className="text-xl mb-2">Existing Rooms</h2>
      <ul className="mb-6 space-y-2">
        {rooms.map((r) => (
          <li
            key={r.slug}
            className="bg-white/10 p-3 rounded flex justify-between items-center"
          >
            <span>
              {r.name} — <code>{r.slug}</code>
            </span>
            <div className="space-x-2">
              <button
                onClick={() => setEditingRoom(r)}
                className="px-3 py-1 bg-blue-600 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(r.slug)}
                className="px-3 py-1 bg-red-600 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Room Form */}
      <h2 className="text-xl mb-2">
        {editingRoom ? "Edit Room" : "Add New Room"}
      </h2>
      <div className="space-y-2 max-w-lg">
        <input
          type="text"
          placeholder="Name"
          value={editingRoom?.name || ""}
          onChange={(e) =>
            setEditingRoom({
              ...(editingRoom || ({} as Room)),
              name: e.target.value,
            })
          }
          className="w-full p-2 text-black rounded"
        />
        <input
          type="text"
          placeholder="Slug"
          value={editingRoom?.slug || ""}
          onChange={(e) =>
            setEditingRoom({
              ...(editingRoom || ({} as Room)),
              slug: e.target.value,
            })
          }
          className="w-full p-2 text-black rounded"
        />
        <input
          type="text"
          placeholder="Color (tailwind)"
          value={editingRoom?.color || ""}
          onChange={(e) =>
            setEditingRoom({
              ...(editingRoom || ({} as Room)),
              color: e.target.value,
            })
          }
          className="w-full p-2 text-black rounded"
        />
        <input
          type="text"
          placeholder="Overlay"
          value={editingRoom?.overlay || ""}
          onChange={(e) =>
            setEditingRoom({
              ...(editingRoom || ({} as Room)),
              overlay: e.target.value,
            })
          }
          className="w-full p-2 text-black rounded"
        />

        {/* Upload fields */}
        <input
          type="file"
          accept="video/*"
          onChange={(e) => {
            if (e.target.files?.[0]) handleUpload(e.target.files[0], "video");
          }}
          className="w-full p-2 bg-white text-black rounded"
        />
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => {
            if (e.target.files?.[0]) handleUpload(e.target.files[0], "audio");
          }}
          className="w-full p-2 bg-white text-black rounded"
        />

        <textarea
          placeholder="Description"
          value={editingRoom?.description || ""}
          onChange={(e) =>
            setEditingRoom({
              ...(editingRoom || ({} as Room)),
              description: e.target.value,
            })
          }
          className="w-full p-2 text-black rounded"
        />
        <button
          onClick={handleSave}
          className="mt-4 px-6 py-2 bg-green-600 rounded"
        >
          Save Room
        </button>
      </div>

      {/* Backups Section */}
      <h2 className="text-xl mt-10 mb-2">📦 File Backups</h2>
      {backups.length === 0 && (
        <p className="text-white/60">No backups found</p>
      )}

      <ul className="space-y-2">
        {backups.map((b) => (
          <li key={b.folder} className="bg-white/10 p-4 rounded">
            <h3 className="font-bold mb-2">{b.folder}</h3>
            <ul className="space-y-1">
              {b.files.map((file) => (
                <li
                  key={file}
                  className="flex justify-between items-center bg-black/30 p-2 rounded"
                >
                  <span className="text-sm">{file}</span>
                  <div className="space-x-2">
                    <button
                      onClick={() =>
                        setPreviewUrl(`${b.folder}/${file}`)
                      }
                      className="px-3 py-1 bg-blue-600 rounded text-sm"
                    >
                      Preview
                    </button>
                    <button
                      onClick={async () => {
                        const res = await fetch("/api/backups", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ folder: b.folder, filename: file }),
                        });
                        const data = await res.json();
                        if (data.restored) {
                          alert(`✅ Restored ${data.file}`);
                          loadBackups();
                        }
                      }}
                      className="px-3 py-1 bg-yellow-600 rounded text-sm"
                    >
                      Restore
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      {/* Preview Modal */}
      {previewUrl && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded max-w-2xl w-full">
            <h3 className="text-lg font-bold mb-4">Preview</h3>
            {previewUrl.endsWith(".mp3") ||
            previewUrl.endsWith(".wav") ||
            previewUrl.endsWith(".ogg") ? (
              <audio controls className="w-full" src={previewUrl}></audio>
            ) : (
              <video controls className="w-full" src={previewUrl}></video>
            )}
            <button
              onClick={() => setPreviewUrl(null)}
              className="mt-4 px-4 py-2 bg-red-600 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
