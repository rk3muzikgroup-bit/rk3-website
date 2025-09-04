import Head from 'next/head'

export default function CelestialTemple() {
  return (
    <>
      <Head>
        <title>Celestial Temple</title>
        <meta name="description" content="Step into the Celestial Temple of RK3" />
      </Head>

      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-blue-900 to-black text-white">
        {/* Header */}
        <h1 className="text-6xl font-extrabold tracking-wide text-yellow-300 drop-shadow-lg">
          🛕 Celestial Temple 🛕
        </h1>
        <p className="mt-4 text-lg text-blue-200 text-center max-w-2xl">
          This is the sacred chamber where cosmic wisdom, street truth, and soul healing 
          rise together under the RK3 banner. Light meets sound, sound meets spirit. 
        </p>

        {/* Divider */}
        <div className="w-32 h-1 bg-yellow-300 my-8"></div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <a
            href="/"
            className="px-6 py-3 bg-yellow-300 text-black font-semibold rounded-xl hover:bg-yellow-200 transition"
          >
            Return to Command Base
          </a>
          <a
            href="/cosmic-portal"
            className="px-6 py-3 bg-purple-700 text-white font-semibold rounded-xl hover:bg-purple-600 transition"
          >
            Enter Cosmic Portal
          </a>
          <a
            href="/mystic-gate"
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-500 transition"
          >
            Enter Mystic Gate
          </a>
        </div>
      </main>
    </>
  )
}

