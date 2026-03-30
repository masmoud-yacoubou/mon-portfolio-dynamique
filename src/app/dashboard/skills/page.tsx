// src/app/dashboard/skills/page.tsx
// =============================================================================
// PAGE - Liste des Compétences
// Description : Affiche toutes les compétences avec options d'édition/suppression.
//               Données chargées côté serveur (SSR).
// =============================================================================
export const dynamic = "force-dynamic";


import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { Pencil, Plus } from "lucide-react";
import DeleteButton from "../projects/_components/DeleteButton";

/**
 * Récupère toutes les compétences depuis la base de données
 */
async function getSkills() {
  try {
    return await prisma.skill.findMany({
      orderBy: { order: "asc" },
    });
  } catch {
    notFound();
  }
}

export default async function SkillsPage() {
  const skills = await getSkills();

  // Groupe les compétences par catégorie
  const grouped = skills?.reduce(
    (acc, skill) => {
      const cat = skill.category;
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(skill);
      return acc;
    },
    {} as Record<string, typeof skills>
  );

  return (
    <div className="space-y-8">

      {/* En-tête */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500 dark:text-zinc-500 font-medium">
          {skills?.length ?? 0} compétence{(skills?.length ?? 0) > 1 ? "s" : ""} au total
        </p>
        <Link
          href="/dashboard/skills/new"
          className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-black dark:hover:bg-white dark:hover:text-black transition-all duration-200"
        >
          <Plus size={14} />
          Nouvelle compétence
        </Link>
      </div>

      {/* État vide */}
      {!skills || skills.length === 0 ? (
        <div className="border border-dashed border-slate-200 dark:border-zinc-800 p-16 text-center">
          <div className="text-slate-300 dark:text-zinc-700 font-black text-6xl mb-4">0</div>
          <p className="text-sm font-bold text-slate-400 dark:text-zinc-600 uppercase tracking-widest mb-6">
            Aucune compétence pour l&apos;instant
          </p>
          <Link
            href="/dashboard/skills/new"
            className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all"
          >
            <Plus size={14} />
            Ajouter la première compétence
          </Link>
        </div>

      ) : (

        /* Compétences groupées par catégorie */
        <div className="space-y-8">
          {grouped && Object.entries(grouped).map(([category, categorySkills]) => (
            <div key={category}>

              {/* Titre catégorie */}
              <div className="flex items-center gap-4 mb-4">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-600">
                  {category}
                </h3>
                <div className="flex-1 h-[1px] bg-slate-100 dark:bg-zinc-900" />
                <span className="text-[9px] font-bold text-slate-400 dark:text-zinc-600">
                  {categorySkills.length} skill{(categorySkills?.length ?? 0) > 1 ? "s" : ""}
                </span>
              </div>

              {/* Liste des compétences de la catégorie */}
              <div className="border border-slate-100 dark:border-zinc-900 divide-y divide-slate-100 dark:divide-zinc-900">
                {categorySkills?.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 dark:hover:bg-zinc-900/50 transition-colors group"
                  >
                    {/* Infos skill */}
                    <div className="flex items-center gap-6 flex-1">

                      {/* Nom */}
                      <h4 className="font-montserrat font-black text-sm uppercase tracking-tight text-black dark:text-white w-40">
                        {skill.name}
                      </h4>

                      {/* Barre de niveau */}
                      <div className="flex items-center gap-3 flex-1 max-w-xs">
                        <div className="flex-1 h-[2px] bg-slate-100 dark:bg-zinc-800">
                          <div
                            className="h-full bg-blue-600 transition-all"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                        <span className="font-mono text-[10px] text-blue-600 font-bold w-8">
                          {skill.level}%
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Link
                        href={`/dashboard/skills/${skill.id}/edit`}
                        className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors"
                        title="Modifier"
                      >
                        <Pencil size={14} />
                      </Link>
                      <DeleteButton id={skill.id} name={skill.name} type="skill" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}