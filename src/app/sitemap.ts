// src/app/sitemap.ts
import { MetadataRoute } from "next";
import prisma from "@/lib/prisma";

const baseUrl = "https://masmoud-yacoubou.vercel.app";
const locales = ["fr", "en"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  // ---- Pages statiques ----
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url:             `${baseUrl}/fr`,
      lastModified:    new Date(),
      changeFrequency: "weekly",
      priority:        1.0,
      alternates: {
        languages: {
          fr: `${baseUrl}/fr`,
          en: `${baseUrl}/en`,
        },
      },
    },
    {
      url:             `${baseUrl}/en`,
      lastModified:    new Date(),
      changeFrequency: "weekly",
      priority:        1.0,
      alternates: {
        languages: {
          fr: `${baseUrl}/fr`,
          en: `${baseUrl}/en`,
        },
      },
    },
  ];

  // ---- Pages projets dynamiques ----
  let projectRoutes: MetadataRoute.Sitemap = [];

  try {
    const projects = await prisma.project.findMany({
      select: { slug: true, updatedAt: true },
    });

    projectRoutes = projects.flatMap((project) =>
      locales.map((locale) => ({
        url:             `${baseUrl}/${locale}/project/${project.slug}`,
        lastModified:    project.updatedAt,
        changeFrequency: "monthly" as const,
        priority:        0.8,
        alternates: {
          languages: {
            fr: `${baseUrl}/fr/project/${project.slug}`,
            en: `${baseUrl}/en/project/${project.slug}`,
          },
        },
      }))
    );
  } catch {
    // Si Prisma échoue au build, on continue sans les projets
    console.warn("[sitemap] Impossible de récupérer les projets");
  }

  return [...staticRoutes, ...projectRoutes];
}