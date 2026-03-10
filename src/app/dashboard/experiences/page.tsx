// src/app/dashboard/experiences/page.tsx
// =============================================================================
// PAGE - Liste des Expériences
// Description : Affiche toutes les expériences avec options d'édition/suppression.
//               Données chargées côté serveur (SSR).
// =============================================================================

import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { Pencil, Plus } from "lucide-react";
import DeleteButton from "../projects/_components/DeleteButton";

/**
 * Récupère toutes les expériences depuis la base de données
 */
async function getExperiences() {
  try {
    return await prisma.experience.findMany({
      orderBy: { order: "asc" },
    });
  } catch {
    notFound();
  }
}

/**
 * Formate une date en année uniquement
 * Ex: 2024-01-15 → "2024"
 */
function formatYear(date: Date): string {
  return new Date(date).getFullYear().toString();
}

export default async function ExperiencesPage() {
  const experiences = await getExperiences();

  return (
    <div className="space-y-8">

      {/* En-tête */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500 dark:text-zinc-500 font-medium">
          {experiences?.length ?? 0} expérience{(experiences?.length ?? 0) > 1 ? "s" : ""} au total
        </p>
        <Link
          href="/dashboard/experiences/new"
          className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-black dark:hover:bg-white dark:hover:text-black transition-all duration-200"
        >
          <Plus size={14} />
          Nouvelle expérience
        </Link>
      </div>

      {/* État vide */}
      {!experiences || experiences.length === 0 ? (
        <div className="border border-dashed border-slate-200 dark:border-zinc-800 p-16 text-center">
          <div className="text-slate-300 dark:text-zinc-700 font-black text-6xl mb-4">0</div>
          <p className="text-sm font-bold text-slate-400 dark:text-zinc-600 uppercase tracking-widest mb-6">
            Aucune expérience pour l&apos;instant
          </p>
          <Link
            href="/dashboard/experiences/new"
            className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all"
          >
            <Plus size={14} />
            Ajouter la première expérience
          </Link>
        </div>

      ) : (

        /* Liste des expériences */
        <div className="border border-slate-100 dark:border-zinc-900 divide-y divide-slate-100 dark:divide-zinc-900">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="flex items-center justify-between px-6 py-5 hover:bg-slate-50 dark:hover:bg-zinc-900/50 transition-colors group"
            >
              {/* Infos expérience */}
              <div className="flex items-start gap-6 flex-1 min-w-0">

                {/* Période */}
                <div className="flex-shrink-0 text-center min-w-[80px]">
                  <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                    {formatYear(exp.startDate)}
                  </div>
                  <div className="text-[9px] font-bold text-slate-400 dark:text-zinc-600">
                    —
                  </div>
                  <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                    {exp.endDate ? formatYear(exp.endDate) : "PRES."}
                  </div>
                </div>

                {/* Contenu */}
                <div className="min-w-0">
                  <h3 className="font-montserrat font-black text-sm uppercase tracking-tight text-black dark:text-white mb-1">
                    {exp.role}
                  </h3>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-600 uppercase tracking-widest">
                    {exp.company}
                  </span>
                  <p className="text-xs text-slate-500 dark:text-zinc-500 mt-2 line-clamp-2 font-medium">
                    {exp.description}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                <Link
                  href={`/dashboard/experiences/${exp.id}/edit`}
                  className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors"
                  title="Modifier"
                >
                  <Pencil size={14} />
                </Link>
                <DeleteButton id={exp.id} name={exp.role} type="experience" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}