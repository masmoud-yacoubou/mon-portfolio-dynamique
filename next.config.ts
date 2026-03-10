import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // ← Ajouter Cloudinary
        protocol: "https",
        hostname: "res.cloudinary.com",
        port:     "",
        pathname: "/**",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;