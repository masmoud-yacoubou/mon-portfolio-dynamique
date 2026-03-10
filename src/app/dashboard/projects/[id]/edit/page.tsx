// src/app/dashboard/projects/[id]/edit/page.tsx
// =============================================================================
// PAGE - Modifier un projet existant
// Description : Formulaire pré-rempli avec les données du projet.
//               Récupère le projet côté serveur puis hydrate le formulaire client.
// =============================================================================

import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import EditProjectForm from "./_components/EditProjectForm";
import Link from "next/link";

/**
 * Récupère un projet par son id
 */
async function getProject(id: string) {
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) notFound();
  return project;
}

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);

  return (
    <div className="max-w-3xl space-y-8">
      {/* Fil d'Ariane */}
      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-600">
        <Link href="/dashboard/projects" className="hover:text-blue-600 transition-colors">
  Projets
</Link>
        <span>/</span>
        <span className="text-black dark:text-white truncate">{project.title}</span>
      </div>

      {/* Formulaire client pré-rempli */}
      <EditProjectForm project={project} />
    </div>
  );
}