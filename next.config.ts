import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [95],   // ← Qualité maximale
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port:     "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;