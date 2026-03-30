// src/app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard/", "/api/"],  // Cache le dashboard et les API routes
      },
    ],
    sitemap: "https://masmoud-yacoubou.vercel.app/sitemap.xml",
  };
}