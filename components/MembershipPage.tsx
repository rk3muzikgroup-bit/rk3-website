export default function MembershipPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-12">
      <h1 className="text-4xl font-bold mb-4">Membership</h1>
      <p className="max-w-2xl text-center text-gray-300 mb-8">
        Join the RK3 family and unlock exclusive music, DJ sets, and the immersive Spaceship Ride.
      </p>
      <ul className="space-y-6 text-center">
        <li>✨ Silver – $5/month</li>
        <li>🔥 Gold – $10/month</li>
        <li>🚀 Platinum – $25/month (Full RK3 World + Vault Access)</li>
      </ul>
    </div>
  );
}
