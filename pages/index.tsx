// SAFE MODE: no TypeScript React types, just plain styles
const btnStyle = {
  background: '#facc15', // yellow
  color: '#000',
  padding: '0.6rem 1.2rem',
  borderRadius: '12px',
  textDecoration: 'none',
  fontWeight: '700'
};

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: 'url("/images/cosmic-bg.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: '#fff',
      padding: '4rem 1rem'
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        background: 'rgba(0,0,0,0.6)',
        borderRadius: '20px',
        padding: '2rem',
        backdropFilter: 'blur(6px)'
      }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '1rem' }}>
          Street • Soul • Spirit
        </h1>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '2rem' }}>
          Welcome to <strong>RKS3.com</strong> — the portal for truth, healing, and next-level vibes.
          Dive into the Music Vault, meet the Avatars, catch the Live DJ sets, and release
          what no longer serves you in The Vault.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          <a href="/music" style={btnStyle}>🎵 Music Vault</a>
          <a href="/avatars" style={btnStyle}>🌀 Meet the Avatars</a>
          <a href="/live" style={btnStyle}>🎧 Live DJ</a>
          <a href="/vault" style={btnStyle}>🔓 The Vault</a>
          <a href="/membership" style={btnStyle}>💎 Join Membership</a>
        </div>
      </div>
    </div>
  );
}
