// src/app/(website)/[locale]/project/[slug]/page.tsx
// =============================================================================
// PAGE DÉTAIL PROJET - Portfolio Public
// Direction : Premium épuré — cohérent avec HomeClient
// =============================================================================

import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Github, Globe, Box } from "lucide-react";
import type { Metadata } from "next";


const baseUrl = "https://masmoud-yacoubou.vercel.app";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const isEn = locale === "en";

  const project = await prisma.project.findUnique({ where: { slug } });
  if (!project) return {};

  const title       = isEn && project.title_en ? project.title_en : project.title;
  const description = isEn && project.description_en
    ? project.description_en
    : project.description;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${locale}/project/${slug}`,
      languages: {
        "fr":      `${baseUrl}/fr/project/${slug}`,
        "en":      `${baseUrl}/en/project/${slug}`,
        "x-default": `${baseUrl}/fr/project/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url:    `${baseUrl}/${locale}/project/${slug}`,
      images: project.imageUrl
        ? [{ url: project.imageUrl, width: 1200, height: 630, alt: title }]
        : [`${baseUrl}/og-image.png`],
      type: "article",
    },
    twitter: {
      card:        "summary_large_image",
      title,
      description,
      images:      project.imageUrl ? [project.imageUrl] : [`${baseUrl}/og-image.png`],
    },
  };
}

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

async function getProject(slug: string) {
  const project = await prisma.project.findUnique({ where: { slug } });
  if (!project) notFound();
  return project;
}

export default async function ProjectPage({ params }: Props) {
  const { slug, locale } = await params;

  const activeLocale = (locale === "en" || locale === "fr") ? locale : "fr";
  const isEn = activeLocale === "en";

  const project = await getProject(slug);

  return (
    <main className="min-h-screen bg-white dark:bg-[#080808] text-black dark:text-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-16 pt-28 pb-20">

        {/* Retour */}
        <Link
          href={`/${activeLocale}`}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-blue-600 transition-colors mb-12 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          {isEn ? "Back to works" : "Retour aux projets"}
        </Link>

        {/* En-tête */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12">
          <div className="flex-1">
            <p className="text-xs font-semibold text-blue-600 tracking-wide mb-3">
              {new Date(project.createdAt).getFullYear()}
            </p>
            <h1 className="font-montserrat text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[1.0]">
              {isEn && project.title_en ? project.title_en : project.title}
            </h1>
          </div>
          <div className="h-px w-16 bg-blue-600 self-end mb-2 hidden sm:block" />
        </div>

        {/* Image ou Vidéo principale */}
{project.videoUrl ? (
  <div className="relative aspect-[16/9] w-full overflow-hidden mb-16 border border-slate-100 dark:border-zinc-900">
    <video
      src={project.videoUrl}
      controls
      className="w-full h-full object-cover"
    />
  </div>
) : project.imageUrl ? (
  <div className="relative aspect-[16/9] w-full overflow-hidden mb-16 border border-slate-100 dark:border-zinc-900">
    <Image
      src={project.imageUrl}
      alt={project.title}
      fill
      className="object-cover"
      priority
    />
  </div>
) : null}

        {/* Contenu */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Description */}
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-6 bg-blue-600 flex-shrink-0" />
              <p className="text-xs font-semibold text-blue-600 tracking-wide">
                Description
              </p>
            </div>
            <p className="text-base text-slate-500 dark:text-zinc-400 leading-relaxed">
              {isEn && project.description_en
                ? project.description_en
                : project.description}
            </p>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-10">

            {/* Technologies */}
            {project.technologies.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-5 pb-4 border-b border-slate-100 dark:border-zinc-900">
                  <Box size={13} className="text-blue-600 flex-shrink-0" />
                  <p className="text-xs font-semibold text-slate-500 dark:text-zinc-400 tracking-wide">
                    Stack technique
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-medium px-3 py-1.5 bg-slate-50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 text-slate-600 dark:text-zinc-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Liens */}
            <div className="flex flex-col gap-3">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-full py-3.5 bg-blue-600 text-white text-xs font-bold tracking-wide flex items-center justify-center gap-2.5 overflow-hidden transition-all"
                >
                  <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <Globe size={14} className="relative z-10" />
                  <span className="relative z-10">
                    {isEn ? "Live project" : "Voir le projet"}
                  </span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full py-3.5 border border-slate-200 dark:border-zinc-800 text-xs font-bold tracking-wide flex items-center justify-center gap-2.5 hover:border-blue-600 hover:text-blue-600 transition-all"
                >
                  <Github size={14} />
                  Repository
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* JSON-LD — Données structurées projet */}
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context":    "https://schema.org",
      "@type":       "CreativeWork",
      name:          isEn && project.title_en ? project.title_en : project.title,
      description:   isEn && project.description_en
                       ? project.description_en
                       : project.description,
      url:           `https://masmoud-yacoubou.vercel.app/${activeLocale}/project/${project.slug}`,
      image:         project.imageUrl ?? undefined,
      dateCreated:   project.createdAt,
      dateModified:  project.updatedAt,
      author: {
        "@type": "Person",
        name:    "Masmoud Yacoubou",
        url:     "https://masmoud-yacoubou.vercel.app",
      },
      keywords: project.technologies.join(", "),
      ...(project.link && { sameAs: project.link }),
    }),
  }}
/>
    </main>
  );
}