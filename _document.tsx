import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
cat > src/pages/music.js <<'EOF'
export default function Music() {
  return (
    <div>
      <h1>Music Vault</h1>
      <p>Neo-soul, spoken word, street anthems, and healing frequencies. Coming soon.</p>
    </div>
  )
}
EOF

cat > src/pages/avatars.js <<'EOF'
export default function Avatars() {
  return (
    <div>
      <h1>Avatars</h1>
      <p>Meet the RK3 multiverse — bios and samples coming soon.</p>
    </div>
  )
}
EOF

cat > src/pages/live.js <<'EOF'
export default function Live() {
  return (
    <div>
      <h1>Live DJ</h1>
      <p>RK3 Lives begin soon. Stay tuned.</p>
    </div>
  )
}
EOF

cat > src/pages/membership.js <<'EOF'
export default function Membership() {
  return (
    <div>
      <h1>Membership</h1>
      <p>Join the RK3 World. Membership details coming soon.</p>
    </div>
  )
}
EOF

cat > src/pages/vault.js <<'EOF'
export default function Vault() {
  return (
    <div>
      <h1>The Vault</h1>
      <p>Type it. Release it. Gone forever. Vault ritual coming soon.</p>
    </div>
  )
}
EOF

cat > src/pages/about.js <<'EOF'
export default function About() {
  return (
    <div>
      <h1>About RK3</h1>
      <p>RK3 Music Group is an independent music and media company focused on publishing, digital content, and creative services.</p>
    </div>
  )
}
EOF

cat > src/pages/contact.js <<'EOF'
export default function Contact() {
  return (
    <div>
      <h1>Contact</h1>
      <p>Email: RK3MusicGroup@gmail.com</p>
      <p>TikTok: RICHKIDDDAPOET@TIKTOK.COM</p>
    </div>
  )
}
EOF

cat > src/pages/terms.js <<'EOF'
export default function Terms() {
  return (
    <div>
      <h1>Terms</h1>
      <p>Coming soon.</p>
    </div>
  )
}
EOF

cat > src/pages/privacy.js <<'EOF'
export default function Privacy() {
  return (
    <div>
      <h1>Privacy</h1>
      <p>Coming soon.</p>
    </div>
  )
}
EOF
