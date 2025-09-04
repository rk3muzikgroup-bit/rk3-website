export default function InsideVaultPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white flex flex-col items-center justify-center p-12">
      <h1 className="text-6xl font-extrabold mb-8">🔮 Inside the Vault</h1>
      <p className="text-xl max-w-3xl text-gray-300 text-center mb-12">
        Welcome to the RK3 World. Choose your journey:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl text-center">
        <div className="p-8 bg-white/5 rounded-2xl shadow-lg hover:bg-white/10 transition">
          <h2 className="text-2xl font-bold mb-4">🎶 Music</h2>
          <p>Access the catalog, DJ sets, and exclusive tracks.</p>
        </div>

        <div className="p-8 bg-white/5 rounded-2xl shadow-lg hover:bg-white/10 transition">
          <h2 className="text-2xl font-bold mb-4">📚 Books</h2>
          <p>Knowledge, philosophy, and written works.</p>
        </div>

        <div className="p-8 bg-white/5 rounded-2xl shadow-lg hover:bg-white/10 transition">
          <h2 className="text-2xl font-bold mb-4">🧘🏽 Meditation</h2>
          <p>Guided healing, frequencies, and spiritual tools.</p>
        </div>

        <div className="p-8 bg-white/5 rounded-2xl shadow-lg hover:bg-white/10 transition">
          <h2 className="text-2xl font-bold mb-4">♟️ Chess</h2>
          <p>Strategize while vibing to curated playlists.</p>
        </div>

        <div className="p-8 bg-white/5 rounded-2xl shadow-lg hover:bg-white/10 transition">
          <h2 className="text-2xl font-bold mb-4">🔥 Confessions</h2>
          <p>Write, reflect, bow up — or burn and delete forever.</p>
        </div>

        <div className="p-8 bg-white/5 rounded-2xl shadow-lg hover:bg-white/10 transition">
          <h2 className="text-2xl font-bold mb-4">👁️ Guardians</h2>
          <p>Meet the RK3 avatars that guide your journey.</p>
        </div>
      </div>
    </div>
  );
}
