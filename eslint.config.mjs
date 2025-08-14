import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* FAMILY GREETING BANNER */}
      <div className="bg-yellow-400/90 text-black text-center py-2 font-bold text-sm tracking-wide">
        🎉 DS in the building • RK3 in the building • Avatars in the building • Welcome Family! 🎉
      </div>

      {/* Page Content */}
      <Component {...pageProps} />
    </>
  )
}

export default MyApp


