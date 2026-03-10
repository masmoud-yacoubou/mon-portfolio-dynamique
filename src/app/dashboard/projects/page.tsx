// src/app/dashboard/projects/page.tsx
// =============================================================================
// PAGE - Liste des Projets
// Description : Affiche tous les projets avec options d'édition et suppression.
//               Données chargées côté serveur (SSR).
// =============================================================================

import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { Pencil, Plus, ExternalLink, Github } from "lucide-react";
import DeleteButton from "./_components/DeleteButton";
import { a } from "framer-motion/client";

/**
 * Récupère tous les projets depuis la base de données
 */
async function getProjects() {
  try {
    return await prisma.project.findMany({
      orderBy: { order: "asc" },
    });
  } catch {
    notFound();
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-8">

      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-zinc-500 font-medium mt-1">
            {projects?.length ?? 0} projet{(projects?.length ?? 0) > 1 ? "s" : ""} au total
          </p>
        </div>
        <Link
          href="/dashboard/projects/new"
          className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-black dark:hover:bg-white dark:hover:text-black transition-all duration-200"
        >
          <Plus size={14} />
          Nouveau projet
        </Link>
      </div>

      {/* Tableau des projets */}
      {!projects || projects.length === 0 ? (

        /* État vide */
        <div className="border border-dashed border-slate-200 dark:border-zinc-800 p-16 text-center">
          <div className="text-slate-300 dark:text-zinc-700 font-black text-6xl mb-4">0</div>
          <p className="text-sm font-bold text-slate-400 dark:text-zinc-600 uppercase tracking-widest mb-6">
            Aucun projet pour l&apos;instant
          </p>
          <Link
            href="/dashboard/projects/new"
            className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all"
          >
            <Plus size={14} />
            Créer le premier projet
          </Link>
        </div>

      ) : (

        /* Liste des projets */
        <div className="border border-slate-100 dark:border-zinc-900 divide-y divide-slate-100 dark:divide-zinc-900">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between px-6 py-5 hover:bg-slate-50 dark:hover:bg-zinc-900/50 transition-colors group"
            >
              {/* Infos projet */}
              <div className="flex items-center gap-5 flex-1 min-w-0">

                {/* Indicateur featured */}
                <div className={`w-1.5 h-8 flex-shrink-0 ${project.featured ? "bg-blue-600" : "bg-slate-200 dark:bg-zinc-800"}`} />

                <div className="min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-montserrat font-black text-sm uppercase tracking-tight text-black dark:text-white truncate">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="text-[8px] font-black uppercase tracking-widest bg-blue-600/10 text-blue-600 px-2 py-0.5 flex-shrink-0">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[8px] font-bold uppercase tracking-widest border border-slate-200 dark:border-zinc-800 px-2 py-0.5 text-slate-500 dark:text-zinc-500"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-[8px] font-bold text-slate-400 dark:text-zinc-600">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0 ml-4">

                {/* Lien live — externe donc <a> correct */}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors"
                    title="Voir le projet"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}

                {/* Lien GitHub — externe donc <a> correct */}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-black dark:hover:text-white transition-colors"
                    title="Voir sur GitHub"
                  >
                
                    <Github size={14} />
                  </a>
                )}

                {/* Modifier — interne donc <Link> */}
                <Link
                  href={`/dashboard/projects/${project.id}/edit`}
                  className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors"
                  title="Modifier"
                >
                  <Pencil size={14} />
                </Link>

                {/* Supprimer */}
                <DeleteButton id={project.id} name={project.title} type="project" />

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}