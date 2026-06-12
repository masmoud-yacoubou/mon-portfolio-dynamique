// src/app/(website)/[locale]/project/[slug]/page.tsx

import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github, Globe, Box } from "lucide-react";
import type { Metadata } from "next";
import {
  getLanguageAlternates,
  getLocaleMeta,
  getLocalizedUrl,
  isValidLocale,
  siteConfig,
} from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  if (!isValidLocale(locale)) return {};

  const isEn = locale === "en";
  const localeMeta = getLocaleMeta(locale);

  const project = await prisma.project.findUnique({ where: { slug } });
  if (!project) return {};

  const title = isEn && project.title_en ? project.title_en : project.title;
  const description =
    isEn && project.description_en ? project.description_en : project.description;

  return {
    title,
    description,
    alternates: {
      canonical: getLocalizedUrl(locale, `project/${slug}`),
      languages: getLanguageAlternates(`project/${slug}`),
    },
    openGraph: {
      title,
      description,
      url: getLocalizedUrl(locale, `project/${slug}`),
      locale: localeMeta.ogLocale,
      images: project.imageUrl
        ? [{ url: project.imageUrl, width: 1200, height: 630, alt: title }]
        : [{ url: `${siteConfig.url}/og-image.png`, width: 1200, height: 630, alt: title }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: project.imageUrl ? [project.imageUrl] : [`${siteConfig.url}/og-image.png`],
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
  if (!isValidLocale(locale)) notFound();

  const isEn = locale === "en";
  const project = await getProject(slug);

  const title = isEn && project.title_en ? project.title_en : project.title;
  const description =
    isEn && project.description_en ? project.description_en : project.description;

  return (
    <main className="min-h-screen bg-[#f7f3ea] text-slate-950 dark:bg-[#09090b] dark:text-white">
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-28 sm:px-8 sm:pt-32 lg:px-14">
        <Link
          href={`/${locale}/projects`}
          className="group mb-10 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-300"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
          {isEn ? "Back to archive" : "Retour aux projets"}
        </Link>

        <header className="mb-10 border-b border-slate-300/70 pb-8 dark:border-white/10">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-[0.22em] text-blue-600 dark:text-blue-300">
              {project.featured ? (isEn ? "Featured project" : "Projet sélectionné") : "Project"}
            </span>

            <span className="h-px w-8 bg-slate-300 dark:bg-white/15" />

            <span className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-500 dark:text-slate-500">
              {new Date(project.createdAt).getFullYear()}
            </span>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_0.42fr] lg:items-end">
            <h1 className="font-montserrat text-4xl font-black uppercase leading-[0.95] tracking-[-0.065em] sm:text-6xl lg:text-7xl">
              {title}
            </h1>

            <p className="max-w-md text-sm leading-7 text-slate-600 dark:text-slate-300">
              {description}
            </p>
          </div>
        </header>

        <section className="mb-12">
          {project.videoUrl ? (
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[24px] border border-slate-300/70 bg-slate-200 shadow-[0_28px_80px_-62px_rgba(15,23,42,0.45)] dark:border-white/10 dark:bg-white/[0.04]">
              <video
                suppressHydrationWarning
                src={project.videoUrl}
                controls
                className="h-full w-full object-cover"
              />
            </div>
          ) : project.imageUrl ? (
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[24px] border border-slate-300/70 bg-slate-200 shadow-[0_28px_80px_-62px_rgba(15,23,42,0.45)] dark:border-white/10 dark:bg-white/[0.04]">
              <Image
                src={project.imageUrl}
                alt={title}
                fill
                className="object-cover"
                priority
                quality={90}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1100px"
              />
            </div>
          ) : null}
        </section>

        <section className="grid gap-10 lg:grid-cols-[1fr_330px] lg:gap-14">
          <article>
            <div className="mb-5 flex items-center gap-3">
              <div className="h-px w-8 bg-blue-600 dark:bg-blue-300" />
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-blue-600 dark:text-blue-300">
                {isEn ? "Overview" : "Description"}
              </p>
            </div>

            <div className="max-w-3xl space-y-5 text-sm leading-8 text-slate-600 dark:text-slate-300">
              {description.split(/\n+/).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>

          <aside className="space-y-8">
            {project.technologies.length > 0 && (
              <div className="border-t border-slate-300/70 pt-6 dark:border-white/10">
                <div className="mb-5 flex items-center gap-2">
                  <Box size={14} className="text-blue-600 dark:text-blue-300" />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                    Stack technique
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-slate-300/80 bg-white/35 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3 border-t border-slate-300/70 pt-6 dark:border-white/10">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-[8px] bg-blue-600 px-5 py-3.5 text-[10px] font-black uppercase tracking-[0.18em] text-white transition-all duration-500 hover:bg-slate-950 dark:hover:bg-blue-300 dark:hover:text-slate-950"
                >
                  <Globe size={14} />
                  {isEn ? "Live project" : "Voir le projet"}
                  <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-[8px] border border-slate-300/90 bg-white/35 px-5 py-3.5 text-[10px] font-black uppercase tracking-[0.18em] text-slate-800 transition-all duration-500 hover:border-blue-600 hover:text-blue-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-200 dark:hover:border-blue-300 dark:hover:text-blue-300"
                >
                  <Github size={14} />
                  Repository
                  <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}
            </div>
          </aside>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: title,
            description,
            url: getLocalizedUrl(locale, `project/${project.slug}`),
            image: project.imageUrl ?? undefined,
            dateCreated: project.createdAt,
            dateModified: project.updatedAt,
            author: {
              "@type": "Person",
              name: siteConfig.name,
              url: siteConfig.url,
            },
            keywords: project.technologies.join(", "),
            ...(project.link && { sameAs: project.link }),
          }),
        }}
      />
    </main>
  );
}