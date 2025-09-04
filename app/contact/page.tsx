export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-12">
      <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
      <p className="max-w-2xl text-lg text-gray-300 text-center mb-4">
        For bookings, collaborations, or inquiries, reach out to us anytime.
      </p>
      <a
        href="mailto:RK3MusicGroup@gmail.com"
        className="px-6 py-3 bg-gold-400 text-black rounded-2xl text-lg font-semibold hover:bg-gold-300 transition"
      >
        Email: RK3MusicGroup@gmail.com
      </a>
    </div>
  );
}
