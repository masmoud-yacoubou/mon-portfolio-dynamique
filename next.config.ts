import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        // ← Ajouter Cloudinary
        protocol: "https",
        hostname: "res.cloudinary.com",
        port:     "",
        pathname: "/**",
      },
      {
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