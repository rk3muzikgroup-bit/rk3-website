import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Typed routes (Next 16+)
  typedRoutes: true,

  // Allow future media expansion
  images: {
    remotePatterns: [],
  },

  // Production safety
  poweredByHeader: false,
};

export default nextConfig;
