// src/app/(website)/[locale]/project/[slug]/page.tsx
// =============================================================================
// PAGE DÉTAIL PROJET - Portfolio Public
// Description : Affiche le détail d'un projet depuis Prisma (remplace Sanity).
// =============================================================================

import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Github, Globe, Box } from "lucide-react";

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

/**
 * Récupère un projet par son slug
 */
async function getProject(slug: string) {
  const project = await prisma.project.findUnique({
    where: { slug },
  });
  if (!project) notFound();
  return project;
}

export default async function ProjectPage({ params }: Props) {
  const { slug, locale } = await params;

  // Sécurité locale
  const activeLocale = (locale === "en" || locale === "fr") ? locale : "fr";
  const isEn = activeLocale === "en";

  const project = await getProject(slug);

  return (
    <main className="min-h-screen bg-white dark:bg-[#020202] transition-colors duration-500">

      {/* HEADER DE LA PAGE */}
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-12">

        {/* Retour */}
        <Link
          href={`/${activeLocale}`}
          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-blue-600 transition-colors mb-12 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          {isEn ? "Back to works" : "Retour aux projets"}
        </Link>

        {/* Titre */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-8xl font-black font-heading leading-tight uppercase tracking-tighter italic dark:text-white">
              {isEn && project.title_en ? project.title_en : project.title}
            </h1>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-4xl font-black text-slate-100 dark:text-zinc-900 mb-2">
              {new Date(project.createdAt).getFullYear()}
            </span>
            <div className="h-1 w-20 bg-blue-600" />
          </div>
        </div>

        {/* Image principale */}
        {project.imageUrl && (
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[2.5rem] mb-20 shadow-2xl border border-slate-200 dark:border-zinc-800">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Contenu & Infos */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Description (8 colonnes) */}
          <div className="lg:col-span-8">
            <h2 className="text-sm font-black tracking-[0.4em] text-blue-600 uppercase mb-8 italic">
              / Description
            </h2>
            <p className="text-slate-500 dark:text-zinc-400 leading-relaxed text-lg font-medium">
              {isEn && project.description_en
                ? project.description_en
                : project.description}
            </p>
          </div>

          {/* Sidebar Info (4 colonnes) */}
          <div className="lg:col-span-4 space-y-12">

            {/* Technologies */}
            {project.technologies.length > 0 && (
              <div>
                <h3 className="flex items-center gap-2 font-black uppercase tracking-widest text-blue-600 text-[10px] mb-6 italic border-b border-slate-100 dark:border-zinc-900 pb-4">
                  <Box size={14} /> Stack Technique
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-slate-50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-xl text-[10px] font-black uppercase tracking-widest dark:text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Liens du projet */}
            <div className="flex flex-col gap-3">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
                >
                  <Globe size={16} />
                  {isEn ? "Live Project" : "Voir le projet"}
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 border border-slate-200 dark:border-zinc-800 dark:text-white rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-zinc-900 transition-all"
                >
                  <Github size={16} />
                  Repository
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}