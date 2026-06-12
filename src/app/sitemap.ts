// src/app/sitemap.ts
import { MetadataRoute } from "next";
import prisma from "@/lib/prisma";
import { getLanguageAlternates, getLocalizedUrl, siteConfig } from "@/lib/site";

const locales = siteConfig.locales;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: getLocalizedUrl(locale),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1.0,
    alternates: {
      languages: getLanguageAlternates(),
    },
  }));

  let projectRoutes: MetadataRoute.Sitemap = [];

  try {
    const projects = await prisma.project.findMany({
      select: { slug: true, updatedAt: true },
    });

    projectRoutes = projects.flatMap((project) =>
      locales.map((locale) => ({
        url: getLocalizedUrl(locale, `project/${project.slug}`),
        lastModified: project.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.8,
        alternates: {
          languages: getLanguageAlternates(`project/${project.slug}`),
        },
      }))
    );
  } catch {
    console.warn("[sitemap] Impossible de récupérer les projets");
  }

  return [...staticRoutes, ...projectRoutes];
}
