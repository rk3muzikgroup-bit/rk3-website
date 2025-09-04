export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-12">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <p className="text-lg text-gray-300 mb-6">We’d love to connect with you.</p>
      <p className="mb-2">📧 Email: 
        <a href="mailto:RK3MusicGroup@gmail.com" className="text-gold-400 hover:text-gold-300 ml-2">
          RK3MusicGroup@gmail.com
        </a>
      </p>
      <p>🎵 TikTok: <span className="text-gold-400">@RichKidddapoet</span></p>
    </div>
  );
}
