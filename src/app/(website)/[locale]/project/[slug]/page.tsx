/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Github, Globe, Box } from "lucide-react";

export default async function ProjectPage({ params }: any) {
  const { slug, locale } = await params;
  
  const project = await client.fetch(`*[_type == "project" && slug.current == $slug][0]{
    title,
    description,
    "imageUrl": image.asset->url,
    technologies,
    demoUrl,
    githubUrl,
    year
  }`, { slug });

  if (!project) return (
    <div className="h-screen flex items-center justify-center font-black uppercase tracking-widest italic">
      Project not found
    </div>
  );

  return (
    <main className="min-h-screen bg-white dark:bg-[#020202] transition-colors duration-500">
      {/* HEADER DE LA PAGE */}
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-12">
        <Link 
          href={`/${locale}`} 
          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-blue-600 transition-colors mb-12 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          {locale === 'en' ? 'Back to works' : 'Retour aux projets'}
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-8xl font-black font-heading leading-tight uppercase tracking-tighter italic dark:text-white">
              {project.title}
            </h1>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-4xl font-black text-slate-100 dark:text-zinc-900 mb-2">
              {project.year || "2026"}
            </span>
            <div className="h-1 w-20 bg-blue-600" />
          </div>
        </div>

        {/* IMAGE PRINCIPALE STYLE PREMIUM */}
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[2.5rem] mb-20 shadow-2xl border border-slate-200 dark:border-zinc-800">
          {project.imageUrl && (
            <Image 
              src={project.imageUrl} 
              alt={project.title} 
              fill 
              className="object-cover"
              priority 
            />
          )}
        </div>

        {/* CONTENU & INFOS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Texte de description (8 colonnes) */}
          <div className="lg:col-span-8">
            <h2 className="text-sm font-black tracking-[0.4em] text-blue-600 uppercase mb-8 italic">/ Description</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none prose-p:leading-relaxed prose-p:text-slate-500 dark:prose-p:text-zinc-400">
              <PortableText value={project.description} />
            </div>
          </div>
          
          {/* Sidebar Info (4 colonnes) */}
          <div className="lg:col-span-4 space-y-12">
            {/* Technologies */}
            <div>
              <h3 className="flex items-center gap-2 font-black uppercase tracking-widest text-blue-600 text-[10px] mb-6 italic border-b border-slate-100 dark:border-zinc-900 pb-4">
                <Box size={14} /> Stack Technique
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((t: string) => (
                  <span key={t} className="px-4 py-2 bg-slate-50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-xl text-[10px] font-black uppercase tracking-widest dark:text-zinc-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Liens du projet */}
            <div className="flex flex-col gap-3">
              {project.demoUrl && (
                <Link 
                  href={project.demoUrl} 
                  target="_blank"
                  className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
                >
                  <Globe size={16} /> Live Project
                </Link>
              )}
              {project.githubUrl && (
                <Link 
                  href={project.githubUrl} 
                  target="_blank"
                  className="w-full py-4 border border-slate-200 dark:border-zinc-800 dark:text-white rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-zinc-900 transition-all"
                >
                  <Github size={16} /> Repository
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}